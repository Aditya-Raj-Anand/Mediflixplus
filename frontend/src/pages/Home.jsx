import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import { motion } from 'framer-motion';

// Animation variants
const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const Home = () => {
  return (
    <div className='overflow-hidden'>
      {/* Static animated component */}
      <Header />

      {/* Animated sections */}
      <motion.section
        custom={0}
        variants={sectionFade}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <SpecialityMenu />
      </motion.section>

      <motion.section
        custom={1}
        variants={sectionFade}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <TopDoctors />
      </motion.section>

      <motion.section
        custom={2}
        variants={sectionFade}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <Banner />
      </motion.section>
    </div>
  );
};

export default Home;
