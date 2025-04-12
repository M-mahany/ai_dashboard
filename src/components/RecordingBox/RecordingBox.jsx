'use client';

import { formatTime } from '@/utils/helpers/time';
import './RecordingBox.scss';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { MdDelete, MdDownload, MdOutlinePlayCircleFilled, MdOutlinePlayCircle } from 'react-icons/md';
import dayjs from 'dayjs';

const RecordingBox = ({ recording }) => {
  const router = useRouter();

  const handleClick = (e, eventType) => {
    e.stopPropagation();
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
        <IconButton className="iconBttn" onClick={(e) => handleClick(e, 'download')}>
          <MdDownload className="icon" />
        </IconButton>
        <IconButton className="iconBttn delete" onClick={(e) => handleClick(e, 'delete')}>
          <MdDelete className="icon" />
        </IconButton>
      </div>
    </div>
  );
};

export default RecordingBox;
