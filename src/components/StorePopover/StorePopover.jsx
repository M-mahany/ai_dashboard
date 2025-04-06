'use client';

import { Avatar, Button, Divider, Popover } from '@mui/material';
import { useState } from 'react';
import './StorePopover.scss';
import { FaChevronDown } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { LuStore } from 'react-icons/lu';

const StorePopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStore, setSelectedStore] = useState('TestStore1');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'store-popover' : undefined;

  return (
    <>
      <Button aria-describedby={id} id="storeButton" onClick={handleClick}>
        <Avatar
          sx={{ bgcolor: 'var(--secondary)' }}
          style={{ width: '28px', height: '28px', color: 'var(--main)', fontSize: '16px' }}
        >
          T
        </Avatar>
        <span className="storeName">{selectedStore}</span>
        <FaChevronDown className="icon" />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div id="popverMenu">
          {Array.from({ length: 5 }).map((_, i) => (
            <Button
              key={i}
              onClick={() => setSelectedStore(`TestStore${i + 1}`)}
              className={selectedStore === `TestStore${i + 1}` ? 'active' : ''}
            >
              <LuStore />
              TestStore{i + 1}
            </Button>
          ))}
          <Button>
            <FiPlus />
            Add New Store
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default StorePopover;
