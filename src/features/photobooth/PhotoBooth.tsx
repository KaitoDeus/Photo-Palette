import React, { useState } from "react";

import { usePhotoBooth } from "./hooks/usePhotoBooth";
import IntroStep from "./components/IntroStep";
import LayoutSelectionStep from "./components/LayoutSelectionStep";

import ProcessingStep from "./components/ProcessingStep";
import ResultStep from "./components/ResultStep";
import { CustomerBookingModal } from "./components/CustomerBookingModal";

const PhotoBooth: React.FC = () => {
  const { state, refs: { videoRef, canvasRef }, actions } = usePhotoBooth();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
            videoRef={videoRef}
            isMirrored={state.isMirrored}
            isRecapEnabled={state.isRecapEnabled}
            onSelectLayout={actions.setSelectedLayout}
            onSelectFrame={actions.setSelectedFrame}
            onSelectCountDown={actions.setCountDownDuration}
            onToggleMirror={actions.toggleMirrored}
            onToggleRecap={actions.toggleRecap}
            onRetryPermission={actions.startCamera}
            onStartCapture={actions.startCaptureSequence}
            onManualCapture={actions.handleManualCapture}
            onAbortCapture={actions.abortCapture}
            onBack={actions.goToStart}
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
            videoRef={videoRef}
            isMirrored={state.isMirrored}
            isRecapEnabled={state.isRecapEnabled}
            onSelectLayout={actions.setSelectedLayout}
            onSelectFrame={actions.setSelectedFrame}
            onSelectCountDown={actions.setCountDownDuration}
            onToggleMirror={actions.toggleMirrored}
            onToggleRecap={actions.toggleRecap}
            onRetryPermission={actions.startCamera}
            onStartCapture={actions.startCaptureSequence}
            onManualCapture={actions.handleManualCapture}
            onAbortCapture={actions.abortCapture}
            onBack={actions.goToStart}
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
            onBooking={() => setIsBookingOpen(true)}
            onSelectFrame={actions.setSelectedFrame}
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
      <canvas ref={canvasRef} className="hidden" />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-200 rounded-full blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30 animate-float-reverse"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-0 sm:px-4 relative z-10">
        <div className="min-h-[500px] flex justify-center items-center">
          {renderStep()}
        </div>
      </div>

      {/* Customer Studio Booking Modal */}
      <CustomerBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </section>
  );
};

export default PhotoBooth;
