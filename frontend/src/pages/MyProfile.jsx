import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: {
  Authorization: `Bearer ${token}`
}
,
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return userData ? (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-2xl w-full px-4 py-8 mx-auto flex flex-col gap-4 text-sm text-text font-outfit'
    >
      {/* ---------- Profile Picture ---------- */}
      {isEdit ? (
        <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer group'>
            <img
              className='w-36 h-36 object-cover rounded opacity-75'
              src={image ? URL.createObjectURL(image) : userData.image}
              alt='profile'
            />
            {!image && (
              <img
                className='w-10 absolute bottom-2 right-2 opacity-70 group-hover:opacity-100 transition'
                src={assets.upload_icon}
                alt='upload'
              />
            )}
          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden />
        </label>
      ) : (
        <img className='w-36 h-36 object-cover rounded' src={userData.image} alt='profile' />
      )}

      {/* ---------- Name ---------- */}
      {isEdit ? (
        <input
          className='text-3xl font-medium bg-gray-50 max-w-xs p-1 rounded focus:outline-none focus:ring focus:ring-primary'
          type='text'
          value={userData.name}
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
        />
      ) : (
        <p className='text-3xl font-semibold mt-2'>{userData.name}</p>
      )}

      <hr className='border-muted my-4' />

      {/* ---------- Contact Info ---------- */}
      <div>
        <p className='text-muted underline font-medium mb-2'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-3 text-sm'>
          <span className='font-medium'>Email:</span>
          <span className='text-blue-600 break-all'>{userData.email}</span>

          <span className='font-medium'>Phone:</span>
          {isEdit ? (
            <input
              className='bg-gray-50 rounded p-1 max-w-xs focus:outline-none focus:ring focus:ring-primary'
              type='text'
              value={userData.phone}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <span className='text-blue-600'>{userData.phone}</span>
          )}

          <span className='font-medium'>Address:</span>
          {isEdit ? (
            <div className='flex flex-col gap-2'>
              <input
                className='bg-gray-50 rounded p-1 max-w-xs focus:outline-none focus:ring focus:ring-primary'
                type='text'
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className='bg-gray-50 rounded p-1 max-w-xs focus:outline-none focus:ring focus:ring-primary'
                type='text'
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <span className='text-muted'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </span>
          )}
        </div>
      </div>

      {/* ---------- Basic Info ---------- */}
      <div className='mt-6'>
        <p className='text-muted underline font-medium mb-2'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-3 text-sm'>
          <span className='font-medium'>Gender:</span>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              className='bg-gray-50 rounded p-1 max-w-xs focus:outline-none focus:ring focus:ring-primary'
            >
              <option value='Not Selected'>Not Selected</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          ) : (
            <span className='text-muted'>{userData.gender}</span>
          )}

          <span className='font-medium'>Birthday:</span>
          {isEdit ? (
            <input
              type='date'
              value={userData.dob}
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              className='bg-gray-50 rounded p-1 max-w-xs focus:outline-none focus:ring focus:ring-primary'
            />
          ) : (
            <span className='text-muted'>{userData.dob}</span>
          )}
        </div>
      </div>

      {/* ---------- Save / Edit Button ---------- */}
      <div className='mt-8'>
        {isEdit ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={updateUserProfileData}
            className='border border-primary px-8 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition-all'
          >
            Save information
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsEdit(true)}
            className='border border-primary px-8 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition-all'
          >
            Edit
          </motion.button>
        )}
      </div>
    </motion.div>
  ) : null;
};

export default MyProfile;
