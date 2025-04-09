'use client';

import FormInput from './FormInput/FormInput';
import { useState } from 'react';
import RegisterButton from './RegisterButton';
import LoginButton from './LoginButton';
import ResetPasswordButton from './ResetPasswordButton';
import Link from 'next/link';
import ForgotPasswordButton from './ForgotPasswordButton';

const AuthForm = ({ type, form }) => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="authForm">
      {(form || [])?.map((input, i) => (
        <FormInput input={input} key={i} handleChange={handleChange} />
      ))}
      {type === 'register' && <RegisterButton data={data} />}
      {type === 'login' && (
        <>
          <LoginButton data={data} />
          <Link href={'/auth/forgot-password'} className="forgotLink">
            Forgot password?
          </Link>
        </>
      )}
      {type === 'reset-password' && <ResetPasswordButton data={data} />}
      {type === 'forgot-password' && <ForgotPasswordButton data={data} />}
    </div>
  );
};

export default AuthForm;
