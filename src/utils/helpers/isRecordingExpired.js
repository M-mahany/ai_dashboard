import dayjs from 'dayjs';
import { recordingExpiresIn } from '../config/config';

export const isRecordingExpired = (recording) => {
  return recording ? dayjs().diff(dayjs(recording?.date), 'day') >= recordingExpiresIn : false;
};
