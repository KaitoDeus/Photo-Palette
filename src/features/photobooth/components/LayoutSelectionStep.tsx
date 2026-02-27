import React, { useState, useEffect } from "react";
import FrameSelectionModal from "./FrameSelectionModal";
import MobileView from "./layouts/MobileView";
import DesktopView from "./layouts/DesktopView";
import { LayoutSelectionStepProps } from "./layouts/ViewProps";

const LayoutSelectionStep: React.FC<
  Omit<LayoutSelectionStepProps, "setIsFrameModalOpen">
> = (props) => {
  const [isFrameModalOpen, setIsFrameModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768 is the 'md' breakpoint in Tailwind
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const viewProps: LayoutSelectionStepProps = {
    ...props,
    setIsFrameModalOpen,
  };

  return (
    <div className="w-full">
      {isMobile ? (
        <MobileView {...viewProps} />
      ) : (
        <DesktopView {...viewProps} />
      )}

      <FrameSelectionModal
        isOpen={isFrameModalOpen}
        onClose={() => setIsFrameModalOpen(false)}
        selectedFrameId={props.selectedFrame.id}
        selectedLayoutId={props.selectedLayout}
        onSelect={props.onSelectFrame}
      />
    </div>
  );
};

export default LayoutSelectionStep;
