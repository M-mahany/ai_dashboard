import Image from 'next/image';
import '../auth.scss';
import Link from 'next/link';
import AuthForm from '@/components/AuthForm';
import { registerForm } from '@/utils/authForms';

const Register = () => {
  return (
    <div className="authPage">
      <div className="innerWrapper">
        <div className="authFormSection">
          <span className="brandName">InStore AI</span>
          <div className="middleSection">
            <h1>Create An Account</h1>
            <p className="subHead">Sign up and get access to AI resources</p>
            <AuthForm type={'register'} form={registerForm} />
          </div>
          <div className="usefulLink">
            <p>
              Have an account? <Link href={'/auth/login'}>Sign in</Link>
            </p>
            <Link href={'/'}>Terms & Conditions</Link>
          </div>
        </div>

        <div className="authImageWrapper">
          <Image src={'/assets/authImage.jpeg'} alt="authImage" layout="fill" />
          <Image
            src={'/assets/absoluteImgAuth.png'}
            width={440}
            height={300}
            quality={100}
            className="absoluteImg"
            alt="dashboardImg"
          />
          <span className="layer"></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
