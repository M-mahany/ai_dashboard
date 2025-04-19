'use client';

import { Button, ClickAwayListener, IconButton, Popper } from '@mui/material';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import './DeviceActionButton.scss';
import { useRouter } from 'next/navigation';
import Modals from '../Modals/Modals';

const DeviceActionButton = ({ device }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const id = open ? 'deviceActionPopper' : undefined;

  return (
    <div>
      {modal && <Modals modal={modal} setModal={setModal} />}
      <IconButton aria-describedby={id} type="button" onClick={handleClick}>
        <BsThreeDots />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <div className="innerDeviceActionPopper">
            <Button onClick={() => router.push(`/dashboard/devices/${device?.id}`)} disabled={!device?.row?.isOnline}>
              system health
            </Button>
            <Button
              onClick={() => setModal({ name: 'deviceKey', deviceId: device?.id })}
              disabled={device?.row?.isRegistered}
            >
              show Key
            </Button>
            <Button
              onClick={() => setModal({ name: 'refreshKey', deviceId: device?.id })}
              disabled={device?.row?.isRegistered}
            >
              renew Key
            </Button>
          </div>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default DeviceActionButton;
