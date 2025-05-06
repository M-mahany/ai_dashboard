'use client';

import React, { useEffect, useState } from 'react';
import './SingleRecording.scss';
import { IoIosSearch } from 'react-icons/io';
import Image from 'next/image';
import { IconButton, Skeleton, Tooltip } from '@mui/material';
import { FaCircle } from 'react-icons/fa';
import WaveAudio from '@/components/WaveAudio/WaveAudio';
import { useGetRecordingByIdQuery } from '@/lib/services/recordingsApi';
import { useParams } from 'next/navigation';
import { formatTime } from '@/utils/helpers/time';
import { MdHourglassEmpty } from 'react-icons/md';
import { toast } from 'react-toastify';
import RecordingTranscript from '@/components/RecordingTranscript';
import Doughnut from '@/components/Doughnut/Doughnut';
import { MdDownloading } from 'react-icons/md';
import { exportToTxt } from '@/utils/helpers/exportToText';
import RecordingInsights from '@/components/RecordingInsights';
import { PiClockCountdownFill } from 'react-icons/pi';
import { isRecordingExpired } from '@/utils/helpers/isRecordingExpired';

const defaultStatus = ['pending', 'merged', 'transcriped', 'analyzed'];
const tabLabels = ['Transcript', 'Insights', 'Feedback'];

