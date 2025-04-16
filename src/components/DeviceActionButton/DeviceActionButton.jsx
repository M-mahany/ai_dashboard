'use client';

import { Button, ClickAwayListener, IconButton, Popper } from '@mui/material';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import './DeviceActionButton.scss';
import { useRouter } from 'next/navigation';

const DeviceActionButton = ({ device }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const id = open ? 'deviceActionPopper' : undefined;
  return (
    <div>
      <IconButton aria-describedby={id} type="button" onClick={handleClick}>
        <BsThreeDots />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <div className="innerDeviceActionPopper">
            <Button onClick={() => router.push(`/dashboard/devices/${device?.id}`)}>system health</Button>
            <Button>update system</Button>
            <Button>Update App</Button>
          </div>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default DeviceActionButton;
