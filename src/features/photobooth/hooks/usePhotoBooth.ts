import { useState, useRef, useEffect, useCallback } from "react";
import { BoothStep, LayoutType, CountdownDuration, Frame } from "../types";
import { LAYOUTS } from "../constants";
import { FRAMES } from "../data/frames";

export const usePhotoBooth = () => {
  const [step, setStep] = useState<BoothStep>("INTRO");
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>("STRIP_1X4");
  const [selectedFrame, setSelectedFrame] = useState<Frame>(FRAMES[0]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [countDownDuration, setCountDownDuration] =
    useState<CountdownDuration>(3);
  const [countDown, setCountDown] = useState<number | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const handleSelectLayout = useCallback((layout: LayoutType) => {
    setSelectedLayout(layout);

    // Determine the corresponding layout string in Frame
    let frameLayoutStr = "";
    if (layout === "STRIP_1X4") frameLayoutStr = "1x4";
    else if (layout === "PORTRAIT_2X2") frameLayoutStr = "2x2";
    else if (layout === "PORTRAIT_1X1") frameLayoutStr = "1x1";

    // Find the first frame matching the new layout
    const matchingFrame = FRAMES.find((f) => f.layout === frameLayoutStr);

    // If a match is found, update the selected frame
    if (matchingFrame) {
      setSelectedFrame(matchingFrame);
    } else {
      // Create a fallback frame if no matching frame found
      setSelectedFrame({
        id: `fallback-${frameLayoutStr}`,
        name: "Basic Frame",
        layout: frameLayoutStr as any,
        category: "BASIC",
        color: "bg-white",
        borderColor: "border-slate-200",
        textColor: "text-slate-800",
      });
    }
  }, []);

  const [lastPhoto, setLastPhoto] = useState<string | null>(null);

  const [isMirrored, setIsMirrored] = useState(true);
  const [isRecapEnabled, setIsRecapEnabled] = useState(false);
  const [recapVideoUrl, setRecapVideoUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const animationFrameRef = useRef<number | null>(null);
  const isAutoCapturingRef = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Re-attach stream to video element when step changes or component remounts
  useEffect(() => {
    if (streamRef.current && videoRef.current && videoRef.current.srcObject !== streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }); // Run on every render to ensure video gets re-attached if view switches (Desktop/Mobile)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { min: 640, ideal: 1280 },
          height: { min: 480, ideal: 720 },
          aspectRatio: { ideal: 1.333333 }
        },
        audio: false,
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setPermissionDenied(false);
    } catch (err) {
      console.error("Camera error:", err);
      setPermissionDenied(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const toggleMirrored = () => setIsMirrored((prev) => !prev);
  const toggleRecap = () => setIsRecapEnabled((prev) => !prev);

  const getTargetDimensions = useCallback(() => {
    let targetWidth, targetHeight;
    if (selectedLayout === "STRIP_1X4") {
      targetWidth = 1600;
      targetHeight = 1200; // 4:3 Landscape
    } else if (selectedLayout === "PORTRAIT_2X2" || selectedLayout === "PORTRAIT_1X1") {
      targetWidth = 1500;
      targetHeight = 1500; // 1:1 Square
    } else {
      targetWidth = 1200;
      targetHeight = 1600; // 3:4 Portrait
    }
    return {
      targetWidth,
      targetHeight,
      targetRatio: targetWidth / targetHeight,
    };
  }, [selectedLayout]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (
        video.readyState < 2 ||
        video.videoWidth === 0 ||
        video.videoHeight === 0
      ) {
        return null;
      }

      const { targetWidth, targetHeight, targetRatio } = getTargetDimensions();

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d", { alpha: false });

      if (ctx) {
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        const videoRatio = videoWidth / videoHeight;

        let sw, sh, sx, sy;

        // "Object-fit: cover" logic for the canvas capture
        if (videoRatio > targetRatio) {
          // Video is proportionaly wider than target ratio
          sh = videoHeight;
          sw = sh * targetRatio;
          sx = (videoWidth - sw) / 2;
          sy = 0;
        } else {
          // Video is proportionally narrower than target ratio
          sw = videoWidth;
          sh = sw / targetRatio;
          sx = 0;
          sy = (videoHeight - sh) / 2;
        }

        ctx.save();
        // If mirrored, flip the canvas globally
        if (isMirrored) {
          ctx.translate(targetWidth, 0);
          ctx.scale(-1, 1);
        }

        // Apply clean processing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.filter = "contrast(1.08) brightness(1.04) saturate(1.1)";

        // Draw the cropped portion of the video to the full canvas
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
        ctx.restore();

        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        
        // Update state
        setPhotos((prev) => [...prev, dataUrl]);
        return dataUrl;
      }
    }
    return null;
  }, [isMirrored]);

  const startRecorder = () => {
    if (isRecapEnabled) {
      try {
        const { targetWidth, targetHeight } = getTargetDimensions();
        const canvas = document.createElement("canvas");
        // Use target dimensions for the recap video as well
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        // Draw loop to capture mirrored/processed frames
        const draw = () => {
          const video = videoRef.current;
          if (video && video.readyState >= 2) {
            // Update canvas size to match video if needed (once or dynamic)
            if (
              canvas.width !== targetWidth ||
              canvas.height !== targetHeight
            ) {
              canvas.width = targetWidth;
              canvas.height = targetHeight;
            }

            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
            const videoRatio = videoWidth / videoHeight;
            const targetRatio = targetWidth / targetHeight;

            let sw, sh, sx, sy;

            // "Object-fit: cover" logic for the canvas capture
            if (videoRatio > targetRatio) {
              // Video is proportionally wider than target ratio
              sh = videoHeight;
              sw = sh * targetRatio;
              sx = (videoWidth - sw) / 2;
              sy = 0;
            } else {
              // Video is proportionally narrower than target ratio
              sw = videoWidth;
              sh = sw / targetRatio;
              sx = 0;
              sy = (videoHeight - sh) / 2;
            }

            ctx.save();
            // Apply mirror transform if needed
            if (isMirrored) {
              ctx.translate(canvas.width, 0);
              ctx.scale(-1, 1);
            }
            // Draw the cropped portion of the video to the full canvas
            ctx.drawImage(video, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
            ctx.restore();
          }
          animationFrameRef.current = requestAnimationFrame(draw);
        };

        draw(); // Start the loop

        // Capture stream from canvas (30 FPS)
        const stream = canvas.captureStream(30);

        recordedChunksRef.current = [];
        const options = { mimeType: "video/webm;codecs=vp9" };

        // Check if MIME type is supported, fallback if necessary
        const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
          ? "video/webm;codecs=vp9"
          : "video/webm";

        const recorder = new MediaRecorder(stream, { mimeType });

        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, {
            type: "video/webm",
          });
          const url = URL.createObjectURL(blob);
          setRecapVideoUrl(url);

          // Cleanup
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
        };

        recorder.start();
        mediaRecorderRef.current = recorder;
      } catch (err) {
        console.error("Failed to start recording:", err);
      }
    }
  };

  const stopRecorder = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    // Also ensure animation frame is cancelled if it wasn't already
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const startCaptureSequence = async () => {
    setStep("CAPTURE");
    setPhotos([]);
    setLastPhoto(null);
    setRecapVideoUrl(null);
    isAutoCapturingRef.current = true;

    // Wait for the CaptureStep to mount and video to be ready
    await new Promise((r) => setTimeout(r, 500));

    // Start recording if enabled
    startRecorder();

    const targetCount =
      LAYOUTS.find((l) => l.id === selectedLayout)?.count || 4;

    for (let i = 0; i < targetCount; i++) {
      if (!isAutoCapturingRef.current) break;

      for (let c = countDownDuration; c > 0; c--) {
        if (!isAutoCapturingRef.current) break;
        setCountDown(c);
        await new Promise((r) => setTimeout(r, 1000));
      }

      if (!isAutoCapturingRef.current) break;
      setCountDown(null);

      const capturedUrl = capturePhoto();
      if (capturedUrl) {
        setLastPhoto(capturedUrl);
      }

      await new Promise((r) => setTimeout(r, 150));

      if (!isAutoCapturingRef.current) break;

      if (i < targetCount - 1) {
        // No delay between captures - next countdown starts immediately
        // We also keep the lastPhoto visible during the next countdown
      }
    }

    if (isAutoCapturingRef.current) {
      // Stop recording
      stopRecorder();

      setLastPhoto(null);
      stopCamera();
      setStep("PROCESSING");
      await new Promise((r) => setTimeout(r, 2000));
      setStep("RESULT");
    }
    isAutoCapturingRef.current = false;
  };

  const abortCapture = () => {
    isAutoCapturingRef.current = false;
    setCountDown(null);
    setPhotos([]);
    setLastPhoto(null);
    stopRecorder();
    setStep("SELECT_FRAME");
  };

  const handleManualCapture = async () => {
    if (photos.length === 0) {
      startRecorder();
    }

    const capturedUrl = capturePhoto();
    if (capturedUrl) {
      setLastPhoto(capturedUrl);
    }

    await new Promise((r) => setTimeout(r, 150));

    const targetCount =
      LAYOUTS.find((l) => l.id === selectedLayout)?.count || 4;

    // We captured one photo, so the new count will be photos.length + 1
    if (photos.length + 1 >= targetCount) {
      stopRecorder();
      setLastPhoto(null);
      stopCamera();
      setStep("PROCESSING");
      setTimeout(() => setStep("RESULT"), 2000);
    }
  };

  const handleStart = () => {
    startCamera();
    setStep("SELECT_FRAME");
  };

  const handleRetake = () => {
    setPhotos([]);
    setLastPhoto(null);
    startCamera();
    setStep("SELECT_FRAME");
  };

  const goToStart = () => {
    setStep("INTRO");
    setPhotos([]);
    setLastPhoto(null);
  };

  return {
    state: {
      step,
      selectedLayout,
      selectedFrame,
      photos,
      lastPhoto,
      countDownDuration,
      countDown,
      permissionDenied,
      isMirrored,
      isRecapEnabled,
      recapVideoUrl,
    },
    refs: {
      videoRef,
      canvasRef,
    },
    actions: {
      setStep,
      setSelectedLayout: handleSelectLayout,
      setSelectedFrame,
      setCountDownDuration,
      startCamera,
      startCaptureSequence,
      handleManualCapture,
      abortCapture,
      handleStart,
      handleRetake,
      toggleMirrored: () => setIsMirrored((prev) => !prev),
      toggleRecap: () => setIsRecapEnabled((prev) => !prev),
      goToStart: () => {
        setStep("INTRO");
        setPhotos([]);
      },
    },
  };
};
