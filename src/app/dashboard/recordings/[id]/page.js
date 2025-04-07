'use client';

import { useState } from 'react';
import './SingleRecording.scss';
import { IoIosSearch } from 'react-icons/io';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import { FaCircle } from 'react-icons/fa';

const defaultStatus = ['pending', 'merged', 'transcriped', 'analyzed'];

const SingleRecording = () => {
  const [selectedTab, setSelectedTab] = useState('Transcript');
  const tabLabels = ['Transcript', 'Insights', 'Feedback'];

  const demoStatus = 'transcriped';

  const getStatusProgress = (status) => {
    return ((defaultStatus.indexOf(status) + 1) / defaultStatus.length) * 100;
  };

  const isStatusCompleted = (status) => {
    const RecoridngStatusIndex = defaultStatus.indexOf(demoStatus);
    return defaultStatus.indexOf(status) <= RecoridngStatusIndex ? true : false;
  };

  return (
    <div className="singleRecordingPage">
      <div className="left">
        <div className="top">
          <div className="box">
            <div className="DoughnutWrapper">
              <CircularProgress
                className="recordingProgress"
                variant="determinate"
                value={getStatusProgress(demoStatus)}
                thickness={2}
              />
              <CircularProgress
                className="progressPlaceholder"
                variant="determinate"
                value={100}
                thickness={2}
                sx={{ color: 'gray' }}
              />
              <span className="infoBox" style={{ position: 'absolute' }}>
                <p className="bg">{getStatusProgress(demoStatus)}%</p>
                <p className="smll">Completed</p>
              </span>
            </div>
            <div className="detailedStatus">
              {defaultStatus.slice(1, defaultStatus?.length).map((s) => (
                <span className={`statusBullet ${isStatusCompleted(s) ? 'complete' : ''}`}>
                  <FaCircle className="circle" />
                  <p>
                    {s} ({isStatusCompleted(s) ? 100 : 0}%)
                  </p>
                </span>
              ))}
            </div>
          </div>
          <div className="box">
            <div className="imgWrapper">
              <Image src="/assets/soundbites.png" alt="soundImg" layout="responsive" width={225} height={225} />
            </div>
            <span className="infoBox">
              <p className="bg">23:59</p>
              <p className="smll">Minutes processed</p>
            </span>
          </div>
        </div>
        <div className="bottom"></div>
      </div>
      <div className="right">
        <div className="searchInputBox">
          <IoIosSearch className="icon" />
          <input placeholder="Search Transcript" />
        </div>
        <div className="Tab">
          <div className="tabsWrapper">
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
          <div className={`tabContent ${selectedTab === 'Transcript' ? 'active' : ''}`}>
            <span className="duration">
              <p>Start Time: 12:43</p> <p>End Time: 12:57</p>
            </span>
            <p>
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the
            </p>

            <span className="duration">
              <p>Start Time: 12:43</p> <p>End Time: 12:57</p>
            </span>
            <p>
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the
            </p>
            <span className="duration">
              <p>Start Time: 12:43</p> <p>End Time: 12:57</p>
            </span>
            <p>
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the
            </p>
          </div>
          <div className={`tabContent ${selectedTab === 'Insights' ? 'active' : ''}`}>
            <span className="heading">
              <p>Summary</p>
            </span>
            <p>
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the
            </p>
          </div>
          <div className={`tabContent ${selectedTab === 'Feedback' ? 'active' : ''}`}>
            <span className="heading">
              <p>Client Issue with the behaviour of sales man</p>
            </span>
            <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecording;
