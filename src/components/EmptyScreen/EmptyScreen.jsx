import { MdConstruction } from 'react-icons/md';
import './EmptyScreen.scss';

const EmptyScreen = ({ message }) => {
  return (
    <div className="emptyScreen">
      <MdConstruction className="icon" />
      <p>{message}</p>
    </div>
  );
};

export default EmptyScreen;