const SingleRecording = () => {
  const [selectedTab, setSelectedTab] = useState('Transcript');
  const [currentTime, setCurrentTime] = useState(0);
  const [wavesurfer, setWavesurfer] = useState(null);

  // search query state
  const [transcriptQuery, setTranscriptQuery] = useState(['']);
  // get recording id
  const params = useParams();
  const { id } = params;

  const { data, isLoading, error } = useGetRecordingByIdQuery(id);

  const recording = data?.data;
  const hasTranscript = recording && recording?.transcript && recording?.transcript?.segments?.length;
  const hasInsight = recording && recording?.insight;

  const isExpired = isRecordingExpired(recording);

  const getStatusProgress = (status) => {
    return ((defaultStatus.indexOf(status) + 1) / defaultStatus.length) * 100;
  };

  const isStatusCompleted = (status) => {
    const RecoridngStatusIndex = defaultStatus.indexOf(recording?.status);
    return defaultStatus.indexOf(status) <= RecoridngStatusIndex ? true : false;
  };

  // handles search query change for transcript
  const handleSearchChange = (e) => {
    const { value } = e.target;
    if (selectedTab !== 'Transcript') {
      setSelectedTab('Transcript');
    }
    setTranscriptQuery(value.trim().split(' '));
  };

  const handleTranscriptExport = () => {
    const recordingTxtTranscript = recording.transcript?.segments
      .map((seg) => `Start:${formatTime(seg?.start)}  End:${formatTime(seg?.end)}\n${seg?.text}`)
      .join('\n \n');
    exportToTxt(`${recording?._id}_transcript.txt`, recordingTxtTranscript);
  };

  useEffect(() => {
    if (error) {
      toast(error?.data?.message || 'Something went wrong!', { type: 'error' });
    }
  }, [error]);

  return (
    <div className="singleRecordingPage">
      <div className="left">
        <div className="top">
          <div className="box">
            {isLoading ? (
              <Skeleton variant="circular" width={130} height={130} />
            ) : (
              <Doughnut value={getStatusProgress(recording?.status)} txt={'Complete'} />
            )}
            <div className="detailedStatus">
              {defaultStatus.slice(1, defaultStatus?.length).map((s, i) =>
                isLoading ? (
                  <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80px' }} key={i} />
                ) : (
                  <span className={`statusBullet ${isStatusCompleted(s) ? 'complete' : ''}`} key={i}>
                    <FaCircle className="circle" />
                    <p>
                      {s} ({isStatusCompleted(s) ? 100 : 0}%)
                    </p>
                  </span>
                )
              )}
            </div>
          </div>
          <div className="box">
            <div className="imgWrapper">
              <Image src="/assets/soundbites.png" alt="soundImg" layout="responsive" width={225} height={225} />
            </div>
            <span className="infoBox">
              {isLoading ? (
                <>
                  <Skeleton variant="text" sx={{ fontSize: '2rem', width: '120px' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80px' }} />
                </>
              ) : (
                <>
                  <p className="bg">{formatTime(recording?.duration ?? 0)}</p>
                  <p className="smll">Minutes {recording?.status}</p>
                </>
              )}
            </span>
          </div>
        </div>
        <div className="bottom">
          {isLoading ? (
            <div className="audioWithTranscript">
              <Skeleton variant="rounded" width={'100%'} height={125} />
              <div className="tabContent active">
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
              </div>

              <Skeleton variant="rounded" width={'100%'} height={60} />
            </div>
          ) : (
            recording && (
              <WaveAudio
                recording={recording}
                setCurrentTime={setCurrentTime}
                setRefrence={setWavesurfer}
                refrence={wavesurfer}
              >
                <div className="tabContent active">
                  {recording?.transcript?.segments
                    ?.filter((s) => s.start <= currentTime && s.end >= currentTime)
                    .map((seg, index) => (
                      <React.Fragment key={index}>
                        <span className="duration">
                          <p>Start Time: {formatTime(seg.start)}</p> <p>End Time: {formatTime(seg.end)}</p>
                        </span>
                        <p>{seg.text}</p>
                      </React.Fragment>
                    ))}
                </div>
              </WaveAudio>
            )
          )}
        </div>
      </div>
      <div className="right">
        <div className="top">
          <div className={`searchInputBox ${!hasTranscript || isLoading ? 'disabled' : ''}`}>
            <IoIosSearch className="icon" />
            <input placeholder="Search Transcript" onChange={handleSearchChange} />
          </div>
          <Tooltip title="Export Transcript">
            <IconButton className="exportTranscriptBttn" onClick={handleTranscriptExport}>
              <MdDownloading className="icon" />
            </IconButton>
          </Tooltip>
        </div>

        <div className="Tab">
          <div className={`tabsWrapper ${isLoading ? 'disabled' : ''}`}>
            <div className="tabsLabels">
              {tabLabels.map((label, i) => (
                <span className="tabLabel" key={i} onClick={() => setSelectedTab(label)}>
                  {label}
                </span>
              ))}
            </div>
            <span
              className="tabSelected"
              style={{
                width: `calc(${100 / tabLabels?.length}% - 12px)`,
                transform: `translateX(${tabLabels.indexOf(selectedTab) * 100}%)`,
              }}
            >
              {selectedTab}
            </span>
          </div>
          {/* Tab Content */}
          {isLoading ? (
            <span>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} key={i} />
              ))}
            </span>
          ) : (
            <>
              <div className={`tabContent ${selectedTab === 'Transcript' ? 'active' : ''}`}>
                {hasTranscript && !isExpired ? (
                  <RecordingTranscript
                    recording={recording}
                    query={transcriptQuery}
                    applyFilter={true}
                    currentTime={currentTime}
                    wavesurfer={wavesurfer}
                    selectedTab={selectedTab}
                  />
                ) : (
                  <span className="emptyContent">
                    {isExpired ? (
                      <span className="expireTranscript">
                        <span>
                          <PiClockCountdownFill style={{ marginRight: '4px' }} />
                          <span>
                            Expired Recording <br />
                          </span>
                        </span>
                        <p>This content has passed the 90-day expiration period</p>
                      </span>
                    ) : (
                      <>
                        <MdHourglassEmpty className="icon" />
                        <p>Transcript still pending</p>
                      </>
                    )}
                  </span>
                )}
              </div>
              <div className={`tabContent ${selectedTab === 'Insights' ? 'active' : ''}`}>
                {hasInsight ? (
                  <RecordingInsights recording={recording} />
                ) : (
                  <span className="emptyContent">
                    <MdHourglassEmpty className="icon" />
                    <p>Insights still pending</p>
                  </span>
                )}
              </div>
              <div className={`tabContent ${selectedTab === 'Feedback' ? 'active' : ''}`}>
                {hasInsight ? (
                  <RecordingInsights recording={recording} type="feedback" />
                ) : (
                  <span className="emptyContent">
                    <MdHourglassEmpty className="icon" />
                    <p>Insights still pending</p>
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleRecording;
