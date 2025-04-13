import { useLazyGetRecordingDownloadableUrlQuery } from '@/lib/services/recordingsApi';
import { CircularProgress, IconButton } from '@mui/material';
import { CgSoftwareDownload } from 'react-icons/cg';
import { skipToken } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';

const RecordingDownloadButton = ({ props, recordingId }) => {
  const [getRecordingDownloadUrl, { isLoading }] = useLazyGetRecordingDownloadableUrlQuery(skipToken);

  const handleDownload = async (e) => {
    e.stopPropagation();
    try {
      const res = await getRecordingDownloadUrl(recordingId).unwrap();
      window.open(res.data?.downloadUrl, '_blank');
    } catch (err) {
      toast(err?.data?.message || 'Error Downloading file', {
        type: 'error',
      });
    }
  };

  return (
    <IconButton {...props} onClick={handleDownload} disabled={isLoading} {...props}>
      {isLoading ? (
        <CircularProgress style={{ color: 'var(--secondary)', width: '24px', height: '24px' }} />
      ) : (
        <CgSoftwareDownload />
      )}
    </IconButton>
  );
};

export default RecordingDownloadButton;
