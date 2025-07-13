import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <header className='flex flex-col md:flex-row bg-[rgb(95,111,255)] rounded-2xl px-6 md:px-10 lg:px-20 text-white overflow-hidden shadow-md'>
      
      {/* Left Content */}
      <div className='md:w-1/2 flex flex-col justify-center gap-6 py-12 md:py-20'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight'>
          Book Appointment <br /> With Trusted Doctors
        </h1>

        <div className='flex flex-col md:flex-row items-center gap-3 text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt='users' />
          <p className='max-w-sm text-white/80'>
            Simply browse through our extensive list of trusted doctors,{' '}
            <br className='hidden sm:block' /> schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href='#speciality'
          className='flex items-center gap-2 bg-white px-6 py-3 rounded-full text-[rgb(95,111,255)] hover:scale-105 transition-transform duration-300 w-fit shadow-sm font-medium'
        >
          Book appointment
          <img className='w-3' src={assets.arrow_icon} alt='arrow' />
        </a>
      </div>

      {/* Right Image */}
      <div className='md:w-1/2 flex items-center justify-center p-6 md:p-0 relative'>
        <img
          className='w-full max-w-md md:max-w-[400px] object-contain rounded-lg'
          src={assets.header_img}
          alt='Doctor'
        />
      </div>
    </header>
  );
};

export default Header;
