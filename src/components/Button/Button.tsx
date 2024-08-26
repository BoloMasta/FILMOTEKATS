import styles from "./Button.module.scss";

type ButtonProps = {
  onClick: () => void;
  label: string;
<<<<<<< Updated upstream
  className?: string;
=======
  className: string;
>>>>>>> Stashed changes
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
<<<<<<< Updated upstream
  className,
=======
  className = "",
>>>>>>> Stashed changes
  disabled = false,
  variant = "primary",
}) => {
  const getButtonClass = () => {
    switch (variant) {
      case "primary":
        return styles.btnPrimary;
      case "secondary":
        return styles.btnSecondary;
      case "tertiary":
        return styles.btnTertiary;
      default:
        return styles.btnPrimary;
    }
  };

  return (
<<<<<<< Updated upstream
    <button
      className={`${styles.btn} ${getButtonClass()} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
=======
    <button className={`${styles.btn} ${getButtonClass()} ${className}`} onClick={onClick} disabled={disabled}>
>>>>>>> Stashed changes
      {label}
    </button>
  );
};

export default Button;
