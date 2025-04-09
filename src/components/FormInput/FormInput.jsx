'use client';

import './FormInput.scss';
import { TextField } from '@mui/material';
import PasswordInput from '../PasswordInput';

const FormInput = ({ input, handleChange }) => {
  switch (input?.type) {
    case 'text':
      return (
        <div className={`formInput ${input?.size ?? ''}`}>
          <span className="label">{input?.label}</span>
          <TextField name={input.name} fullWidth onChange={handleChange} />
        </div>
      );
    case 'password':
      return (
        <div className={`formInput ${input?.size ?? ''}`}>
          <span className="label">{input?.label}</span>
          <PasswordInput input={input} handleChange={handleChange} />
        </div>
      );
    default:
      return <></>;
  }
};

export default FormInput;
