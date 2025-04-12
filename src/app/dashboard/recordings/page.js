'use client';
import RecordingBox from '@/components/RecordingBox/RecordingBox';
import './Recordings.scss';
import { useGetAllRecordingsQuery } from '@/lib/services/recordingsApi';

const Recordings = () => {
  const header = ['', 'Name', 'Duration', 'Date', 'Status', 'Actions'];
  const mainRecordingStatus = ['pending', 'processed'];

  const { data, isLoading, error } = useGetAllRecordingsQuery();
  const recordings = data ? data?.data?.recordings : [];
  return (
    <div className="recordingPage">
      {mainRecordingStatus.map((recordingStatus, i) => (
        <div className="recordingGroup" key={i}>
          <p className="groupTitle">{recordingStatus}</p>
          <div className="header">
            {header.map((h, i) => (
              <p key={i}>{h}</p>
            ))}
          </div>
          {recordings
            ?.filter((r) => r.status === recordingStatus || (recordingStatus !== 'pending' && r.status !== 'pending'))
            .map((recording, i) => (
              <RecordingBox key={i} recording={recording} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default Recordings;
