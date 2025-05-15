'use client';

import StorePopover from '../StorePopover/StorePopover';
import './SideBar.scss';
import { LuAudioLines } from 'react-icons/lu';
import { PiSignOutDuotone } from 'react-icons/pi';
import { HiOutlineServer } from 'react-icons/hi2';
import { RiDashboardFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';
import { mainLinks } from '@/utils/mainLinks';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { IconButton } from '@mui/material';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/lib/features/authSlice';

const linkIcon = (linkName) => {
  switch (linkName) {
    case 'Dashboard':
      return <RiDashboardFill className="icon" />;
    case 'Recordings':
      return <LuAudioLines className="icon" />;
    case 'Devices':
      return <HiOutlineServer className="icon" />;
    case 'Settings':
      return <IoMdSettings className="icon" />;
  }
};

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const pathName = usePathname();

  const handleLogout = () => {
    Cookies.remove('authToken');
    dispatch(clearUser());
    window.location.href = '/auth/login';
  };

  return (
    <div className={`sideBar ${isOpen ? 'open' : ''}`}>
      <IconButton className="mobileToggle" onClick={() => setIsOpen(!isOpen)}>
        <HiOutlineMenuAlt2 />
      </IconButton>
      <div className="top">
        <StorePopover />
        {mainLinks.map((link, index) => (
          <Link
            className={`tab ${
              link.href === pathName || (link.href !== '/dashboard' && pathName.includes(link.href)) ? 'active' : ''
            }`}
            key={index}
            href={link.href}
          >
            {linkIcon(link?.name)}
            <p>{link?.name}</p>
          </Link>
        ))}
      </div>
      <span className="tab" onClick={handleLogout}>
        <PiSignOutDuotone className="icon" />
        <p>Logout</p>
      </span>
    </div>
  );
};

export default SideBar;
