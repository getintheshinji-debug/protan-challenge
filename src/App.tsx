import { useEffect, useState } from "react";
import styled from "styled-components";
import Index from "./components/Index";
import SetIndex from "./components/SetIndex";
import Video from "./components/Video";
import useStore from "./store";
import hikaru from "./hikaru.json";

const StyledApp = styled.div`
  height: 100vh;
  background: var(--bg);
  color: var(--text);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const StyledAppTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

function App() {
  /* ---------------- THEME ---------------- */
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "system");
    } else {
      root.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const cycleTheme = () => {
    setTheme((t) =>
      t === "system" ? "dark" : t === "dark" ? "light" : "system"
    );
  };

  /* ---------------- VIDEO NAV ---------------- */
  const videoIndex = useStore((state) => state.videoIndex);
  const setVideoIndex = useStore((state) => state.setVideoIndex);

  const total = hikaru.length;
  const clamp = (n: number) => Math.max(1, Math.min(total, n));
  const jumpTo = (n: number) => setVideoIndex(clamp(n));

  const randomForward = () => {
    if (videoIndex >= total) return;
    const min = videoIndex + 1;
    const max = total;
    const next = Math.floor(Math.random() * (max - min + 1)) + min;
    jumpTo(next);
  };

  /* ---------------- KEYBOARD SHORTCUTS ---------------- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isTyping =
        tag === "input" ||
        tag === "textarea" ||
        target?.isContentEditable;

      if (isTyping) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        jumpTo(videoIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        jumpTo(videoIndex + 1);
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        randomForward();
      } else if (e.key === "d" || e.key === "D") {
        e.preventDefault();
        cycleTheme();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [videoIndex, total, theme]);

  return (
    <StyledApp className="App">
      {/* Theme toggle button */}
      <button
        onClick={cycleTheme}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          padding: "8px 10px",
          borderRadius: 8,
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--text)",
          cursor: "pointer",
        }}
        aria-label="Toggle theme"
      >
        Theme: {theme}
      </button>

      <StyledAppTop>
        <h1>ぷろたん Challenge</h1>
        <Video />
        <Index />
      </StyledAppTop>

      <SetIndex />
    </StyledApp>
  );
}

export default App;

