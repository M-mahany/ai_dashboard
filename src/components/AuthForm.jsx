'use client';

import FormInput from './FormInput/FormInput';
import { useEffect, useState } from 'react';
import RegisterButton from './RegisterButton';
import LoginButton from './LoginButton';
import ResetPasswordButton from './ResetPasswordButton';
import Link from 'next/link';
import ForgotPasswordButton from './ForgotPasswordButton';
import { formValidation } from '@/utils/helpers/formvalidation';

const AuthForm = ({ type, form }) => {
  const [data, setData] = useState({});
  const [showError, setShowError] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (data) {
      formValidation(form, data, setFormErrors);
    }
  }, [data]);

  return (
    <div className="authForm">
      {(form || [])?.map((input, i) => (
        <FormInput
          input={input}
          key={i}
          handleChange={handleChange}
          formErrors={showError ? formErrors : {}}
          data={data}
        />
      ))}
      {type === 'register' && <RegisterButton data={data} setShowError={setShowError} formErrors={formErrors} />}
      {type === 'login' && (
        <>
          <LoginButton data={data} setShowError={setShowError} formErrors={formErrors} />
          <Link href={'/auth/forgot-password'} className="forgotLink">
            Forgot password?
          </Link>
        </>
      )}
      {type === 'reset-password' && (
        <ResetPasswordButton data={data} setShowError={setShowError} formErrors={formErrors} />
      )}
      {type === 'forgot-password' && (
        <ForgotPasswordButton data={data} setShowError={setShowError} formErrors={formErrors} />
      )}
    </div>
  );
};

export default AuthForm;
