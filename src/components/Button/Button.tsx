type ButtonProps = {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  disabled = false,
  variant = "primary",
}) => {
  const getButtonClass = () => {
    switch (variant) {
      case "primary":
        return "btn-primary";
      case "secondary":
        return "btn-secondary";
      default:
        return "btn-primary";
    }
  };

  return (
    <button className={`btn ${getButtonClass()}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
