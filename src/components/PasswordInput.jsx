'use client';

import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { LuEye, LuEyeClosed } from 'react-icons/lu';

const PasswordInput = ({ input, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowHidePassword = ({ data }) => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      name={input.name}
      fullWidth
      type={showPassword ? 'text' : 'password'}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton edge="end" onClick={handleShowHidePassword}>
              {showPassword ? <LuEye /> : <LuEyeClosed />}
            </IconButton>
          ),
        },
      }}
      onChange={handleChange}
    />
  );
};

export default PasswordInput;
