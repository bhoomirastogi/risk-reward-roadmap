
import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Calculate percentage
    const percentage = (currentStep / totalSteps) * 100;
    setProgress(percentage);
  }, [currentStep, totalSteps]);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        <span>Start</span>
        <span>Recommendation</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-finance-teal transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-right text-sm text-gray-600">
        {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default ProgressBar;
