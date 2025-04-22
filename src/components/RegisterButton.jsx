'use client';

import { useAuthRegisterMutation } from '@/lib/services/authApi';
import { Button } from '@mui/material';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const RegisterButton = ({ data, setShowError, formErrors }) => {
  const [authRegister, { data: authData, isLoading, error }] = useAuthRegisterMutation();

  const handleSubmit = () => {
    const hasErrors = Object.values(formErrors).some((val) => val !== '');
    if (hasErrors) {
      setShowError(true);
      return;
    }
    authRegister(data);
  };

  useEffect(() => {
    if (authData) {
      toast(authData?.data?.message || 'Account Created Successfully', { type: 'success' });
      setTimeout(() => {}, 1000);
      redirect('/auth/login');
    }
    if (error) {
      toast(error?.data?.message || 'Error Login!', { type: 'error' });
    }
  }, [error, authData]);
  return (
    <Button className="submitBttn" onClick={handleSubmit} disabled={isLoading}>
      Create Account
    </Button>
  );
};

export default RegisterButton;
