import { useAuthForgotPasswordMutation } from '@/lib/services/authApi';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ForgotPasswordButton = ({ data, setShowError, formErrors }) => {
  const [authForgotPassword, { data: authData, isLoading, error }] = useAuthForgotPasswordMutation();

  const handleSubmit = () => {
    const hasErrors = Object.values(formErrors).some((val) => val !== '');
    if (hasErrors) {
      setShowError(true);
      return;
    }
    authForgotPassword(data);
  };

  useEffect(() => {
    if (authData) {
      toast(authData?.message || 'Reset link sent to your email', { type: 'success' });
    }
    if (error) {
      toast(error?.data?.message || 'Unknown Error!', { type: 'error' });
    }
  }, [error, authData]);

  return (
    <Button className="submitBttn" onClick={handleSubmit} disabled={isLoading}>
      Send Email
    </Button>
  );
};

export default ForgotPasswordButton;
