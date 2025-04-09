'use client';
import StorePopover from '../StorePopover/StorePopover';
import './SideBar.scss';
import { LuAudioLines } from 'react-icons/lu';
import { PiSignOutDuotone } from 'react-icons/pi';
import { HiOutlineServer } from 'react-icons/hi2';
import { RiDashboardFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';
import { mainLinks } from '@/utils/mainLinks';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

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
  const router = useRouter();
  const navigate = (path) => router.push(path);
  const pathName = usePathname();

  const handleLogout = () => {
    navigate('/auth/login');
  };

  return (
    <div className="sideBar">
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
