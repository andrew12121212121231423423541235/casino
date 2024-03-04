// @ts-ignore
import React, { useEffect, useRef, useState } from "react";
import logo from "../../public/casino.jpeg";
import choice from "../../public/choise.png";
import star from "../../public/star-full.png";
import person from "../../public/user.png";
import ProgressBar from "./ProgressBar.tsx";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}
const MainView = () => {
  const installPromptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const [isPWAActive, setIsPWAActive] = useState<boolean>(false);
  const [installing, setInstalling] = useState<boolean>(false);

  console.log(installing);
  const handleCompleteProgressBar = () => {
    setDownloaded(true);
  };

  useEffect(() => {
    const isPWAActiveted = window.matchMedia(
      "(display-mode: minimal-ui)",
    ).matches;

    if (isPWAActiveted) {
      setIsPWAActive(true);
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      installPromptRef.current = e;
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener,
    );

    window.addEventListener("appinstalled", () => {
      setInstalling(false);
      setIsPWAActive(true);
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
    };
  }, []);

  const installPWA = async () => {
    setInstalling(true);
    if (installPromptRef.current) {
      setInstalling(true);
      await installPromptRef.current.prompt();
      const choiceResult = await installPromptRef.current.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("PWA installation was accepted");
      } else {
        alert("PWA installation rejected");
      }
      installPromptRef.current = null;
    }
  };

  const handleClickButton = async () => {
    if (isPWAActive) {
      window.location.href = "https://youtube.com";
    } else if (!downloaded) {
      setLoading(true);
    } else {
      await installPWA();
    }
  };

  return (
    <div className="main-container">
      <div className="header-container">
        <div className="header">
          <img className="logo" alt="logo" src={logo} />

          <div className="right-container">
            <div className="content">
              <div>
                <div className="title-container"></div>
                <h1 className="title">Best Slots</h1>
                <a href="" className="company-name">
                  Nine Dev Casino
                </a>
                <div className="age-restriction">18+</div>
              </div>

              <div className="right-content">
                <div className="editors-choice">
                  <img alt="choice" src={choice} />
                  <span>Editor's choice</span>
                </div>

                <div className="rate">
                  <div className="rate-container">
                    <img alt="star" src={star} />
                    <img alt="star" src={star} />
                    <img alt="star" src={star} />
                    <img alt="star" src={star} />
                    <img alt="star" src={star} />
                  </div>

                  <span className="rate-amount">1627</span>

                  <img alt="person" src={person} />
                </div>
              </div>
            </div>

            <div className="button-container desktop">
              {!loading && (
                <div onClick={handleClickButton} className="button">
                  {isPWAActive ? "open" : downloaded ? "Install" : "Download"}
                </div>
              )}

              {loading && (
                <ProgressBar
                  onComplete={handleCompleteProgressBar}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}
            </div>
          </div>
        </div>

        <div className="rating-container-mobile mobile">
          <div className="rating-container-mobile-item">
            <div className="rating-mobile">
              <span>5.0</span>
              <svg
                enableBackground="new 0 0 24 24"
                version="1.1"
                viewBox="0 0 24 24"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none">
                  <path d="M0,0h24v24H0V0z"></path>
                  <path d="M0,0h24v24H0V0z"></path>
                </g>
                <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"></path>
              </svg>
            </div>

            <span className="grey-title">Rating</span>
          </div>

          <div className="rating-container-mobile-item">
            <svg
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
            >
              <g transform="translate(21.552 22.5) rotate(180)">
                <path
                  transform="translate(7.552 7.652)"
                  d="M.625,0h8.75A.68.68,0,0,1,10,.723a.68.68,0,0,1-.625.723H.625A.68.68,0,0,1,0,.723.68.68,0,0,1,.625,0Z"
                  data-name="Path 288"
                ></path>
                <g transform="translate(17.552 20.797) rotate(180)">
                  <path
                    d="M0,0H9.666V9.666H0Z"
                    fill="none"
                    data-name="Path 289"
                  ></path>
                  <path
                    transform="translate(-4.408 -3.203)"
                    d="M8.752,4.642V11.81L5.536,8.678a.677.677,0,0,0-.936,0,.627.627,0,0,0,0,.9l4.343,4.229a.669.669,0,0,0,.929,0l4.343-4.229a.627.627,0,0,0,0-.9.669.669,0,0,0-.929,0L10.07,11.81V4.642a.659.659,0,0,0-1.318,0Z"
                    data-name="Path 290"
                  ></path>
                </g>
                <rect
                  transform="translate(4.552 5.5)"
                  width="16"
                  height="16"
                  rx="2"
                  fill="none"
                  stroke="#000"
                  strokeWidth="2"
                  data-name="Rectangle 123"
                ></rect>
              </g>
            </svg>

            <span className="grey-title">12.5MB</span>
          </div>

          <div className="rating-container-mobile-item">
            <span className="age-restriction-mobile">18+</span>
            <span className="grey-title">Age</span>
          </div>

          <div className="rating-container-mobile-item">
            <span>1000</span>
            <span className="grey-title">Installed</span>
          </div>
        </div>

        <div className="button-container mobile">
          {!loading && (
            <div onClick={handleClickButton} className="button">
              {isPWAActive ? "open" : downloaded ? "Install" : "Download"}
            </div>
          )}

          {loading && (
            <ProgressBar
              onComplete={handleCompleteProgressBar}
              loading={loading}
              setLoading={setLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainView;
