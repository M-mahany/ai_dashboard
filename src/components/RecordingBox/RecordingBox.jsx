'use client';

import './RecordingBox.scss';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { MdDelete, MdDownload, MdOutlinePlayCircleFilled, MdOutlinePlayCircle } from 'react-icons/md';

const RecordingBox = () => {
  const router = useRouter();

  const handleClick = (e, eventType) => {
    e.stopPropagation();
  };

  return (
    <div className="recordingBox" onClick={() => router.push(`recordings/swdedeed`)}>
      <span className="boxIcon">
        <MdOutlinePlayCircle className="icon" />
        <MdOutlinePlayCircleFilled className="icon filled" />
      </span>
      <p className="recordingName">In-store recording of March 21</p>
      <p>23:45:00</p>
      <p>2024-03-21</p>
      <span className={`status analyzed`}>analyzed</span>
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
