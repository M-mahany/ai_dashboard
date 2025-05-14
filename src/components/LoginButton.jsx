'use client';
import { useAuthLoginMutation } from '@/lib/services/authApi';
import { Button } from '@mui/material';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const LoginButton = ({ data, setShowError, formErrors }) => {
  const [authLogin, { data: authData, isLoading, error }] = useAuthLoginMutation();

  const handleSubmit = () => {
    const hasErrors = Object.values(formErrors).some((val) => val !== '');
    if (hasErrors) {
      setShowError(true);
      return;
    }
    authLogin(data);
  };

  useEffect(() => {
    if (authData) {
      location.reload();
      // redirect('/dashboard/recordings');
    }
    if (error) {
      toast(error?.data?.message || 'Error Login!', { type: 'error' });
    }
  }, [error, authData]);

  return (
    <Button className="submitBttn" onClick={handleSubmit} disabled={isLoading}>
      Login
    </Button>
  );
};

export default LoginButton;
