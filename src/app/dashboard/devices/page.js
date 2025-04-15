'use client';
import { DataGrid } from '@mui/x-data-grid';
import './Devices.scss';
import { FaPlus } from 'react-icons/fa';
import { Button, IconButton } from '@mui/material';
import { useGetMyDevicesQuery } from '@/lib/services/devicesApi';
import dayjs from 'dayjs';
import { GoDotFill } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { HiOutlineServer } from 'react-icons/hi2';

const Devices = () => {
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
          return dayjs(row?.lastSeen).format('dddd, MMMM D, YYYY h:mm A');
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
      field: null,
      headerName: '',
      width: 140,
      renderCell: () => (
        <span>
          <IconButton>
            <BsThreeDots />
          </IconButton>
        </span>
      ),
    },
  ];

  const { data, isLoading, error } = useGetMyDevicesQuery();
  const devices = data?.data ?? [];
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

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

  return (
    <div className="devicePage">
      <span className="top">
        <span>
          <h1>Devices</h1>
          <p>Manage Devices connected to your network</p>
        </span>
        <Button>
          <FaPlus /> Add Device
        </Button>
      </span>

      <DataGrid
        getRowId={getRowId}
        rows={devices}
        columns={columns}
        sx={{ border: 0 }}
        loading={isLoading}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        rowCount={10}
        pageSizeOptions={[10]}
      />
    </div>
  );
};

export default Devices;
