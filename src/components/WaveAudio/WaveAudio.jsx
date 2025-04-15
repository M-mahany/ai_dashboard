'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import './WaveAudio.scss';
import { IconButton, Slider } from '@mui/material';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';
import { RiPlayLargeFill } from 'react-icons/ri';
import { HiPause } from 'react-icons/hi2';
import { RiResetLeftFill } from 'react-icons/ri';
import { formatTime } from '@/utils/helpers/time';
import { MdOutlinePendingActions } from 'react-icons/md';
import RecordingDownloadButton from '../RecordingDownloadButton';

const WaveAudio = ({ recording, children, setCurrentTime, setRefrence, refrence }) => {
  const streamUrl = recording?.streamUrl;
  const duration = recording?.duration ?? 0;
  const hasPeaks = !!recording?.peaks?.length;

  const containerRef = useRef(null);
  const waveHoverRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const memoizedUrl = useMemo(() => streamUrl, [streamUrl]);
  const memoizedPeaks = useMemo(() => recording?.peaks, [recording?.peaks]);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 130,
    waveColor: '#b0b0b0',
    progressColor: '#ffca8c',
    barWidth: 3,
    url: memoizedUrl,
    peaks: memoizedPeaks,
    duration,
    dragToSeek: true,
  });

  useEffect(() => {
    if (!wavesurfer) return;

    const onInteraction = (time) => {
      wavesurfer.play();
      setProgress((time / duration) * 100);
    };

    const onTimeUpdate = (time) => {
      setCurrentTime(time);
      setProgress((time / duration) * 100);
    };

    wavesurfer.on('interaction', onInteraction);
    wavesurfer.on('timeupdate', onTimeUpdate);

    return () => {
      wavesurfer.un('interaction', onInteraction);
      wavesurfer.un('timeupdate', onTimeUpdate);
    };
  }, [wavesurfer, duration, setCurrentTime]);

  useEffect(() => {
    if (!refrence && wavesurfer) {
      setRefrence(wavesurfer);
    }
  }, [wavesurfer]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !waveHoverRef.current) return;

    const handlePointerMove = (e) => {
      waveHoverRef.current.style.width = `${e.offsetX}px`;
    };

    container.addEventListener('pointermove', handlePointerMove);
    return () => container.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const resetAudio = () => {
    wavesurfer?.setTime(0);
    setProgress(0);
  };

  const handleSeek = (e) => {
    const value = e.target.value;
    const seekTime = (value / 100) * duration;
    wavesurfer?.seekTo(seekTime / duration);
    setProgress(value);
  };

  const onPlayPause = useCallback(() => {
    wavesurfer?.playPause();
  }, [wavesurfer]);

  const skipTime = (amount) => () => wavesurfer?.skip(amount);

  if (recording?.status === 'pending') {
    return (
      <span className="pendingRecording">
        <MdOutlinePendingActions className="icon" />
        <p>Recording still pending!</p>
      </span>
    );
  }

  return (
    <div className={`audioWithTranscript ${!streamUrl ? 'disabled' : ''}`}>
      <div className={`waveAudioWrapper ${!hasPeaks ? 'disabled' : ''}`}>
        {!hasPeaks && <span className="noPeaksTxt">Audio peaks not available</span>}
        <div ref={containerRef} id="waveAudio">
          <span id="waveDuration">{formatTime(duration)}</span>
          <span id="waveTime">{formatTime(currentTime)}</span>
          <span id="waveHover" ref={waveHoverRef}></span>
        </div>
      </div>

      {children}

      <div className="mediaControl">
        <div className="medialBox">
          <IconButton className="iconBttn" onClick={resetAudio}>
            <RiResetLeftFill />
          </IconButton>
          <IconButton className="iconBttn" onClick={skipTime(-10)}>
            <RxDoubleArrowLeft />
          </IconButton>
          <IconButton className="iconBttn" onClick={onPlayPause}>
            {isPlaying ? <HiPause style={{ color: '#d32f2f' }} /> : <RiPlayLargeFill />}
          </IconButton>
          <IconButton className="iconBttn" onClick={skipTime(10)}>
            <RxDoubleArrowRight />
          </IconButton>
          <RecordingDownloadButton props={{ className: 'iconBttn' }} recordingId={recording?._id} />
        </div>

        <div className="medialBox">
          <span className="timestamp">{formatTime(currentTime)}</span>
          <Slider
            defaultValue={0}
            min={0}
            max={100}
            value={progress}
            onChange={handleSeek}
            className="customAudioProgress"
          />
          <span className="timestamp">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default WaveAudio;
