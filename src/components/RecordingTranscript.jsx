import { MdSearchOff } from 'react-icons/md';
import TranscriptSegment from './TranscriptSegment';

const RecordingTranscript = ({ recording, currentTime, query, applyFilter = false, currentSegment, wavesurfer }) => {
  const transcriptSegments = applyFilter
    ? recording.transcript.segments.filter((s) => {
        const textWords = s.text.trim().toLowerCase().split(' ');
        return query.some((q) => textWords.some((word) => word.includes(q.toLowerCase())));
      })
    : recording.transcript.segments;

  const handleSegementClick = (startTime) => {
    if (wavesurfer) {
      wavesurfer.seekTo(startTime / recording?.duration);
    }
  };

  if (transcriptSegments.length === 0) {
    return (
      <span className="emptyContent">
        <MdSearchOff className="icon" />
        <p> No matching transcript found.</p>
      </span>
    );
  }

  return transcriptSegments.map((seg, index) => (
    <TranscriptSegment
      segment={seg}
      key={index}
      currentTime={currentTime}
      currentSegment={currentSegment}
      query={query}
      handleSegementClick={handleSegementClick}
    />
  ));
};

export default RecordingTranscript;
