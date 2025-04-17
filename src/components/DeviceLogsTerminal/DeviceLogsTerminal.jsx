import { useGetDeviceLogsQuery } from '@/lib/services/devicesApi';
import './DeviceLogsTerminal.scss';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const DeviceLogsTerminal = ({ skipApi, deviceId }) => {
  const observerRef = useRef();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useGetDeviceLogsQuery(
    { id: deviceId, query: { page, limit: 3000 } },
    { skip: skipApi }
  );

  const deviceLogs = data?.data?.logs;
  const hasNextPage = data?.data?.total > data?.data?.logs?.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && !isLoading && hasNextPage) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [isFetching, hasNextPage]);

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
          deviceLogs?.map((log, index) => (
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
        {deviceLogs?.length && hasNextPage ? (
          <span className="observer" ref={observerRef}>
            {isFetching ? (
              <>
                <CircularProgress style={{ width: '20px', height: '20px', color: 'white' }} /> Loading more...
              </>
            ) : (
              <></>
            )}
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DeviceLogsTerminal;
