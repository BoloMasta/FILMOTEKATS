import { ButtonProps } from "../../ts/types/componentProps";
import styles from "./Button.module.scss";

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  className,
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
    <button
      className={`${styles.btn} ${getButtonClass()} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
