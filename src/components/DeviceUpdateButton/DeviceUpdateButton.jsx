import { Button, CircularProgress } from '@mui/material';
import './DeviceUpdateButton.scss';
import { useUpdateDeviceMutation } from '@/lib/services/devicesApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const DeviceUpdateButton = ({ type, isLight, deviceId }) => {
  const [updateDevice, { data, isLoading, error }] = useUpdateDeviceMutation();

  const handleUpdate = () => {
    updateDevice({ id: deviceId, endpoint: `update-${type}` });
  };

  useEffect(() => {
    if (data) {
      toast(data?.message || `Device  ${type} updated successfully!`, { type: 'success' });
    }
    if (error) {
      toast(error?.data?.message || 'Something went wrong!', { type: 'error' });
    }
  }, [error, data]);

  return (
    <Button id="deviceUpdateButton" className={isLight ? 'light' : ''} onClick={handleUpdate} disabled={isLoading}>
      {isLoading ? (
        <>
          <CircularProgress style={{ color: 'var(--secondary)', width: '24px', height: '24px' }} /> updating...
        </>
      ) : type === 'system' ? (
        'Update System'
      ) : (
        'Update App'
      )}
    </Button>
  );
};

export default DeviceUpdateButton;
