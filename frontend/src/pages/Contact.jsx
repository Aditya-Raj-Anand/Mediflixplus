import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const Contact = () => {
  return (
    <motion.section
      className='px-4 md:px-10 lg:px-20 py-12 text-text font-outfit'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
    >
      {/* --- Heading --- */}
      <motion.div variants={fadeInUp} custom={0} className='text-center text-3xl font-light text-muted mb-12'>
        <p>
          CONTACT <span className='text-text font-semibold'>US</span>
        </p>
      </motion.div>

      {/* --- Content Section --- */}
      <motion.div
        variants={fadeInUp}
        custom={1}
        className='flex flex-col md:flex-row justify-center items-start gap-10 mb-28 text-sm'
      >
        <img className='w-full md:max-w-[360px] rounded-lg shadow-sm' src={assets.contact_image} alt='Contact' />

        <div className='flex flex-col justify-center items-start gap-6'>
          <h3 className='font-semibold text-lg text-text'>OUR OFFICE</h3>
          <p className='text-muted'>
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>

          <p className='text-muted'>
            Tel: +1 (415) 555-0132 <br />
            Email: support@mediflixplus.app
          </p>

          <h3 className='font-semibold text-lg text-text'>CAREERS AT MEDIFLIX+</h3>
          <p className='text-muted'>We're always on the lookout for passionate minds to join our mission.</p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='border border-black px-8 py-3 text-sm rounded transition-all hover:bg-black hover:text-white duration-300'
          >
            Explore Jobs
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
