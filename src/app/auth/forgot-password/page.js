import AuthForm from '@/components/AuthForm';
import '../auth.scss';
import { forgotPasswordForm } from '@/utils/authForms';

const ForgotPassword = () => {
  return (
    <div className="authPage">
      <div className="innerWrapper">
        <div className="authFormSection" style={{ justifyContent: 'center' }}>
          <div className="middleSection">
            <h1>Password Recovery</h1>
            <p className="subHead">Recover you password using your email</p>
            <AuthForm type={'forgot-password'} form={forgotPasswordForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
