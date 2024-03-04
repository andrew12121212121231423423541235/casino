// @ts-ignore
import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
  onComplete: () => void;
  totalSize?: number;
}

const ProgressBar = ({
  loading,
  setLoading,
  onComplete,
  totalSize = 12.5,
}: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading && progress < totalSize) {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 1.25;

          if (newProgress >= totalSize) {
            clearInterval(interval);
            setLoading(false);
            onComplete();

            return totalSize;
          }

          return newProgress;
        });
      }, 500);
    }

    return () => interval && clearInterval(interval);
  }, [loading, progress, setLoading, totalSize]);

  const progressWidth = (progress / totalSize) * 100;

  return (
    <div className="progress_container">
      <div className="progress_word">{`${progress.toFixed(
        1,
      )} MB / ${totalSize} MB`}</div>
      <div className="progress_graph">
        <div className="runner" style={{ width: `${progressWidth}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
