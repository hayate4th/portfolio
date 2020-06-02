import React, { useEffect, useState } from "react";
import anime from "animejs";
import styled from "styled-components";

interface MainTitleProps {
  setShowContents: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO: This needs refactoring
const MainTitle: React.FC<MainTitleProps> = ({ setShowContents }) => {
  let currentAnimation: anime.AnimeInstance;
  const [hasClickedTitle, setHasClickedTitle] = useState(false);
  const [loadingAnimationEnded, setLoadingAnimationEnded] = useState(false);
  const [showLoadingText, setShowLoadingText] = useState(false);

  useEffect(() => {
    // when anime.AnimeInstance is created anime.play() is called?
    currentAnimation = anime({
      targets: ".rect",
      strokeDashoffset: [0, 1520],
      strokeDasharray: [380, 380],
      stroke: "#39ff14",
      easing: "easeInOutSine",
      duration: 1500,
      direction: "alternate",
      loop: true
    });
  }, []);

  const titleClickHandler = async () => {
    // Avoid multiple clicks
    if (!hasClickedTitle) {
      setHasClickedTitle(true);
      const rectFadeInAnimation = anime({
        targets: ".rect",
        fill: ["transparent", "#ff8300"],
        duration: 1000
      });
      await rectFadeInAnimation.finished;

      const shrinkLoadingAnimation = anime({
        targets: [".svg-wrapper svg", ".rect"],
        width: ["640px", "0px"],
        height: ["120px", "20px"],
        easing: "easeInOutSine",
        duration: 1000
      });
      anime({
        targets: [".hello-text"],
        opacity: ["1", "0"]
      });
      await shrinkLoadingAnimation.finished;
      setShowLoadingText(true);

      const fadeInLoadingAnimation = anime({
        targets: [".loading-text"],
        opacity: ["0", "1"]
      });
      await fadeInLoadingAnimation.finished;

      const loadingAnimation = anime
        .timeline()
        .add({
          targets: [".svg-wrapper svg", ".rect"],
          width: ["0vw", "100vw"],
          easing: "easeInOutSine",
          duration: 5000
        })
        .add({
          targets: [".loading-text"],
          opacity: ["1", "0"]
        });
      await loadingAnimation.finished;

      setLoadingAnimationEnded(true);

      const fadeInWelcomeAnimation = anime
        .timeline()
        .add({
          targets: [".svg-wrapper svg", ".rect"],
          height: ["20px", "120px"],
          easing: "easeInOutSine",
          duration: 1000
        })
        .add({
          targets: [".welcome-text"],
          opacity: ["0", "1"],
          duration: 1000
        });
      await fadeInWelcomeAnimation.finished;
      setShowContents(true);
    }
  };

  const titleMouseEnterHandler = () => {
    if (currentAnimation) {
      currentAnimation.pause();
      // FIXME: useRef to use only one instance
      currentAnimation = anime({
        targets: ".rect",
        strokeDashoffset: [anime.setDashoffset, 0],
        strokeDasharray: [380, anime.setDashoffset],
        stroke: "#ff8300",
        easing: "easeInOutSine",
        duration: 1000
      });
    }
  };

  const titleMouseLeaveHandler = () => {
    if (currentAnimation) {
      currentAnimation.pause();
      // FIXME: useRef to use only one instance
      currentAnimation = anime({
        targets: ".rect",
        strokeDashoffset: [0, 1520],
        strokeDasharray: [380, 380],
        stroke: ["#39ff14", "#39ff14"],
        easing: "easeInOutSine",
        duration: 1500,
        direction: "alternate",
        loop: true
      });
    }
  };

  return (
    <TitleWrapper>
      <SVGWrapper
        onClick={titleClickHandler}
        onMouseEnter={titleMouseEnterHandler}
        onMouseLeave={titleMouseLeaveHandler}
        className="svg-wrapper"
        style={hasClickedTitle ? { width: "100vw" } : {}}
      >
        <svg height="120" width="640" xmlns="http://www.w3.org/2000/svg">
          <TransparentRect className="rect" height="120" width="640" />
        </svg>
        {hasClickedTitle && loadingAnimationEnded && (
          <WelcomeText className="welcome-text">Welcome!</WelcomeText>
        )}
        {hasClickedTitle && !loadingAnimationEnded && !showLoadingText && (
          <HelloText className="hello-text">Hello!</HelloText>
        )}
        {hasClickedTitle && !loadingAnimationEnded && showLoadingText && (
          <LoadingText className="loading-text">Loading...</LoadingText>
        )}
        {!hasClickedTitle && (
          <TitleText className="title-text">
            hayate4th&apos;s portfolio
          </TitleText>
        )}
      </SVGWrapper>
    </TitleWrapper>
  );
};

const TitleWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
`;

const SVGWrapper = styled.div`
  height: 120px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  width: 640px;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
`;

const TransparentRect = styled.rect`
  fill: transparent;
  stroke-width: 8px;
  stroke: #39ff14;
`;

const TitleText = styled.div`
  font-size: 40px;
  letter-spacing: 8px;
  line-height: 0;
  position: relative;
  top: -70px;
  user-select: none;
`;

const WelcomeText = styled.div`
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 8px;
  line-height: 0;
  position: relative;
  top: -70px;
  user-select: none;
`;

const LoadingText = styled.div`
  color: #000;
  opacity: 0;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 8px;
  line-height: 0;
  position: relative;
  top: -70px;
  user-select: none;
`;

const HelloText = styled.div`
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 8px;
  line-height: 0;
  position: relative;
  top: -70px;
  user-select: none;
`;

export default MainTitle;
