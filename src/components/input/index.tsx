import { ReactNode } from 'react';
import './index.css';

type InputProps = {
  placeholder: string;
  value: string;
  icon?: ReactNode;
  onChange: (value: string) => void;
};

export default function Input({
  placeholder,
  value,
  icon,
  onChange,
}: InputProps) {
  return (
    <div className='input-container'>
      {icon}
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
