'use client';
import RecordingBox from '@/components/RecordingBox/RecordingBox';
import './Recordings.scss';
import { useGetAllRecordingsQuery } from '@/lib/services/recordingsApi';
import Modals from '@/components/Modals/Modals';
import { useEffect, useRef, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { FaAnglesDown } from 'react-icons/fa6';

const Recordings = () => {
  const [modal, setModal] = useState(null);
  const header = ['', 'Name', 'Duration', 'Date', 'Status', 'Actions'];
  const mainRecordingStatus = ['pending', 'processed'];

  //API state
  const observerRef = useRef();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useGetAllRecordingsQuery({ page });
  const recordings = data ? data?.data?.recordings : [];
  const hasMore = data?.data?.total > recordings?.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && !isLoading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [isFetching, hasMore]);

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
          {recordings
            ?.filter((r) => r.status === recordingStatus || (recordingStatus !== 'pending' && r.status !== 'pending'))
            .map((recording, i) => (
              <RecordingBox key={i} recording={recording} setModal={setModal} />
            ))}
        </div>
      ))}
      {recordings?.length && hasMore ? (
        <span className="observer" ref={observerRef}>
          {isFetching ? (
            <>
              <CircularProgress /> Loading more...
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
