import { useState } from "react";
import useStore from "../store";
import styled from "styled-components";
import hikaru from "../hikaru.json";
import { isNumber } from "../utils";

const StyledIndex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Index = () => {
  const videoIndex = useStore((state) => state.videoIndex);
  const setVideoIndex = useStore((state) => state.setVideoIndex);
  const [inputValue, setInputValue] = useState<string>("");

  const total = hikaru.length;
  const clamp = (n: number) => Math.max(1, Math.min(total, n));
  const jumpTo = (n: number) => setVideoIndex(clamp(n));

  const handleGoToVideo = (): void => {
    if (isNumber(inputValue)) {
      jumpTo(Number(inputValue));
      setInputValue("");
    }
  };

  return (
    <StyledIndex>
      {/* Row 1: Previous / Index / Next */}
      <FlexRow>
        <button onClick={() => jumpTo(videoIndex - 1)}>Previous</button>
        <div>
          {videoIndex}/{total}
        </div>
        <button onClick={() => jumpTo(videoIndex + 1)}>Next</button>
      </FlexRow>

      {/* Row 2: Jump shortcuts */}
      <FlexRow>
        <button onClick={() => jumpTo(1)}>⏮ First</button>
        <button onClick={() => jumpTo(videoIndex - 10)}>-10</button>
        <button onClick={() => jumpTo(videoIndex + 10)}>+10</button>
        <button onClick={() => jumpTo(total)}>Latest ⏭</button>
      </FlexRow>

      {/* Row 3: Percentage shortcuts */}
      <FlexRow>
        <button onClick={() => jumpTo(Math.round(total * 0.25))}>25%</button>
        <button onClick={() => jumpTo(Math.round(total * 0.5))}>50%</button>
        <button onClick={() => jumpTo(Math.round(total * 0.75))}>75%</button>
      </FlexRow>

      {/* Row 4: Manual input */}
      <FlexRow>
        <input
          type="number"
          name="index"
          min="1"
          max={total}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleGoToVideo}>Go To Video #</button>
      </FlexRow>
    </StyledIndex>
  );
};

export default Index;


