import React from "react";
import styles from "./Button.module.scss"; // Import SCSS dla Button

type ButtonProps = {
  onClick: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

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
      default:
        return styles.btnPrimary;
    }
  };

  return (
    <button className={`${styles.btn} ${getButtonClass()} ${className}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
