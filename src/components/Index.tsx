import { useState } from "react";
import useStore from "../store";
import styled from "styled-components";
import hikaru from "../hikaru.json";
import { isNumber } from "../utils";
import Button from "./Button";

const StyledIndex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const IndexNumber = styled.div`
  font-variant-numeric: tabular-nums;
  padding: 6px 10px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--card);
`;

const StyledInput = styled.input`
  width: 140px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--inputBg);
  color: var(--text);

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const Index = () => {
  const videoIndex = useStore((s) => s.videoIndex);
  const setVideoIndex = useStore((s) => s.setVideoIndex);
  const [inputValue, setInputValue] = useState("");

  const total = hikaru.length;
  const clamp = (n: number) => Math.max(1, Math.min(total, n));
  const jumpTo = (n: number) => setVideoIndex(clamp(n));

  const handleGo = () => {
    if (isNumber(inputValue)) {
      jumpTo(Number(inputValue));
      setInputValue("");
    }
  };

  return (
    <StyledIndex>
      <FlexRow>
        <Button
          $variant="secondary"
          disabled={videoIndex <= 1}
          onClick={() => jumpTo(videoIndex - 1)}
        >
          ← Prev
        </Button>

        <IndexNumber>
          {videoIndex}/{total}
        </IndexNumber>

        <Button
          $variant="primary"
          disabled={videoIndex >= total}
          onClick={() => jumpTo(videoIndex + 1)}
        >
          Next →
        </Button>
      </FlexRow>

      <FlexRow>
        <Button $variant="ghost" onClick={() => jumpTo(1)}>⏮ First</Button>
        <Button $variant="ghost" onClick={() => jumpTo(videoIndex - 10)}>-10</Button>
        <Button $variant="ghost" onClick={() => jumpTo(videoIndex + 10)}>+10</Button>
        <Button $variant="ghost" onClick={() => jumpTo(total)}>Latest ⏭</Button>
      </FlexRow>

      <FlexRow>
        <Button $variant="ghost" onClick={() => jumpTo(Math.round(total * 0.25))}>25%</Button>
        <Button $variant="ghost" onClick={() => jumpTo(Math.round(total * 0.5))}>50%</Button>
        <Button $variant="ghost" onClick={() => jumpTo(Math.round(total * 0.75))}>75%</Button>
      </FlexRow>

      <FlexRow>
        <StyledInput
          type="number"
          placeholder="Index…"
          min="1"
          max={total}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button $variant="primary" onClick={handleGo}>Go</Button>
      </FlexRow>
    </StyledIndex>
  );
};

export default Index;

