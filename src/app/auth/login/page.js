import Image from 'next/image';
import '../auth.scss';
import Link from 'next/link';
import AuthForm from '@/components/AuthForm';
import { loginForm } from '@/utils/authForms';

const Register = () => {
  return (
    <div className="authPage">
      <div className="innerWrapper">
        <div className="authFormSection">
          <span className="brandName">PythiaStore</span>
          <div className="middleSection">
            <h1>Welcome Back</h1>
            <p className="subHead">Login and get all your store details</p>
            <AuthForm type={'login'} form={loginForm} />
          </div>
          <div className="usefulLink">
            <p>
              Don&apos;t have an account? <Link href={'/auth/register'}>Register</Link>
            </p>
            <Link href={'/'}>Terms & Conditions</Link>
          </div>
        </div>

        <div className="authImageWrapper">
          <Image src={'/assets/authImage2.png'} alt="authImage" layout="fill" />
          <span className="layer"></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
