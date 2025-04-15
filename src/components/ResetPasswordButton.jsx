import { Button } from '@mui/material';

const ResetPasswordButton = ({ data, setShowError, formErrors }) => {
  const handleSubmit = () => {
    const hasErrors = Object.values(formErrors).some((val) => val !== '');
    if (hasErrors) {
      setShowError(true);
      return;
    }
  };

  return (
    <Button className="submitBttn" onClick={handleSubmit}>
      Reset Password
    </Button>
  );
};

export default ResetPasswordButton;
