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
  const duration = recording?.duration;

  if (recording?.status === 'pending') {
    return (
      <span className="pendingRecording">
        <MdOutlinePendingActions className="icon" />
        <p>Recording still pending!</p>
      </span>
    );
  }

  const containerRef = useRef(null);
  const waveHoverRef = useRef(null);

  const [progress, setProgress] = useState(0);

  const memoizedUrl = useMemo(() => streamUrl, [streamUrl]);
  const memorizedPeaks = useMemo(() => recording?.peaks, [recording?.peaks]);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 130,
    waveColor: '#b0b0b0',
    progressColor: '#ffca8c',
    barWidth: 3,
    url: memoizedUrl,
    peaks: memorizedPeaks,
    duration: duration,
    dragToSeek: true,
  });

  wavesurfer?.on('interaction', (time) => {
    wavesurfer?.play();
    setProgress((time / duration) * 100);
  });

  wavesurfer?.on('timeupdate', (time) => {
    if (time >= duration) {
      wavesurfer.setTime(0);
      setProgress(0);
    }
    setCurrentTime(time);
  });

  useEffect(() => {
    !refrence && wavesurfer && setRefrence(wavesurfer);
  }, [wavesurfer]);

  const resetAudio = () => {
    wavesurfer?.setTime(0);
    setProgress(0);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    wavesurfer.seekTo(seekTime / duration); // Seek to the corresponding position
    setProgress(e.target.value); // Update the progress state
  };

  useEffect(() => {
    if (!containerRef.current || !waveHoverRef.current) return;

    const handlePointerMove = (e) => {
      waveHoverRef.current.style.width = `${e.offsetX}px`;
    };

    containerRef.current.addEventListener('pointermove', handlePointerMove);

    return () => {
      containerRef.current?.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const forwardClick = () => {
    wavesurfer.skip(10);
  };

  const backClick = () => {
    wavesurfer.skip(-10);
  };

  return (
    <div className={`audioWithTranscript ${!streamUrl || streamUrl === '' ? 'disabled' : ''}`}>
      <div className={`waveAudioWrapper ${!recording?.peaks || !recording?.peaks?.length ? 'disabled' : ''}`}>
        <span className="noPeaksTxt">Audio peaks not avaiable</span>
        <div ref={containerRef} id="waveAudio">
          <span id="waveDuration">{formatTime(duration)}</span>
          <span id="waveTime">{formatTime(currentTime)}</span>
          <span id="waveHover" ref={waveHoverRef}></span>
        </div>
      </div>
      {/* Transcript */}
      {children}
      <div className="mediaControl">
        <div className="medialBox">
          <IconButton className="iconBttn" onClick={resetAudio}>
            <RiResetLeftFill />
          </IconButton>
          <IconButton className="iconBttn" onClick={backClick}>
            <RxDoubleArrowLeft />
          </IconButton>
          <IconButton className="iconBttn" onClick={onPlayPause}>
            {isPlaying ? <HiPause style={{ color: '#d32f2f' }} /> : <RiPlayLargeFill />}
          </IconButton>
          <IconButton className="iconBttn" onClick={forwardClick}>
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
