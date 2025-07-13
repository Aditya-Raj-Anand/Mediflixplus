import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div
      id='speciality'
      className='flex flex-col items-center gap-4 py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-b from-[#e6f2ff] via-[#f5faff] to-white rounded-2xl text-[#262626] shadow-sm'
    >
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm text-muted'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      <div className='flex sm:justify-center gap-4 pt-6 w-full overflow-x-auto scrollbar-hide'>
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            key={index}
            className='flex flex-col items-center text-xs bg-white px-4 py-5 rounded-xl shadow hover:shadow-md hover:-translate-y-2 transition-all duration-300 cursor-pointer flex-shrink-0'
          >
            <img className='w-16 sm:w-20 mb-2' src={item.image} alt={item.speciality} />
            <p className='text-sm text-text font-medium'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
