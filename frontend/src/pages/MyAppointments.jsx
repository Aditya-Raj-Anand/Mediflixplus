import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const fadeInStagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState('');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatSlotDate = (slotDate) => {
    const [day, month, year] = slotDate.split('_');
    return `${day} ${months[Number(month)]} ${year}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`/api/user/appointments`, { headers: { token } });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {  headers: {
  Authorization: `Bearer ${token}`
}
}
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/user/verifyRazorpay`, response, {
headers: {
  Authorization: `Bearer ${token}`
}
,
          });
          if (data.success) {
            getUserAppointments();
            navigate('/my-appointments');
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        {headers: {
  Authorization: `Bearer ${token}`
}
 }
      );
      if (data.success) initPay(data.order);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId },
        { headers: {
  Authorization: `Bearer ${token}`
}
 }
      );
      if (data.success) {
        window.location.replace(data.session_url);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className='px-4 md:px-10 py-6 text-text font-outfit'>
      <p className='pb-3 mt-8 text-lg font-semibold text-muted border-b'>My Appointments</p>

      <div className='mt-6'>
        {appointments.map((item, index) => (
          <motion.div
            key={item._id}
            custom={index}
            variants={fadeInStagger}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='grid grid-cols-[1fr_2fr] sm:flex gap-4 sm:gap-6 py-4 border-b items-center text-sm'
          >
            {/* Doctor Image */}
            <div>
              <img className='w-36 bg-[#EAEFFF] rounded-md' src={item.docData.image} alt='Doctor' />
            </div>

            {/* Appointment Details */}
            <div className='flex-1 text-muted'>
              <p className='text-lg font-semibold text-text'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-sm font-medium mt-1 text-gray-600'>Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p className='mt-1'>
                <span className='text-sm font-medium text-gray-600'>Date & Time:</span>{' '}
                {formatSlotDate(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Actions */}
            <div className='flex flex-col gap-2 justify-end text-sm text-center'>
              {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                <button
                  onClick={() => setPayment(item._id)}
                  className='text-muted py-2 border rounded hover:bg-primary hover:text-white transition-all sm:min-w-48'
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                <>
                  <button
                    onClick={() => appointmentStripe(item._id)}
                    className='py-2 border rounded hover:bg-gray-100 hover:text-white transition-all flex justify-center items-center sm:min-w-48'
                  >
                    <img className='max-w-20 max-h-5' src={assets.stripe_logo} alt='Stripe' />
                  </button>
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className='py-2 border rounded hover:bg-gray-100 hover:text-white transition-all flex justify-center items-center sm:min-w-48'
                  >
                    <img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt='Razorpay' />
                  </button>
                </>
              )}

              {item.payment && !item.isCompleted && (
                <button className='py-2 border rounded text-muted bg-[#EAEFFF] sm:min-w-48'>Paid</button>
              )}
              {item.isCompleted && (
                <button className='py-2 border border-green-500 text-green-500 rounded sm:min-w-48'>Completed</button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='text-muted py-2 border rounded hover:bg-red-600 hover:text-white transition-all sm:min-w-48'
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && (
                <button className='py-2 border border-red-500 text-red-500 rounded sm:min-w-48'>
                  Appointment cancelled
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
