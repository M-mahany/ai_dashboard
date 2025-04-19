'use client';
import { DataGrid } from '@mui/x-data-grid';
import './Devices.scss';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { GoDotFill } from 'react-icons/go';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { HiOutlineServer } from 'react-icons/hi2';
import DeviceActionButton from '@/components/DeviceActionButton/DeviceActionButton';
import { useGetMyDevicesQuery } from '@/lib/services/devicesApi';
import { useSelector } from 'react-redux';
import Modals from '@/components/Modals/Modals';

const Devices = () => {
  const [modal, setModal] = useState({});
  const store = useSelector((state) => state.store);
  const columns = [
    {
      field: 'name',
      headerName: 'DEVICE',
      flex: 1,
    },
    {
      field: 'ipAddress',
      headerName: 'ADDRESSES',
      flex: 1,
    },
    {
      field: 'timeZone',
      headerName: 'TIMEZONE',
      flex: 1,
    },
    {
      field: 'isOnline',
      headerName: 'LAST SEEN',
      flex: 1,
      valueGetter: (value, row) => {
        if (!value) {
          return row?.lastSeen ? dayjs(row?.lastSeen).format('dddd, MMMM D, YYYY h:mm A') : 'N/A';
        }
        return value;
      },
      renderCell: (params) =>
        params?.value === true ? (
          <span className="status">
            <GoDotFill style={{ color: '#28C76F' }} /> Online
          </span>
        ) : (
          <span className="status">{params.value}</span>
        ),
    },
    {
      field: 'isRegistered',
      headerName: 'REGISTERED',
      flex: 1,
    },
    {
      field: null,
      headerName: '',
      width: 75,
      renderCell: (params) => (
        <span className="actionCell">
          <DeviceActionButton device={params} />
        </span>
      ),
    },
  ];

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, error, isFetching } = useGetMyDevicesQuery(
    { page: paginationModel?.page + 1, storeId: store?._id },
    { skip: !store?._id }
  );
  const devices = data?.data?.devices ?? [];

  const hasNextPage = data?.data?.total > devices?.length;

  const paginationMetaRef = useRef({ hasNextPage: true });

  function getRowId(row) {
    return row._id;
  }

  const CustomNoRowsOverlay = () => {
    return (
      <span className="CustomNoRowsOverlay">
        <HiOutlineServer className="icon" />
        <p> No devices found!</p>
      </span>
    );
  };

  useEffect(() => {
    if (error) {
      toast(error?.data?.message || error || 'Error Fetching Devices', {
        type: 'error',
      });
    }
  }, [error]);

  const paginationMeta = useMemo(() => {
    if (hasNextPage !== undefined && paginationMetaRef.current?.hasNextPage !== hasNextPage) {
      paginationMetaRef.current = { hasNextPage };
    }
    return paginationMetaRef.current;
  }, [hasNextPage]);

  return (
    <div className="devicePage">
      <Modals modal={modal} setModal={setModal} />
      <span className="top">
        <span>
          <h1>Devices</h1>
          <p>Manage Devices connected to your network</p>
        </span>
        <Button
          onClick={() => setModal({ name: 'addNewDevice' })}
          disabled={(devices && devices?.length > 0) || isLoading}
        >
          <FaPlus /> Add Device
        </Button>
      </span>

      <DataGrid
        disableRowSelectionOnClick
        getRowId={getRowId}
        rows={devices}
        columns={columns}
        sx={{ border: 0 }}
        loading={isLoading || isFetching}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        paginationMode="server"
        rowCount={data?.data?.total ?? 0}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMeta={paginationMeta}
        pageSizeOptions={[10]}
      />
    </div>
  );
};

export default Devices;
