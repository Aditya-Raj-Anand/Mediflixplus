import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const About = () => {
  return (
    <motion.section
      className='px-4 md:px-10 lg:px-20 py-10 text-text font-outfit'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
    >
      {/* --- ABOUT US --- */}
      <motion.div custom={0} variants={fadeIn} className='text-center text-3xl font-light text-muted mb-10'>
        <p>
          ABOUT <span className='text-text font-semibold'>US</span>
        </p>
      </motion.div>

      <div className='flex flex-col md:flex-row gap-12 items-center mb-16'>
        <motion.img
          custom={0}
          variants={fadeIn}
          className='w-full md:max-w-[360px] rounded-lg shadow-md'
          src={assets.about_image}
          alt='About us'
        />
        <motion.div
          custom={1}
          variants={fadeIn}
          className='flex flex-col justify-center gap-5 text-sm text-muted md:w-2/3'
        >
          <p>
            Welcome to <strong>Mediflix+</strong>, your trusted digital partner in navigating modern healthcare. We simplify the process of finding, booking, and managing doctor appointments—saving you time and bringing care closer to you.
          </p>
          <p>
            At Mediflix+, we’re on a mission to transform healthcare accessibility through technology. Whether it’s your first consultation or recurring care, our platform is designed to support your journey with clarity and ease.
          </p>
          <h3 className='text-base font-semibold text-text'>Our Vision</h3>
          <p>
            We envision a future where healthcare is effortlessly accessible to everyone. Mediflix+ aims to bridge the gap between patients and providers with reliable, intuitive, and secure digital solutions.
          </p>
        </motion.div>
      </div>

      {/* --- WHY CHOOSE US --- */}
      <motion.div custom={2} variants={fadeIn} className='text-xl font-medium mb-6'>
        <p>
          WHY <span className='text-text font-semibold'>CHOOSE US</span>
        </p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>
        {[
          {
            title: 'EFFICIENCY',
            desc: 'Book appointments quickly and manage your schedule without the hassle.',
          },
          {
            title: 'ACCESSIBILITY',
            desc: 'Connect with verified doctors from anywhere, anytime.',
          },
          {
            title: 'CUSTOMIZED EXPERIENCE',
            desc: 'Personal health insights, reminders, and support tailored just for you.',
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            custom={idx + 3}
            variants={fadeIn}
            className='border rounded-lg px-8 py-10 text-sm text-muted hover:bg-primary hover:text-white transition duration-300 cursor-pointer shadow-sm'
          >
            <h4 className='font-semibold mb-2'>{item.title}</h4>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default About;
