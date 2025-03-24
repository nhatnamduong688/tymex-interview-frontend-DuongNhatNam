import { ReactNode } from 'react';
import './index.css';

interface IButton {
  text: string;
  typeButton?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  text,
  icon,
  typeButton = 'primary',
  type = 'button',
  size = 'small',
  onClick,
  className,
  disabled,
}: IButton) => {
  return (
    <button
      className={`button ${typeButton} ${size} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
