import { MdSearchOff } from 'react-icons/md';
import TranscriptSegment from './TranscriptSegment';
import { useEffect, useRef, useState } from 'react';

const RecordingTranscript = ({ recording, currentTime, query, applyFilter = false, wavesurfer, selectedTab }) => {
  // handles segments scroll
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const currentSegment = useRef(null);

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

  useEffect(() => {
    const index = recording?.transcript?.segments.findIndex(
      (seg) => seg.start <= currentTime && seg.end >= currentTime
    );
    if (index !== activeSegmentIndex) {
      setActiveSegmentIndex(index);
    }
  }, [currentTime]);

  // handles auto scroll to the current transcript segment
  useEffect(() => {
    if (currentSegment && currentSegment?.current) {
      currentSegment.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [activeSegmentIndex, selectedTab]);

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
      index={index}
      currentTime={currentTime}
      currentSegment={currentSegment}
      query={query}
      handleSegementClick={handleSegementClick}
      activeSegmentIndex={activeSegmentIndex}
    />
  ));
};

export default RecordingTranscript;
