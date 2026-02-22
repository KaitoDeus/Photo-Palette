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
  const [flash, setFlash] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const handleSelectLayout = useCallback((layout: LayoutType) => {
    setSelectedLayout(layout);

    // Determine the corresponding layout string in Frame
    let frameLayoutStr = "";
    if (layout === "STRIP_1X4") frameLayoutStr = "1x4";
    else if (layout === "PORTRAIT_2X2") frameLayoutStr = "2x2";
    else if (layout === "PORTRAIT_1X1") frameLayoutStr = "1x1";
    else if (layout === "GRID_2X3") frameLayoutStr = "2x3";

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
  const [isFlashEnabled, setIsFlashEnabled] = useState(true);
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

  // Re-attach stream to video element when step changes (because video element is recreated)
  useEffect(() => {
    if (streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [step]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
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

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.save();
        if (isMirrored) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        ctx.filter = "contrast(1.1) brightness(1.05) saturate(1.1)";
        ctx.drawImage(video, 0, 0);
        ctx.restore();

        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setPhotos((prev) => [...prev, dataUrl]);
        return dataUrl;
      }
    }
    return null;
  }, [isMirrored]);

  const startRecorder = () => {
    if (isRecapEnabled) {
      try {
        const canvas = document.createElement("canvas");
        // Preset dimensions to avoid 0x0 issues if video isn't ready immediately
        canvas.width = 1280;
        canvas.height = 720;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        // Draw loop to capture mirrored/processed frames
        const draw = () => {
          const video = videoRef.current;
          if (video && video.readyState >= 2) {
            // Update canvas size to match video if needed (once or dynamic)
            if (
              canvas.width !== video.videoWidth ||
              canvas.height !== video.videoHeight
            ) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
            }

            ctx.save();
            // Apply mirror transform if needed
            if (isMirrored) {
              ctx.translate(canvas.width, 0);
              ctx.scale(-1, 1);
            }
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
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

      if (isFlashEnabled) setFlash(true);
      const capturedUrl = capturePhoto();
      if (capturedUrl) {
        setLastPhoto(capturedUrl);
      }

      await new Promise((r) => setTimeout(r, 150));
      if (isFlashEnabled) setFlash(false);

      if (!isAutoCapturingRef.current) break;

      if (i < targetCount - 1) {
        // No delay between captures - next countdown starts immediately
        // We also keep the lastPhoto visible during the next countdown
      }
    }

    if (isAutoCapturingRef.current) {
      // Stop recording
      stopRecorder();

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

    if (isFlashEnabled) setFlash(true);
    const capturedUrl = capturePhoto();
    if (capturedUrl) {
      setLastPhoto(capturedUrl);
    }

    await new Promise((r) => setTimeout(r, 150));
    if (isFlashEnabled) setFlash(false);

    const targetCount =
      LAYOUTS.find((l) => l.id === selectedLayout)?.count || 4;

    // We captured one photo, so the new count will be photos.length + 1
    if (photos.length + 1 >= targetCount) {
      stopRecorder();
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
    startCamera();
    setStep("SELECT_FRAME");
  };

  const goToStart = () => {
    setStep("INTRO");
    setPhotos([]);
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
      flash,
      permissionDenied,
      isMirrored,
      isRecapEnabled,
      isFlashEnabled,
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
      handleBackToSelect: () => setStep("SELECT_FRAME"),
      toggleMirrored: () => setIsMirrored((prev) => !prev),
      toggleRecap: () => setIsRecapEnabled((prev) => !prev),
      toggleFlash: () => setIsFlashEnabled((prev) => !prev),
      goToStart: () => {
        setStep("INTRO");
        setPhotos([]);
      },
    },
  };
};
