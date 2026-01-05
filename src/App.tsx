import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Index from "./components/Index";
import SetIndex from "./components/SetIndex";
import Video from "./components/Video";
import Button from "./components/Button";
import NowPlaying from "./components/NowPlaying";
import useStore from "./store";
import hikaru from "./hikaru.json";
import { Page, Card, Column, Row, Divider } from "./components/Layout";

/* ---------- TYPOGRAPHY ---------- */

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.div`
  font-size: 13px;
  opacity: 0.75;
  font-variant-numeric: tabular-nums;
`;

/* ---------- PROGRESS BAR ---------- */

const ProgressTrack = styled.div`
  height: 6px;
  background: var(--border);
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${(p) => p.$pct}%;
  background: linear-gradient(
    to right,
    var(--accent),
    var(--accentHover)
  );
  transition: width 0.3s ease;
`;

function App() {
  const videoIndex = useStore((s) => s.videoIndex);
  const setVideoIndex = useStore((s) => s.setVideoIndex);

  const total = hikaru.length;
  const progressPct = useMemo(
    () => Math.round((videoIndex / total) * 1000) / 10,
    [videoIndex, total]
  );

  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        setVideoIndex(Math.max(1, videoIndex - 1));
      if (e.key === "ArrowRight")
        setVideoIndex(Math.min(total, videoIndex + 1));
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [videoIndex, total]);

  return (
    <Page>
      <Row style={{ maxWidth: 980, width: "100%" }}>
        <TitleBlock>
          <Title>ぷろたん Challenge</Title>
          <Subtitle>
            Progress: {progressPct}% • {videoIndex}/{total}
          </Subtitle>
        </TitleBlock>

        <Button
          $variant="ghost"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        >
          🌗 Theme
        </Button>
      </Row>

      <Card>
        <Column>
          <ProgressTrack>
            <ProgressFill $pct={progressPct} />
          </ProgressTrack>

          <Video />
          <NowPlaying />

          <Divider />

          <Index />

          <Divider />

          <SetIndex />
        </Column>
      </Card>
    </Page>
  );
}

export default App;

