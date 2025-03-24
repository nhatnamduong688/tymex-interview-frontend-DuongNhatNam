'use client';

import Link from 'next/link';
import Icon from '@/components/icon';
import Input from '@/components/input';
import Button from '@/components/button';
import './index.css';

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-content-group'>
          <div className='footer-content-navigation'>
            <p className='footer-title'>Navigation</p>
            <div className='footer-links-group'>
              <ul className='footer-links'>
                <li className='footer-links-item'>
                  <Link href='/'>Home</Link>
                </li>
                <li className='footer-links-item'>
                  <Link href='/about'>About us</Link>
                </li>
                <li className='footer-links-item'>
                  <Link href='/contact'>Our teams</Link>
                </li>
              </ul>
              <ul className='footer-links'>
                <li className='footer-links-item'>
                  <Link href='/contact'>Whitepaper</Link>
                </li>
                <li className='footer-links-item'>
                  <Link href='/marketplace'>Marketplace</Link>
                </li>
                <li className='footer-links-item'>
                  <Link href='/'>Roadmap</Link>
                </li>
              </ul>
              <ul className='footer-links'>
                <li className='footer-links-item'>
                  <Link href='/contact'>FAQs</Link>
                </li>
                <li className='footer-links-item'>
                  <Link href='/marketplace'>News</Link>
                </li>
                <li className='footer-links-item'>
                  <Link href='/'>Community</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='footer-content-contact'>
            <p className='footer-title'>Contact us</p>
            <div className='footer-contact-group'>
              <div className='footer-contact-item'>
                <Icon name='phone' />
                <a href='tel:+01234568910'>01234568910</a>
              </div>
              <div className='footer-contact-item'>
                <Icon name='comment' />
                <a href='mailto:contact@example.com'>contact@example.com</a>
              </div>
            </div>
          </div>
        </div>
        <div className='footer-content-subscribe'>
          <p className='footer-title'>Subcribe to receive our latest update</p>
          <div className='footer-subscribe-group'>
            <Input
              placeholder='Enter your email'
              value=''
              onChange={() => {}}
            />
            <Button text='Subscribe' size='medium' />
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <div className='footer-bottom-copyright'>
          <p>©2023 Tyme - Edit. All Rights reserved.</p>
        </div>
        <ul className='footer-bottom-policy'>
          <li className='footer-bottom-policy-item'>
            <Link href='/'>Security</Link>
          </li>
          <li className='footer-bottom-policy-item'>
            <Link href='/'>Legal</Link>
          </li>
          <li className='footer-bottom-policy-item'>
            <Link href='/'>Privacy</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
