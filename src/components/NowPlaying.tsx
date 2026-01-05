import styled from "styled-components";
import hikaru from "../hikaru.json";
import useStore from "../store";

const Meta = styled.div`
  font-size: 13px;
  opacity: 0.75;
  text-align: center;
  font-variant-numeric: tabular-nums;
`;

const NowPlaying = () => {
  const videoIndex = useStore((s) => s.videoIndex);
  const video = hikaru[videoIndex - 1];

  if (!video) return null;

  const date = new Date(video.publishedAt);
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });

  return (
    <Meta>
      Uploaded {month} {year} • {year} era
    </Meta>
  );
};

export default NowPlaying;

