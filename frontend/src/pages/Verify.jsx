import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const appointmentId = searchParams.get('appointmentId');

  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const verifyStripe = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/verifyStripe`,
        { success, appointmentId },
        { headers: {
  Authorization: `Bearer ${token}`
}
 }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      navigate('/my-appointments');
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (token && appointmentId && success) {
      verifyStripe();
    }
  }, [token, appointmentId, success]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='min-h-[60vh] flex flex-col items-center justify-center text-center text-text'
    >
      <div className='w-16 h-16 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin mb-4'></div>
      <p className='text-muted text-sm'>Verifying your payment, please wait...</p>
    </motion.div>
  );
};

export default Verify;
