'use client';
import RecordingBox from '@/components/RecordingBox/RecordingBox';
import './Recordings.scss';
import { useGetAllRecordingsQuery } from '@/lib/services/recordingsApi';
import Modals from '@/components/Modals/Modals';
import { useEffect, useRef, useState } from 'react';
import { CircularProgress, Skeleton } from '@mui/material';
import { FaAnglesDown } from 'react-icons/fa6';
import { CiNoWaitingSign } from 'react-icons/ci';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Recordings = () => {
  const [modal, setModal] = useState(null);
  const header = ['', 'Name', 'Duration', 'Date', 'Status', 'Actions'];
  const mainRecordingStatus = ['pending', 'processed'];
  const store = useSelector((state) => state.store);
  //API state
  const observerRef = useRef();
  const [query, setQuery] = useState({ page: 1, storeId: store?._id });

  useEffect(() => {
    if (store) {
      setQuery({ page: 1, storeId: store?._id });
    }
  }, [store]);

  const { data, isLoading, isFetching, error } = useGetAllRecordingsQuery(query, { skip: !query?.storeId });
  const recordings = data ? data?.data?.recordings : [];
  const hasMore = data?.data?.total > recordings?.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && !isLoading && hasMore) {
          setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [isFetching, hasMore]);

  useEffect(() => {
    if (error) {
      toast(error?.data?.message || error || 'Error Fetching Recordings', {
        type: 'error',
      });
    }
  }, [error]);
  return (
    <div className="recordingPage">
      <Modals modal={modal} setModal={setModal} />
      {mainRecordingStatus.map((recordingStatus, i) => (
        <div className="recordingGroup" key={i}>
          <p className="groupTitle">{recordingStatus}</p>
          <div className="header">
            {header.map((h, i) => (
              <p key={i}>{h}</p>
            ))}
          </div>
          {isLoading
            ? Array.from({ length: 2 }).map((_, i) => (
                <Skeleton variant="rounded" width={'100%'} height={74} key={i} style={{ marginBottom: '14px' }} />
              ))
            : (() => {
                const filteredRecordings = recordings?.filter(
                  (r) => r.status === recordingStatus || (recordingStatus !== 'pending' && r.status !== 'pending')
                );

                return filteredRecordings?.length ? (
                  filteredRecordings.map((recording, i) => (
                    <RecordingBox key={i} recording={recording} setModal={setModal} />
                  ))
                ) : (
                  <span className="emptyGroup">
                    <CiNoWaitingSign className="icon" />
                    No {recordingStatus} recordings
                  </span>
                );
              })()}
        </div>
      ))}
      {recordings?.length && hasMore ? (
        <span className="observer" ref={observerRef}>
          {isFetching ? (
            <>
              <CircularProgress style={{ width: '20px', height: '20px', color: 'var(--secondary)' }} /> Loading more...
            </>
          ) : (
            <>
              <FaAnglesDown />
              Scroll to load more
            </>
          )}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Recordings;
