import { formatTime } from '@/utils/helpers/time';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const TranscriptSegment = ({
  segment,
  currentTime,
  currentSegment,
  query,
  handleSegementClick,
  activeSegmentIndex,
  index,
}) => {
  const matches = match(segment.text, query.join(' '), { insideWords: true });
  const parts = parse(segment.text, matches);

  return (
    <div
      ref={activeSegmentIndex === index ? currentSegment : null}
      className={`segmentWrapper ${segment.start <= currentTime && segment.end >= currentTime ? 'active' : ''}`}
      onClick={() => handleSegementClick(segment.start)}
    >
      <span className="duration">
        <p>Start Time: {formatTime(segment.start)}</p>
        <p>End Time: {formatTime(segment.end)}</p>
      </span>
      <p className="segmentTxt">
        {parts.map((part, i) => (
          <span key={i} className={part.highlight ? 'highlightedWord' : ''}>
            {part.text}
          </span>
        ))}
      </p>
    </div>
  );
};

export default TranscriptSegment;
