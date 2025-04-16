'use client';
import { Button } from '@mui/material';
import './SingleDevice.scss';
import { useState } from 'react';
import { TiFlowParallel } from 'react-icons/ti';
import Doughnut from '@/components/Doughnut/Doughnut';

const SingleDevice = () => {
  const tabs = ['health', 'logs'];

  const [activeTab, setActiveTab] = useState('health');

  return (
    <div className="singleDevicePage">
      <span className="top">
        <span>
          <h1>Device Stats</h1>
          <p>
            View real-time status, performance, and connectivity of all devices to ensure smooth and secure operation.
          </p>
        </span>
        <span className="bttnsWrapper">
          <Button>Update System</Button>
          <Button>Update app</Button>
        </span>
      </span>
      <div className="tabsContainer">
        <div className="tabHeader">
          {tabs.map((tab, i) => (
            <div className={`tabBttn ${tab === activeTab ? 'active' : ''}`} onClick={() => setActiveTab(tab)} key={i}>
              {tab}
            </div>
          ))}
        </div>
        <div className={`tabContent ${activeTab === 'health' ? 'active' : ''}`}>
          <div className="mainSection">
            <div className="healthBox">
              <p className="title">CPU stats</p>
              <div className="innerBoxes">
                <div className="innerBox doughnut">
                  <Doughnut value={50} thickness={2.5} />
                  <p className="info smll">CPU Utilization</p>
                </div>
                <div className="innerBox">
                  <span>
                    <p className="innerTitle">Cpu Frequency</p>
                    <p className="info">4</p>
                  </span>
                  <TiFlowParallel className="icon" />
                </div>
                <div className="innerBox">
                  <span>
                    <p className="innerTitle">Cpu Count</p>
                    <p className="info">4</p>
                  </span>
                  <TiFlowParallel className="icon" />
                </div>
                <div className="innerBox">
                  <span>
                    <p className="innerTitle">Cpu Temprature</p>
                    <p className="info">53.6 °C</p>
                  </span>
                  <TiFlowParallel className="icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="mainSection">
            <div className="healthBox">
              <p className="title">Memory stats</p>
              <div className="innerBoxes">
                <div className="innerBox doughnut">
                  <Doughnut value={50} thickness={2.5} />
                  <p className="info smll">CPU Utilization</p>
                </div>
                <div className="innerBox">
                  <span>
                    <p className="innerTitle">Cpu Frequency</p>
                    <p className="info">4</p>
                  </span>
                  <TiFlowParallel className="icon" />
                </div>
                <div className="innerBox">
                  <span>
                    <p className="innerTitle">Cpu Count</p>
                    <p className="info">4</p>
                  </span>
                  <TiFlowParallel className="icon" />
                </div>
                <div className="innerBox">
                  <span>
                    <p className="innerTitle">Cpu Temprature</p>
                    <p className="info">53.6 °C</p>
                  </span>
                  <TiFlowParallel className="icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="mainSection smll">
            <div className="healthBox">
              <p className="title">Disk stats</p>
              <div className="innerBoxes">
                <div className="innerBox doughnut">
                  <Doughnut value={50} thickness={2.5} />
                  <p className="info smll">CPU Utilization</p>
                </div>
                <div className="innerBox">
                  <span>
                    <p className="innerTitle">Cpu Frequency</p>
                    <p className="info">4</p>
                  </span>
                  <TiFlowParallel className="icon" />
                </div>
                <div className="innerBox">
                  <span>
                    <p className="innerTitle">Cpu Count</p>
                    <p className="info">4</p>
                  </span>
                  <TiFlowParallel className="icon" />
                </div>
                <div className="innerBox">
                  <span>
                    <p className="innerTitle">Cpu Temprature</p>
                    <p className="info">53.6 °C</p>
                  </span>
                  <TiFlowParallel className="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDevice;
