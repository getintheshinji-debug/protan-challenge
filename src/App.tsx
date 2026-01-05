import { useEffect, useState } from "react";
import styled from "styled-components";
import Index from "./components/Index";
import SetIndex from "./components/SetIndex";
import Video from "./components/Video";

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
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  // Load saved theme preference on startup
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
      setTheme(saved);
    }
  }, []);

  // Apply theme to the <html> element
  useEffect(() => {
    const root = document.documentElement; // <html>
    if (theme === "system") {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "system");
    } else {
      root.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const cycleTheme = () => {
    setTheme((t) => (t === "system" ? "dark" : t === "dark" ? "light" : "system"));
  };

  return (
    <StyledApp className="App">
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
