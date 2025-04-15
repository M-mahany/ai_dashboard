'use client';

import { useAuthResetPasswordMutation } from '@/lib/services/authApi';
import { Button } from '@mui/material';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ResetPasswordButton = ({ data, setShowError, formErrors }) => {
  const [authResetPassword, { data: authData, isLoading, error }] = useAuthResetPasswordMutation();

  const searchparams = useSearchParams();
  const token = searchparams.get('token');

  const handleSubmit = () => {
    const hasErrors = Object.values(formErrors).some((val) => val !== '');
    if (hasErrors) {
      setShowError(true);
      return;
    }
    authResetPassword({ ...data, token });
  };

  useEffect(() => {
    if (authData) {
      toast(authData?.message || 'Password resetted Successfully', { type: 'success' });
      setTimeout(() => {}, 1000);
      redirect('/auth/login');
    }
    if (error) {
      toast(error?.data?.message || 'Error Resetting password!', { type: 'error' });
    }
  }, [error, authData]);

  return (
    <Button className="submitBttn" onClick={handleSubmit} disabled={isLoading}>
      Reset Password
    </Button>
  );
};

export default ResetPasswordButton;
