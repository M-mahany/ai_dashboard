import './PasswordRules.scss';
import { MdRadioButtonUnchecked } from 'react-icons/md';
import { IoMdCheckmarkCircle } from 'react-icons/io';

const PasswordRules = ({ password }) => {
  const checkPasswordRules = (password = '') => ({
    minLength: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  });

  const rules = checkPasswordRules(password);
  return (
    <div className="passwordRules">
      <div className={`passwordRule ${rules.minLength ? 'done' : ''}`}>
        {rules.minLength ? <IoMdCheckmarkCircle /> : <MdRadioButtonUnchecked />} At least 8 characters
      </div>
      <div className={`passwordRule ${rules.hasLowercase ? 'done' : ''}`}>
        {rules.hasLowercase ? <IoMdCheckmarkCircle /> : <MdRadioButtonUnchecked />} One lowercase letter
      </div>
      <div className={`passwordRule ${rules.hasUppercase ? 'done' : ''}`}>
        {rules.hasUppercase ? <IoMdCheckmarkCircle /> : <MdRadioButtonUnchecked />} One uppercase letter
      </div>
      <div className={`passwordRule ${rules.hasNumber ? 'done' : ''}`}>
        {rules.hasNumber ? <IoMdCheckmarkCircle /> : <MdRadioButtonUnchecked />} One number
      </div>
      <div className={`passwordRule ${rules.hasSymbol ? 'done' : ''}`}>
        {rules.hasSymbol ? <IoMdCheckmarkCircle /> : <MdRadioButtonUnchecked />} One symbol (e.g. !@#)
      </div>
    </div>
  );
};

export default PasswordRules;
