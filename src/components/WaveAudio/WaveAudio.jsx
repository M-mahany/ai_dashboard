'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import './WaveAudio.scss';
import { IconButton, Slider } from '@mui/material';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';
import { RiPlayLargeFill } from 'react-icons/ri';
import { HiPause } from 'react-icons/hi2';
import { CgSoftwareDownload } from 'react-icons/cg';
import { RiResetLeftFill } from 'react-icons/ri';

const peaks = [
  0, 0.0023595101665705442, 0.012107174843549728, 0.005919494666159153, -0.31324470043182373, 0.1511787623167038,
  0.2473851442337036, 0.11443428695201874, -0.036057762801647186, -0.0968964695930481, -0.03033737652003765,
  0.10682467371225357, 0.23974689841270447, 0.013210971839725971, -0.12377244979143143, 0.046145666390657425,
  -0.015757400542497635, 0.10884027928113937, 0.06681904196739197, 0.09432944655418396, -0.17105795443058014,
  -0.023439358919858932, -0.10380347073078156, 0.0034454423002898693, 0.08061369508504868, 0.026129156351089478,
  0.18730352818965912, 0.020447958260774612, -0.15030759572982788, 0.05689578503370285, -0.0009095853311009705,
  0.2749626338481903, 0.2565386891365051, 0.07571295648813248, 0.10791446268558502, -0.06575305759906769,
  0.15336275100708008, 0.07056761533021927, 0.03287476301193237, -0.09044631570577621, 0.01777501218020916,
  -0.04906218498945236, -0.04756792634725571, -0.006875281687825918, 0.04520256072282791, -0.02362387254834175,
  -0.0668797641992569, 0.12266506254673004, -0.10895221680402756, 0.03791835159063339, -0.0195105392485857,
  -0.031097881495952606, 0.04252675920724869, -0.09187793731689453, 0.0829525887966156, -0.003812957089394331,
  0.0431736595928669, 0.07634212076663971, -0.05335947126150131, 0.0345163568854332, -0.049201950430870056,
  0.02300390601158142, 0.007677287794649601, 0.015354577451944351, 0.007677287794649601, 0.007677288725972176,
];

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const remainingSecondsAfterHours = seconds % 3600;
  const minutes = Math.floor(remainingSecondsAfterHours / 60);
  const remainingSeconds = remainingSecondsAfterHours % 60;

  // Format the time as HH:MM:SS
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${Math.floor(remainingSeconds)
    .toString()
    .padStart(2, '0')}`;
}

const WaveAudio = ({ recording, children }) => {
  const url = recording?.url;
  const duration = recording?.duration;

  const containerRef = useRef(null);
  const waveHoverRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const memoizedUrl = useMemo(() => url, [url]);
  const memoizedPeaks = useMemo(() => peaks, [peaks]);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 130,
    waveColor: '#b0b0b0',
    progressColor: '#ffca8c',
    barWidth: 3,
    url: memoizedUrl,
    peaks: memoizedPeaks,
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
  });

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
    <div className="audioWithTranscript">
      <div className="waveAudioWrapper">
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
          <IconButton className="iconBttn">
            <CgSoftwareDownload />
          </IconButton>
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
