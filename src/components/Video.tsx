import { useEffect, useState } from "react";
import styled from "styled-components";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import useStore from "../store";
import hikaru from "../hikaru.json";

const StyledVideo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const FlexColumnNoGap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
`;

const EmbedContainer = styled.div`
  /* keep embeds centered */
  margin: 0 auto;

  /* make sure it doesn't overflow the card */
  max-width: 100%;

  &.w100vw {
    width: 100%;
  }
  &.w480 {
    width: 480px;
  }
  &.w720 {
    width: 720px;
  }
  &.w1280 {
    width: 1280px;
  }
  &.w1920 {
    width: 1920px;
  }
  &.w2560 {
    width: 2560px;
  }

  /* safety for small screens / narrow windows */
  @media (max-width: 900px) {
    width: 100% !important;
  }
`;

const VideoLink = styled.a`
  color: var(--accent);
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const Video = () => {
  const [videoId, setVideoId] = useState<string>("");
  const videoIndex = useStore((state) => state.videoIndex);
  const [haveValidVideo, setHaveValidVideo] = useState<boolean>(false);
  const [playerClass, setPlayerClass] = useState<string>("w720");

  useEffect(() => {
    const video = hikaru.find((video) => video.index === videoIndex);
    if (video) {
      setHaveValidVideo(true);
      setVideoId(video.id);
    } else {
      setHaveValidVideo(false);
    }
  }, [videoIndex]);

  return (
    <StyledVideo>
      {haveValidVideo && (
        <>
          <FlexColumnNoGap>
            <div>video width</div>
            <ButtonRow>
              <button onClick={() => setPlayerClass("w100vw")}>auto</button>
              <button onClick={() => setPlayerClass("w480")}>480px</button>
              <button onClick={() => setPlayerClass("w720")}>720px</button>
              <button onClick={() => setPlayerClass("w1280")}>1280px</button>
              <button onClick={() => setPlayerClass("w1920")}>1920px</button>
              <button onClick={() => setPlayerClass("w2560")}>2560px</button>
            </ButtonRow>
          </FlexColumnNoGap>

          <EmbedContainer className={playerClass}>
            <LiteYouTubeEmbed
              id={videoId}
              poster="hqdefault"
              title="YouTube Embed of a ぷろたん Video"
              noCookie={false}
            />
          </EmbedContainer>

          <VideoLink href={`https://youtu.be/${videoId}`}>
            {`https://youtu.be/${videoId}`}
          </VideoLink>
        </>
      )}
    </StyledVideo>
  );
};

export default Video;

