'use client';

import './FormInput.scss';
import { TextField } from '@mui/material';
import PasswordInput from '../PasswordInput';
import PasswordRules from '../PasswordRules/PasswordRules';
import { useState } from 'react';

const FormInput = ({ input, handleChange, formErrors, data }) => {
  const [isFocused, setIsFocused] = useState(false);

  switch (input?.type) {
    case 'text':
    case 'email':
      return (
        <div className={`formInput ${input?.size ?? ''}`}>
          <span className="label">{input?.label}</span>
          <TextField name={input.name} fullWidth onChange={handleChange} />
          {formErrors[input.name] && <span className="errortxt">{formErrors[input?.name]}</span>}
        </div>
      );
    case 'password':
      return (
        <>
          <div className={`formInput ${input?.size ?? ''}`}>
            <span className="label">{input?.label}</span>
            <PasswordInput input={input} handleChange={handleChange} setIsFocused={setIsFocused} />
            {formErrors[input.name] && <span className="errortxt">{formErrors[input?.name]}</span>}
          </div>
          {!input?.skipCheck && isFocused && <PasswordRules password={data[input?.name]} />}
        </>
      );
    default:
      return <></>;
  }
};

export default FormInput;
