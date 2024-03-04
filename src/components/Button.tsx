// @ts-ignore
import React from "react";
import ProgressBar from "./ProgressBar.tsx";

interface ButtonProps {
  variant: "mobile" | "desktop";
  loading: boolean;
  isPWAActive: boolean;
  downloaded: boolean;
  onClickButton: () => void;
  onCompleteProgressBar: () => void;
  setLoading: (value: boolean) => void;
}
const Button = ({
  variant,
  loading,
  isPWAActive,
  downloaded,
  onCompleteProgressBar,
  onClickButton,
  setLoading,
}: ButtonProps) => {
  return (
    <div className={`button-container ${variant}`}>
      {!loading && (
        <div onClick={onClickButton} className="button">
          {isPWAActive ? "open" : downloaded ? "Install" : "Download"}
        </div>
      )}

      {loading && (
        <ProgressBar
          onComplete={onCompleteProgressBar}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default Button;
