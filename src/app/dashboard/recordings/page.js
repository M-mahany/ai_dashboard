import RecordingBox from '@/components/RecordingBox/RecordingBox';
import './Recordings.scss';

const Recordings = () => {
  const header = ['', 'Name', 'Duration', 'Date', 'Status', 'Actions'];

  return (
    <div className="recordingPage">
      {Array.from({ length: 4 }).map((_, i) => (
        <div className="recordingGroup" key={i}>
          <p className="groupTitle">Processed</p>
          <div className="header">
            {header.map((h, i) => (
              <p key={i}>{h}</p>
            ))}
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <RecordingBox key={i} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Recordings;
