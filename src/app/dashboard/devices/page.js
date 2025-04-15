'use client';
import { DataGrid } from '@mui/x-data-grid';
import './Devices.scss';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@mui/material';

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
    },
    {
      field: null,
      headerName: 'ACTIONS',
      width: 140,
    },
  ];

  const rows = [];

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
        rows={rows}
        columns={columns}
        sx={{ border: 0 }}
        // slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      />
    </div>
  );
};

export default Devices;
