import { CircularProgress } from '@mui/material';
import './Doughnut.scss';

const Doughnut = ({ value, txt, thickness = 2 }) => {
  return (
    <div className="DoughnutWrapper">
      <CircularProgress className="recordingProgress" variant="determinate" value={value} thickness={thickness} />
      <CircularProgress
        className="progressPlaceholder"
        variant="determinate"
        value={100}
        thickness={thickness}
        sx={{ color: 'gray' }}
      />
      <span className="infoBox" style={{ position: 'absolute' }}>
        <p className="bg">{value}%</p>
        {txt && <p className="smll">{txt}</p>}
      </span>
    </div>
  );
};

export default Doughnut;
