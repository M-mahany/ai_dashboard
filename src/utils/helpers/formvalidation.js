import { isStrongPassword } from 'validator';
import isEmail from 'validator/lib/isEmail';

export const formValidation = (formArry, formData, setErrors) => {
  let errors = {};
  formArry.forEach((input) => {
    if (input?.isRequired && !formData[input?.name]) {
      errors[input.name] = `${input?.label} is required`;
    } else {
      if (formData[input?.name]) {
        if (input?.type === 'email' && !isEmail(formData[input?.name])) {
          errors[input.name] = `${input?.label} is not valid email`;
        }
        if (input?.name === 'password' && !isStrongPassword(formData[input?.name]) && !input?.skipCheck) {
          errors[input.name] = `Password must:
                 Be at least 8 characters long,
                 Contain at least one lowercase letter,
                  one uppercase letter,
                  one number &
                  one symbol`;
        }
        if (input?.name === 'confirmPassword' && formData?.password && formData[input?.name] !== formData?.password) {
          errors[input.name] = 'Password must match';
        }
      }
    }
  });
  setErrors(errors);
};
