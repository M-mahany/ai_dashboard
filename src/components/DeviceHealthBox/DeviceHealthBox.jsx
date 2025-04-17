import './DeviceHealthBox.scss';

const DeviceHealthBox = ({ title, value, icon }) => {
  return (
    <div className="DeviceHealthBox">
      <span>
        <p className="innerTitle">{title}</p>
        <p className="info">{value}</p>
      </span>
      {icon}
    </div>
  );
};

export default DeviceHealthBox;
