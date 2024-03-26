import React from "react";
import { ReactNode, CSSProperties } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
  onClick?: () => void | null;
  type?: "button" | "submit" | "reset" | undefined;
  style?: CSSProperties;
  disabled?: boolean;
}

const Button = ({ children }: Props) => {
  return <button>{children}</button>;
};

export default Button;
