import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { recordingExpiresIn } from '../config/config';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const remainingSecondsAfterHours = seconds % 3600;
  const minutes = Math.floor(remainingSecondsAfterHours / 60);
  const remainingSeconds = remainingSecondsAfterHours % 60;

  // Format the time as HH:MM:SS
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${Math.floor(remainingSeconds)
    .toString()
    .padStart(2, '0')}`;
}

export const getTimeAgo = (dateString) => {
  const now = dayjs();
  const past = dayjs(dateString).add(recordingExpiresIn, 'day');
  const diffDays = now.diff(past, 'day');

  if (diffDays < 7) {
    return diffDays > 0 ? `${diffDays} day${diffDays !== 1 ? 's' : ''} ago` : 'Today';
  } else if (diffDays < 365) {
    const diffWeeks = now.diff(past, 'week');
    return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
  } else {
    const diffYears = now.diff(past, 'year');
    return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
  }
};
