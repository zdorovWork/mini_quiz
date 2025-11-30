import "./Button.css";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
}

const Button = ({
  onClick,
  children,
  disabled = false,
  fullWidth = false,
  variant = "primary",
}: ButtonProps) => {
  const className = [
    "ui-button",
    `ui-button--${variant}`,
    fullWidth ? "ui-button--full-width" : "",
    disabled ? "ui-button--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
