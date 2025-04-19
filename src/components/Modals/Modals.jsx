import { Modal } from '@mui/material';
import DeleteRecordingModal from './DeleteRecordingPopup/DeleteRecordingModal';
import './Modals.scss';
import AddNewStoreModal from './AddNewStore/AddNewStore';
import AddNewDeviceModal from './AddNewDevice/AddNewDevice';
import DeviceKeyModal from './DeviceKeyModal/DeviceKeyModal';

const Modals = ({ modal, setModal }) => {
  const handleClose = () => {
    setModal(null);
  };

  const modalByName = () => {
    switch (modal?.name) {
      case 'deleteRecording':
        return <DeleteRecordingModal setModal={setModal} modal={modal} />;
      case 'addNewStore':
        return <AddNewStoreModal setModal={setModal} modal={modal} />;
      case 'addNewDevice':
        return <AddNewDeviceModal setModal={setModal} />;
      case 'deviceKey':
      case 'refreshKey':
        return <DeviceKeyModal setModal={setModal} modal={modal} />;
      default:
        return <></>;
    }
  };

  return (
    <Modal open={modal?.name ?? false} onClose={handleClose}>
      {modalByName()}
    </Modal>
  );
};

export default Modals;
