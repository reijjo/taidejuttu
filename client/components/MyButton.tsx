import { ReactNode, CSSProperties } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
  onClick?: () => void | null;
  type?: "button" | "submit" | "reset" | undefined;
  style?: CSSProperties;
  disabled?: boolean;
}

const MyButton = ({
  className,
  children,
  onClick,
  type,
  style,
  disabled,
}: Props) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MyButton;
