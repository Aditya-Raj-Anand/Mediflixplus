import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-10 lg:px-20 bg-gradient-to-b from-[#e6f2ff] via-[#f5faff] to-white text-text shadow-sm rounded-2xl">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className='w-36 md:w-44 cursor-pointer object-contain'
        src={assets.logo}
        alt='Mediflix+'
      />

      {/* Desktop Menu */}
      <ul className='hidden md:flex items-center gap-6 font-medium text-text/90'>
        {['/', '/doctors', '/about', '/contact'].map((path, idx) => (
          <NavLink key={idx} to={path}>
            <li className='py-1 hover:text-primary transition-all'>
              {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
            </li>
          </NavLink>
        ))}
      </ul>

      {/* User Actions */}
      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 h-8 rounded-full object-cover' src={userData.image || assets.default_avatar} alt='user' />
            <img className='w-2.5' src={assets.dropdown_icon} alt='menu' />
            <div className='absolute top-10 right-0 text-base font-medium text-muted z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-white shadow-md rounded-lg flex flex-col gap-3 p-4'>
                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-danger cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-6 py-2 rounded-full font-light hidden md:block hover:shadow-md transition'
          >
            Create account
          </button>
        )}

        {/* Hamburger Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden cursor-pointer'
          src={assets.menu_icon}
          alt='menu'
        />
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full z-30 bg-white shadow-lg transition-all duration-300 ${showMenu ? 'w-64' : 'w-0 overflow-hidden'}`}>
        <div className='flex items-center justify-between p-5 border-b'>
          <img src={assets.logo} className='w-36' alt='Mediflix+' />
          <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-6 cursor-pointer' alt='close' />
        </div>
        <ul className='flex flex-col gap-3 mt-6 px-6 text-base font-medium text-text'>
          <NavLink onClick={() => setShowMenu(false)} to='/'><p>HOME</p></NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p>ALL DOCTORS</p></NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/about'><p>ABOUT</p></NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact'><p>CONTACT</p></NavLink>
          {!token && (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate('/login');
              }}
              className='bg-primary text-white mt-4 py-2 rounded-full'
            >
              Create Account
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
