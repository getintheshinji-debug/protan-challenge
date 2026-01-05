import styled, { css } from "styled-components";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, ReturnType<typeof css>> = {
  primary: css`
    background: var(--accent);
    border-color: var(--accent);
    color: var(--accentText);

    &:hover {
      background: var(--accentHover);
    }
  `,
  secondary: css`
    background: var(--card);
    border-color: var(--border);
    color: var(--text);

    &:hover {
      background: var(--cardHover);
    }
  `,
  ghost: css`
    background: transparent;
    border-color: var(--border);
    color: var(--text);

    &:hover {
      background: var(--cardHover);
    }
  `,
};

const Button = styled.button<{ $variant?: Variant }>`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  transition: background 0.15s ease, transform 0.05s ease, opacity 0.15s ease;

  ${(p) => variants[p.$variant ?? "secondary"]}

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export default Button;

