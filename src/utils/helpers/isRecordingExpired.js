import dayjs from 'dayjs';

export const isRecordingExpired = (recording) => {
  return recording ? dayjs().diff(dayjs(recording?.createdAt), 'day') >= 90 : false;
};
