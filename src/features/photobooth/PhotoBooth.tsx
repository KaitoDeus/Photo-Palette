import React from "react";
import Reveal from "../../components/common/Reveal";
import { usePhotoBooth } from "./hooks/usePhotoBooth";
import IntroStep from "./components/IntroStep";
import LayoutSelectionStep from "./components/LayoutSelectionStep";

import ProcessingStep from "./components/ProcessingStep";
import ResultStep from "./components/ResultStep";

const PhotoBooth: React.FC = () => {
  const { state, refs, actions } = usePhotoBooth();

  const handleBookingScroll = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const renderStep = () => {
    switch (state.step) {
      case "INTRO":
        return <IntroStep onStart={actions.handleStart} />;
      case "SELECT_FRAME":
        return (
          <LayoutSelectionStep
            selectedLayout={state.selectedLayout}
            selectedFrame={state.selectedFrame}
            countDownDuration={state.countDownDuration}
            permissionDenied={state.permissionDenied}
            videoRef={refs.videoRef}
            isMirrored={state.isMirrored}
            isRecapEnabled={state.isRecapEnabled}
            isFlashEnabled={state.isFlashEnabled}
            onSelectLayout={actions.setSelectedLayout}
            onSelectFrame={actions.setSelectedFrame}
            onSelectCountDown={actions.setCountDownDuration}
            onToggleMirror={actions.toggleMirrored}
            onToggleRecap={actions.toggleRecap}
            onToggleFlash={actions.toggleFlash}
            onRetryPermission={actions.startCamera}
            onStartCapture={actions.startCaptureSequence}
            onManualCapture={actions.handleManualCapture}
            onAbortCapture={actions.abortCapture}
            onBack={actions.goToStart}
            flash={state.flash}
            countDown={state.countDown}
            photos={state.photos}
            lastPhoto={state.lastPhoto}
            isCapturing={state.step === "CAPTURE"}
          />
        );
      case "CAPTURE":
        return (
          <LayoutSelectionStep
            selectedLayout={state.selectedLayout}
            selectedFrame={state.selectedFrame}
            countDownDuration={state.countDownDuration}
            permissionDenied={state.permissionDenied}
            videoRef={refs.videoRef}
            isMirrored={state.isMirrored}
            isRecapEnabled={state.isRecapEnabled}
            isFlashEnabled={state.isFlashEnabled}
            onSelectLayout={actions.setSelectedLayout}
            onSelectFrame={actions.setSelectedFrame}
            onSelectCountDown={actions.setCountDownDuration}
            onToggleMirror={actions.toggleMirrored}
            onToggleRecap={actions.toggleRecap}
            onToggleFlash={actions.toggleFlash}
            onRetryPermission={actions.startCamera}
            onStartCapture={actions.startCaptureSequence}
            onManualCapture={actions.handleManualCapture}
            onAbortCapture={actions.abortCapture}
            onBack={actions.goToStart}
            flash={state.flash}
            countDown={state.countDown}
            photos={state.photos}
            lastPhoto={state.lastPhoto}
            isCapturing={true}
          />
        );
      case "PROCESSING":
        return <ProcessingStep />;
      case "RESULT":
        return (
          <ResultStep
            photos={state.photos}
            selectedLayout={state.selectedLayout}
            selectedFrame={state.selectedFrame}
            recapVideoUrl={state.recapVideoUrl}
            onRetake={actions.handleRetake}
            onBooking={() => alert("Chức năng đặt lịch đang phát triển!")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="photobooth"
      className="py-20 bg-transparent relative overflow-hidden min-h-[600px] flex items-center"
    >
      <canvas ref={refs.canvasRef} className="hidden" />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-200 rounded-full blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30 animate-float-reverse"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 relative z-10">
        <Reveal>
          <div className="rounded-[2.5rem] overflow-hidden min-h-[500px] flex justify-center items-center">
            {renderStep()}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PhotoBooth;
