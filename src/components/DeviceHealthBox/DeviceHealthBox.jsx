import { Skeleton } from '@mui/material';
import './DeviceHealthBox.scss';

const DeviceHealthBox = ({ title, value, icon, isLoading }) => {
  return (
    <div className="DeviceHealthBox">
      <span style={{ flexGrow: 1 }}>
        {isLoading ? (
          <>
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} style={{ width: '100%' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} style={{ width: '100%' }} />
          </>
        ) : (
          <>
            <p className="innerTitle">{title}</p>
            <p className="info">{value}</p>
          </>
        )}
      </span>

      {icon}
    </div>
  );
};

export default DeviceHealthBox;
