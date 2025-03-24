import Link from 'next/link';
import './index.css';

interface ILink {
  text: string;
  href: string;
  active?: boolean;
  type?: 'primary' | 'secondary' | 'tertiary';
  blank?: boolean;
}

const CustomLink = ({ text, href, active }: ILink) => {
  return (
    <Link className={`${active ? 'active' : ''} link`} href={href}>
      {text}
    </Link>
  );
};

export default CustomLink;
