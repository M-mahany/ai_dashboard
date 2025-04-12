'use client';
import { useAuthLoginMutation } from '@/lib/services/authApi';
import { Button } from '@mui/material';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const LoginButton = ({ data }) => {
  const [authLogin, { data: authData, isLoading, error }] = useAuthLoginMutation();

  const handleSubmit = () => {
    authLogin(data);
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    if (key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (authData) {
      redirect('/dashboard');
    }
    if (error) {
      toast(error?.data?.message || 'Error Login!', { type: 'error' });
    }
  }, [error, authData]);

  return (
    <Button className="submitBttn" onClick={handleSubmit} disabled={isLoading} onKeyDown={handleKeyDown}>
      Login
    </Button>
  );
};

export default LoginButton;
