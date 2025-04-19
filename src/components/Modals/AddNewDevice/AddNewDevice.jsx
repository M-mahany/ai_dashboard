import './AddNewDevice.scss';
import { Button, CircularProgress, IconButton } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { useRegisterDeviceToStoreMutation } from '@/lib/services/devicesApi';
import { useSelector } from 'react-redux';
import DeviceScript from '@/components/DeviceScript/DeviceScript';

const AddNewDevice = ({ setModal }) => {
  const storeSelected = useSelector((state) => state?.store);

  const [registerNewDeviceToStore, { data: apiData, isLoading, error }] = useRegisterDeviceToStoreMutation();

  const installScript = apiData?.data?.script;

  const handleSubmit = () => {
    registerNewDeviceToStore(storeSelected?._id);
  };

  return (
    <div className="addNewDeviceModal">
      <div className="modalHeader">
        <p>Add Device</p>
        <IconButton className="closeBttn" onClick={() => setModal(null)}>
          <IoClose />
        </IconButton>
      </div>
      <div className="modalBody">
        <p>The device will be registered to the store stated below.</p>
        <p className="storeSelected">
          {storeSelected?.name} - ({storeSelected?._id})
        </p>
        {isLoading ? (
          <div className="scriptLoader">
            <CircularProgress style={{ color: 'var(--main)', width: '24px', height: '24px' }} />{' '}
            <p>Adding device & generating keys...</p>
          </div>
        ) : apiData || error ? (
          <>
            {apiData && <p className="blue">{apiData?.message}</p>}
            <DeviceScript data={apiData} error={error} installScript={installScript} />
            {apiData && (
              <p className="infotxt">The install script is valid for 7 days. If expired, please renew the key.</p>
            )}
          </>
        ) : (
          <p>Are You sure you want to continue?</p>
        )}
      </div>
      <div className="modalFooter">
        <Button onClick={() => setModal(null)}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add'}
        </Button>
      </div>
    </div>
  );
};

export default AddNewDevice;
