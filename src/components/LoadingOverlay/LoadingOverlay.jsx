import Image from 'next/image';
import './LoadingOverlay.scss';

const LoadingOverlay = () => {
  return (
    <div className="LoadingOverlay">
      <Image src={'/gifs/loading.gif'} width={300} height={160} alt="loading gif" unoptimized />
    </div>
  );
};

export default LoadingOverlay;
