import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(
      circle at top,
      rgba(127, 127, 127, 0.06),
      transparent 40%
    ),
    var(--bg);
  color: var(--text);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px 64px;
  gap: 18px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 980px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: var(--card);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  padding: 20px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  /* micro-upgrade: ultra-subtle lift */
  &:hover {
    transform: translateY(-0.5px);
    box-shadow: 0 14px 48px rgba(0, 0, 0, 0.16);
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--border),
    transparent
  );
  opacity: 0.9;
`;

