import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeInStagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ];

  return (
    <div className='px-4 md:px-10 py-6 text-text font-outfit'>
      <p className='text-muted text-sm mb-4'>
        Browse our expert doctors by specialty and book appointments with ease.
      </p>

      <div className='flex flex-col sm:flex-row items-start gap-5'>

        {/* Filter Button (Mobile) */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm sm:hidden transition-all ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filter Options */}
        <motion.div
          className={`flex-col gap-4 text-sm ${showFilter ? 'flex' : 'hidden sm:flex'}`}
          initial='hidden'
          animate='visible'
        >
          {specialities.map((item, idx) => (
            <motion.p
              key={idx}
              custom={idx}
              variants={fadeInStagger}
              onClick={() =>
                speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)
              }
              className={`pl-3 py-1.5 pr-16 w-[94vw] sm:w-auto border rounded cursor-pointer transition-all ${
                speciality === item ? 'bg-[#E2E5FF] text-black' : 'text-muted border-gray-300'
              }`}
            >
              {item}
            </motion.p>
          ))}
        </motion.div>

        {/* Doctors Grid */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.length === 0 ? (
            <p className='text-muted text-sm italic mt-6'>No doctors available under this specialty.</p>
          ) : (
            filterDoc.map((item, index) => (
              <motion.div
                key={item._id}
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
                variants={fadeInStagger}
                custom={index}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 shadow-sm'
              >
                <img className='bg-[#EAEFFF] w-full' src={item.image} alt={item.name} />
                <div className='p-4'>
                  <div
                    className={`flex items-center gap-2 text-sm ${
                      item.available ? 'text-green-500' : 'text-gray-500'
                    }`}
                  >
                    <p className={`w-2 h-2 rounded-full ${
                      item.available ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                    <p>{item.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                  <p className='text-muted text-sm'>{item.speciality}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
