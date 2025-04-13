'use client';

import { formatTime } from '@/utils/helpers/time';
import './RecordingBox.scss';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { MdDelete, MdOutlinePlayCircleFilled, MdOutlinePlayCircle } from 'react-icons/md';
import dayjs from 'dayjs';
import RecordingDownloadButton from '../RecordingDownloadButton';

const RecordingBox = ({ recording, setModal }) => {
  const router = useRouter();

  const handleDelete = (e) => {
    e.stopPropagation();
    setModal({
      name: 'deleteRecording',
      _id: recording?._id,
    });
  };

  return (
    <div className="recordingBox" onClick={() => router.push(`recordings/${recording?._id}`)}>
      <span className="boxIcon">
        <MdOutlinePlayCircle className="icon" />
        <MdOutlinePlayCircleFilled className="icon filled" />
      </span>
      <p className="recordingName">{dayjs(recording?.date).format('MMMM D')} - In-store recording</p>
      <p>{formatTime(recording?.duration)}</p>
      <p>{recording?.date}</p>
      <span className={`status ${recording?.status}`}>{recording?.status}</span>
      <div className="actions">
        <RecordingDownloadButton
          props={{ className: 'iconBttn', disabled: recording?.status === 'pending' ? true : false }}
          recordingId={recording?._id}
        />
        <IconButton className="iconBttn delete" onClick={handleDelete}>
          <MdDelete className="icon" />
        </IconButton>
      </div>
    </div>
  );
};

export default RecordingBox;
