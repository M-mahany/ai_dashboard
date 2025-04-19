import { IconButton, Skeleton } from '@mui/material';
import './DeviceKeyModal.scss';
import { IoClose } from 'react-icons/io5';
import DeviceScript from '@/components/DeviceScript/DeviceScript';
import { useGetDeviceKeyQuery, useRefreshDeviceKeyQuery } from '@/lib/services/devicesApi';

const DeviceKeyModal = ({ setModal, modal }) => {
  const {
    data: getKeyData,
    isLoading: getKeyLoading,
    error: getKeyError,
  } = useGetDeviceKeyQuery(modal?.deviceId, { skip: modal?.name !== 'deviceKey' });

  const {
    data: refreshKeyData,
    isLoading: refreshKeyLoading,
    error: refreshKeyError,
  } = useRefreshDeviceKeyQuery(modal?.deviceId, { skip: modal?.name !== 'refreshKey' });

  const data = getKeyData || refreshKeyData;
  const isLoading = getKeyLoading || refreshKeyLoading;
  const error = getKeyError || refreshKeyError;

  const installScript = data?.data?.script;

  return (
    <div className="deviceKeyModal">
      <div className="modalHeader">
        <p>Device Key</p>
        <IconButton className="closeBttn" onClick={() => setModal(null)}>
          <IoClose />
        </IconButton>
      </div>
      <div className="modalBody">
        {isLoading ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> : <p className="blue">{data?.message}</p>}
        {isLoading ? (
          <Skeleton variant="rounded" width={'100%'} height={60} />
        ) : (
          <>
            <DeviceScript data={data} error={error} installScript={installScript} />
            {data && (
              <p className="infotxt">The install script is valid for 7 days. If expired, please renew the key.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DeviceKeyModal;
