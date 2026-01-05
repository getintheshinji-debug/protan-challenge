import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import Index from "./components/Index";
import SetIndex from "./components/SetIndex";
import Video from "./components/Video";
import Button from "./components/Button";
import useStore from "./store";
import hikaru from "./hikaru.json";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AppShell = styled.div`
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 22px 16px 64px;
  gap: 16px;
`;

const HeaderBar = styled.div`
  width: 100%;
  max-width: 980px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 26px;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.div`
  font-size: 13px;
  opacity: 0.75;
`;

const Card = styled.div`
  width: 100%;
  max-width: 980px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: var(--card);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  padding: 18px;
`;

const Section = styled.div`
  animation: ${fadeUp} 250ms ease;
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border);
  margin: 14px 0;
`;

const ShortcutLegend = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 12px;
  background: var(--card);
  border: 1px solid var(--border);
  opacity: ${(p) => (p.$visible ? 0.75 : 0)};
  transition: opacity 0.6s ease;
  pointer-events: none;
`;

function App() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [showLegend, setShowLegend] = useState(true);

  const videoIndex = useStore((s) => s.videoIndex);
  const setVideoIndex = useStore((s) => s.setVideoIndex);

  const total = hikaru.length;
  const jumpTo = (n: number) =>
    setVideoIndex(Math.max(1, Math.min(total, n)));

  const progress = useMemo(
    () => Math.round((videoIndex / total) * 1000) / 10,
    [videoIndex, total]
  );

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved as any);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setShowLegend(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") jumpTo(videoIndex - 1);
      if (e.key === "ArrowRight") jumpTo(videoIndex + 1);
      if (e.key.toLowerCase() === "d")
        setTheme((t) => (t === "dark" ? "light" : "dark"));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [videoIndex]);

  return (
    <AppShell>
      <HeaderBar>
        <div>
          <Title>ぷろたん Challenge</Title>
          <Subtitle>
            Progress: {progress}% • {videoIndex}/{total}
          </Subtitle>
        </div>
        <Button $variant="ghost" onClick={() =>
          setTheme((t) => (t === "dark" ? "light" : "dark"))
        }>
          Theme
        </Button>
      </HeaderBar>

      <Card>
        <Section key={videoIndex}>
          <Video />
        </Section>

        <Divider />
        <Index />
        <Divider />
        <SetIndex />
      </Card>

      <ShortcutLegend $visible={showLegend}>
        ← Prev&nbsp;&nbsp;→ Next&nbsp;&nbsp;D Theme
      </ShortcutLegend>
    </AppShell>
  );
}

export default App;

