'use client';
import { DataGrid } from '@mui/x-data-grid';
import './Devices.scss';
import { width } from '@mui/system';

const Devices = () => {
  const columns = [
    {
      field: 'name',
      headerName: 'Device',
      flex: 1,
    },
    {
      field: 'ipAddress',
      headerName: 'Addresses',
      flex: 1,
    },
    {
      field: 'timeZone',
      headerName: 'Time Zone',
      flex: 1,
    },
    {
      field: 'isOnline',
      headerName: 'Last Seen',
      flex: 1,
    },
  ];

  const rows = [];

  return (
    <div className="devicePage">
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
