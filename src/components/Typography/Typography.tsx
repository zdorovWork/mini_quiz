import "./Typography.css";

interface TypographyProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "xlarge";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  color?: "primary" | "secondary" | "error" | "success";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  style?: React.CSSProperties;
}

const Typography = ({
  children,
  size = "medium",
  weight = "normal",
  align = "left",
  color = "primary",
  as: Component = "p",
  style,
}: TypographyProps) => {
  const className = [
    "ui-typography",
    `ui-typography--size-${size}`,
    `ui-typography--weight-${weight}`,
    `ui-typography--align-${align}`,
    `ui-typography--color-${color}`,
  ].join(" ");

  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  );
};

export default Typography;
