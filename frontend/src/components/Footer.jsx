import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className='bg-gradient-to-b from-[#e6f2ff] via-[#f5faff] to-white px-6 md:px-10 pt-10 mt-32 text-text font-outfit rounded-2xl shadow-sm'>
      <div className='grid gap-14 md:grid-cols-[2fr_1fr_1fr] text-sm'>

        {/* Logo + About */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt='Mediflix+' />
          <p className='max-w-md text-muted leading-6'>
            Mediflix+ is your trusted partner in managing doctor appointments online. Book your next visit with convenience and speed.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-lg font-semibold mb-4'>Company</p>
          <ul className='flex flex-col gap-2 text-muted'>
            <li className='hover:text-primary cursor-pointer'>Home</li>
            <li className='hover:text-primary cursor-pointer'>About Us</li>
            <li className='hover:text-primary cursor-pointer'>Services</li>
            <li className='hover:text-primary cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className='text-lg font-semibold mb-4'>Get in Touch</p>
          <ul className='flex flex-col gap-2 text-muted'>
            <li>+91-xxxxxxxxxx</li>
            <li>support@mediflix.app</li>
          </ul>
        </div>
      </div>

      <div className='mt-10 border-t pt-4 text-center text-sm text-muted'>
        © {new Date().getFullYear()} Mediflix+. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
