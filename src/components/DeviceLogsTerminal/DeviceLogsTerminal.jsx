import { useGetDeviceLogsQuery } from '@/lib/services/devicesApi';
import './DeviceLogsTerminal.scss';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const DeviceLogsTerminal = ({ skipApi, deviceId }) => {
  const { data, isLoading, error } = useGetDeviceLogsQuery(deviceId, { skip: skipApi });

  const deviceLogs = data?.data;

  useEffect(() => {
    if (error) {
      toast(error?.data?.message || 'Something went wrong!', { type: 'error' });
    }
  }, [error]);

  return (
    <div className="terminalContainer">
      <div className="logs">
        {isLoading ? (
          <p>Loading...</p>
        ) : deviceLogs ? (
          deviceLogs?.slice(0, 1000).map((log, index) => (
            <div className="logLine" key={index}>
              {log?.raw ? (
                <p>{log?.raw}</p>
              ) : (
                <>
                  <span className="timestamp">{log?.timestamp}</span>
                  <span className={`level ${log?.level}`}> [{log?.level}]</span>
                  <span className="message"> {log?.message}</span>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No Logs Found</p>
        )}
      </div>
    </div>
  );
};

export default DeviceLogsTerminal;
