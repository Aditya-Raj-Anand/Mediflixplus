import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 my-16 px-6 md:px-10 lg:px-20 text-[#262626]'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm text-muted'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Grid of Doctors */}
      <div className='w-full grid grid-cols-auto gap-4 pt-6 gap-y-6'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className='bg-gradient-to-b from-[#e6f2ff] via-[#f5faff] to-white border border-[#C9D8FF] rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300'
          >
            <img
              className='w-full object-cover bg-[#EAEFFF] max-h-48'
              src={item.image}
              alt={item.name}
            />
            <div className='p-4'>
              <div
                className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}
              >
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                <span>{item.available ? 'Available' : 'Not Available'}</span>
              </div>
              <p className='text-lg font-medium mt-1'>{item.name}</p>
              <p className='text-sm text-[#5C5C5C]'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className='bg-[#e6f2ff] text-gray-700 px-12 py-3 rounded-full mt-10 hover:bg-[#dceeff] transition-colors'
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
