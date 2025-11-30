import "./Input.css";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  disabled?: boolean;
}

const Input = ({
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  disabled = false,
}: InputProps) => {
  const className = [
    "ui-input",
    error ? "ui-input--error" : "",
    disabled ? "ui-input--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="ui-input-wrapper">
      <input
        className={className}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <span className="ui-input__error-message">{error}</span>}
    </div>
  );
};

export default Input;
