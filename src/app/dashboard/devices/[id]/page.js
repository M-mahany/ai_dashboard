'use client';

import './SingleDevice.scss';
import { useEffect, useState } from 'react';
import { TiFlowParallel } from 'react-icons/ti';
import Doughnut from '@/components/Doughnut/Doughnut';
import DeviceHealthBox from '@/components/DeviceHealthBox/DeviceHealthBox';
import { useParams } from 'next/navigation';
import { useGetDeviceHealthQuery } from '@/lib/services/devicesApi';
import { BsCpu } from 'react-icons/bs';
import { CiTempHigh } from 'react-icons/ci';
import { BsDeviceSsd } from 'react-icons/bs';
import { PiMemory } from 'react-icons/pi';
import { LuTimer } from 'react-icons/lu';
import { toast } from 'react-toastify';
import DeviceLogsTerminal from '@/components/DeviceLogsTerminal/DeviceLogsTerminal';
import DeviceUpdateButton from '@/components/DeviceUpdateButton/DeviceUpdateButton';
import { FaMicrophoneLines, FaMicrophoneLinesSlash } from 'react-icons/fa6';
import { Skeleton } from '@mui/material';
import { getSocket } from '@/lib/socket';

const SingleDevice = () => {
  const [activeTab, setActiveTab] = useState('health');
  const tabs = ['health', 'logs'];
  const [liveMicActive, setLiveMicActive] = useState(false);

  // get recording id
  const params = useParams();
  const { id } = params;

  const { data, isLoading, error } = useGetDeviceHealthQuery(id);

  const systemHealth = data?.data;

  useEffect(() => {
    if (systemHealth) {
      setLiveMicActive(systemHealth?.isMicActive);
    }
  }, [systemHealth]);

  useEffect(() => {
    const socket = getSocket();

    socket.on('mic-status-updated', ({ deviceId, isMicActive }) => {
      if (id === deviceId) {
        setLiveMicActive(() => isMicActive);
      }
    });

    return () => {
      socket.off('mic-status-updated');
    };
  }, []);

  const sectionOne = [
    {
      headerName: 'Cpu Count',
      field: 'cpuCount',
      icon: <BsCpu className="icon" />,
    },
    {
      headerName: 'Cpu Temp',
      field: 'cpuTemp',
      icon: <CiTempHigh className="icon" />,
    },
    {
      headerName: 'GPU Temp',
      field: 'gpuTemp',
      icon: <CiTempHigh className="icon" />,
    },
    {
      headerName: 'Uptime',
      field: 'uptime',
      icon: <LuTimer className="icon" />,
    },
  ];

  const sectionTwo = (props) => {
    return [
      {
        headerName: 'Total Memory',
        field: 'totalMemory',
        icon: <PiMemory className="icon" />,
      },
      {
        headerName: 'Memory Used',
        field: 'usedMemory',
        icon: <PiMemory className="icon" />,
      },
      {
        headerName: 'Memory Free',
        field: null,
        customFiled: `${(parseFloat(props?.totalMemory) - parseFloat(props?.usedMemory)).toFixed(2)}GB`,
        icon: <PiMemory className="icon" />,
      },
    ];
  };

  const sectionThree = (props) => {
    return [
      {
        headerName: 'Disk Used',
        field: 'usedSpace',
        icon: <BsDeviceSsd className="icon" />,
      },
      {
        headerName: 'Disk Available',
        field: 'avaiableSpace',
        icon: <BsDeviceSsd className="icon" />,
      },
      {
        headerName: 'Reserved Space',
        field: null,
        customFiled: `${(
          parseFloat(props?.totalSpace) -
          parseFloat(props?.avaiableSpace) -
          parseFloat(props?.usedSpace)
        ).toFixed(2)} GB`,
        icon: <BsDeviceSsd className="icon" />,
      },
      {
        headerName: 'Total Disk Space',
        field: 'totalSpace',
        icon: <BsDeviceSsd className="icon" />,
      },
    ];
  };

  useEffect(() => {
    if (error) {
      toast(error?.data?.message || 'Something went wrong!', { type: 'error' });
    }
  }, [error]);

  return (
    <div className="singleDevicePage">
      <span className="top">
        <span>
          <h1>Device Stats</h1>
          <p>
            View real-time status, performance, and connectivity of all devices to ensure smooth and secure operation.
          </p>
        </span>
        <span className="rightDiv">
          <span className="bttnsWrapper">
            <DeviceUpdateButton type={'system'} deviceId={id} />
            <DeviceUpdateButton type={'app'} isLight deviceId={id} />
          </span>
          <span className="micStatus">
            {isLoading ? (
              <Skeleton variant="circular" width={35} height={35} />
            ) : (
              <span className="iconWrapper">
                {liveMicActive ? <FaMicrophoneLines className="icon" /> : <FaMicrophoneLinesSlash className="icon" />}
              </span>
            )}
            {isLoading ? (
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} style={{ width: '60px' }} />
            ) : (
              <p>{liveMicActive ? 'Active' : 'InActive'}</p>
            )}
          </span>
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
              <p className="title">CPU Stats</p>
              <div className="innerBoxes">
                <div className="DeviceHealthBox doughnut">
                  <Doughnut value={parseFloat(systemHealth?.cpuUsage ?? 0)} thickness={2.5} />
                  <p className="info smll">CPU Utilization</p>
                </div>
                {sectionOne?.map((sec, index) => (
                  <DeviceHealthBox
                    title={sec?.headerName}
                    value={systemHealth?.[sec?.field] ?? ''}
                    icon={sec?.icon || <TiFlowParallel className="icon" />}
                    key={index}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mainSection">
            <div className="healthBox">
              <p className="title">Memory Stats</p>
              <div className="innerBoxes">
                <div className="DeviceHealthBox doughnut">
                  <Doughnut value={parseFloat(systemHealth?.memoryUsage ?? 0)} thickness={2.5} />
                  <p className="info smll">Memory Usage</p>
                </div>
                {sectionTwo(systemHealth)?.map((sec, index) => (
                  <DeviceHealthBox
                    title={sec?.headerName}
                    value={sec?.field === null ? sec?.customFiled : systemHealth?.[sec?.field]}
                    icon={sec?.icon || <TiFlowParallel className="icon" />}
                    key={index}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mainSection smll">
            <div className="healthBox">
              <p className="title">Disk Stats</p>
              <div className="innerBoxes">
                <div className="DeviceHealthBox doughnut">
                  <Doughnut value={parseFloat(systemHealth?.diskUsage ?? 0)} thickness={2.5} />
                  <p className="info smll">Disk Utilization</p>
                </div>
                {sectionThree(systemHealth)?.map((sec, index) => (
                  <DeviceHealthBox
                    title={sec?.headerName}
                    value={sec?.field === null ? sec?.customFiled : systemHealth?.[sec?.field]}
                    icon={sec?.icon || <TiFlowParallel className="icon" />}
                    key={index}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`tabContent ${activeTab === 'logs' ? 'active' : ''}`}>
          <DeviceLogsTerminal skipApi={activeTab !== 'logs'} deviceId={id} />
        </div>
      </div>
    </div>
  );
};

export default SingleDevice;
