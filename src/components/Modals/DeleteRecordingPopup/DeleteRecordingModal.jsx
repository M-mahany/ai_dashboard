import { Button, CircularProgress, IconButton } from '@mui/material';
import { IoClose, IoWarning } from 'react-icons/io5';
import './DeleteRecordingModal.scss';
import { useDeleteRecordingByIdMutation } from '@/lib/services/recordingsApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const DeleteRecordingModal = ({ setModal, modal }) => {
  const [deleteRecordingById, { data, isLoading, error }] = useDeleteRecordingByIdMutation();

  const handleDeleteRecording = () => {
    const recordingId = modal?._id;

    if (!recordingId) {
      return;
    }

    deleteRecordingById(recordingId);
  };

  useEffect(() => {
    let type = '';
    let message = '';
    if (data) {
      type = 'success';
      message = data?.data?.message || 'Recording deleted successfully!';
    }
    if (error) {
      type = 'error';
      message = error?.data?.message || 'Error deleting recording!';
    }
    if (error || data) {
      toast(message, { type });
      setTimeout(() => {
        setModal(null);
      }, 3000);
    }
  }, [error, data]);

  return (
    <div className="deleteRecordingModal">
      <div className="modalHeader">
        <p>Delete Recording</p>
        <IconButton className="closeBttn" onClick={() => setModal(null)}>
          <IoClose />
        </IconButton>
      </div>
      <div className="modalBody">
        <span className="badge">
          <IoWarning />
        </span>
        <p>
          This will delete recording permanently! including transcript, inisghts and media stored.
          <br /> <br />
          <span>Are you sure wants to continue?</span>
        </p>
      </div>
      <div className="modalFooter">
        <Button onClick={() => setModal(null)}>Cancel</Button>
        <Button onClick={handleDeleteRecording} disabled={isLoading}>
          {isLoading && (
            <CircularProgress
              style={{ color: 'var(--secondary)', width: '24px', height: '24px', marginRight: '12px' }}
            />
          )}
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  );
};

export default DeleteRecordingModal;
