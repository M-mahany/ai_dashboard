'use client';

import { Button, ClickAwayListener, IconButton, Popper } from '@mui/material';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import './DeviceActionButton.scss';

const DeviceActionButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
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
            <Button>details</Button>
            <Button>Update App</Button>
            <Button>update system</Button>
          </div>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default DeviceActionButton;
