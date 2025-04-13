import { Box, Modal } from '@mui/material';
import DeleteRecordingModal from './DeleteRecordingPopup/DeleteRecordingModal';

const Modals = ({ modal, setModal }) => {
  const handleClose = () => {
    setModal(null);
  };

  const modalByName = () => {
    switch (modal?.name) {
      case 'deleteRecording':
        return <DeleteRecordingModal setModal={setModal} modal={modal} />;
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
