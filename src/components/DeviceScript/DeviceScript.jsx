import { IconButton } from '@mui/material';
import { LuCopyCheck } from 'react-icons/lu';
import { MdContentCopy } from 'react-icons/md';
import './DeviceScript.scss';
import { useState } from 'react';

const DeviceScript = ({ data, error, installScript }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    const text = installScript ?? '';
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  return (
    <span className="scriptContainer">
      <p id="scriptHeading">Install Script:</p>
      <div className={`script ${error ? 'error' : ''}`}>
        <div className="innerScriptScroll">
          {error && <p className="errorTxt">{error?.data?.message || 'Error retrieving device install script'}</p>}
          {data && <p>{installScript}</p>}
        </div>
        {data && (
          <div className="copyScript">
            <IconButton onClick={copy} disabled={isCopied} className="iconBttn">
              {isCopied ? <LuCopyCheck /> : <MdContentCopy />}
            </IconButton>
          </div>
        )}
      </div>
    </span>
  );
};

export default DeviceScript;
