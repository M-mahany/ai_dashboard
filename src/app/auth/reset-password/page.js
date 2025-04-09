import AuthForm from '@/components/AuthForm';
import '../auth.scss';
import { resetPasswordForm } from '@/utils/authForms';

const ResetPassword = () => {
  return (
    <div className="authPage">
      <div className="innerWrapper">
        <div className="authFormSection" style={{ justifyContent: 'center' }}>
          <div className="middleSection">
            <h1>Reset Password</h1>
            <AuthForm type={'reset-password'} form={resetPasswordForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
