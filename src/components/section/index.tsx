import { ReactNode } from 'react';
import './index.css';
interface SectionProps {
  children: ReactNode;
}

export const Section = ({ children }: SectionProps) => {
  return <div className='section'>{children}</div>;
};
