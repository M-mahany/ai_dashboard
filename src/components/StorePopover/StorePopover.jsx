'use client';

import { Avatar, Button, Popover, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import './StorePopover.scss';
import { FaChevronDown } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { useGetMyStoresQuery } from '@/lib/services/storesApi';
import { LuStore } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setStore } from '@/lib/features/storeSlice';
import Modals from '../Modals/Modals';

const StorePopover = () => {
  const [modal, setModal] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetMyStoresQuery();

  const stores = data?.data ?? [];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'store-popover' : undefined;

  useEffect(() => {
    if (error) {
      toast(error?.data?.message || error || 'Error Fetching Stores', {
        type: 'error',
      });
    }
    if (data) {
      setSelectedStore(stores[0]);
    }
  }, [data, error]);

  useEffect(() => {
    if (selectedStore) {
      dispatch(setStore(selectedStore));
    }
  }, [selectedStore]);

  const handleStoreClick = (store) => {
    setSelectedStore(store);
    handleClose();
  };

  return (
    <>
      <Modals setModal={setModal} modal={modal} />
      {isLoading ? (
        <Skeleton variant="text" sx={{ fontSize: '2.5rem', width: '100%' }} />
      ) : (
        <>
          <Button aria-describedby={id} id="storeButton" onClick={handleClick}>
            <Avatar
              sx={{ bgcolor: 'var(--secondary)' }}
              style={{ width: '28px', height: '28px', color: 'var(--main)', fontSize: '16px' }}
            >
              T
            </Avatar>
            <span className="storeName">{selectedStore?.name}</span>
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
              {stores?.map((store, i) => (
                <Button
                  key={i}
                  onClick={() => handleStoreClick(store)}
                  className={selectedStore?.name === store?.name ? 'active' : ''}
                >
                  <LuStore />
                  {store?.name}
                </Button>
              ))}
              <Button onClick={() => setModal({ name: 'addNewStore' })}>
                <FiPlus />
                Add New Store
              </Button>
            </div>
          </Popover>
        </>
      )}
    </>
  );
};

export default StorePopover;
