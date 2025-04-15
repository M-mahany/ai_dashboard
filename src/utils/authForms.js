export const registerForm = [
  {
    id: 1,
    name: 'firstName',
    label: 'First Name*',
    type: 'text',
    size: 'short',
    isRequired: true,
  },
  {
    id: 2,
    name: 'lastName',
    label: 'Last Name*',
    type: 'text',
    size: 'short',
    isRequired: true,
  },
  {
    id: 3,
    name: 'email',
    label: 'Email*',
    type: 'email',
    size: '',
    isRequired: true,
  },
  {
    id: 4,
    name: 'phone',
    label: 'Phone',
    type: 'text',
    size: '',
  },
  {
    id: 4,
    name: 'password',
    label: 'Password*',
    type: 'password',
    size: '',
    isRequired: true,
  },
  {
    id: 4,
    name: 'confirmPassword',
    label: 'Confirm Password*',
    type: 'password',
    size: '',
    isRequired: true,
    skipCheck: true,
  },
];

export const loginForm = [
  {
    id: 1,
    name: 'email',
    label: 'Email*',
    type: 'email',
    size: '',
    isRequired: true,
  },
  {
    id: 2,
    name: 'password',
    label: 'Password*',
    type: 'password',
    size: '',
    skipCheck: true,
    isRequired: true,
  },
];

export const resetPasswordForm = [
  {
    id: 1,
    name: 'password',
    label: 'New Password*',
    type: 'password',
    size: '',
    isRequired: true,
  },
  {
    id: 2,
    name: 'confirmPassword',
    label: 'Confirm Password*',
    type: 'password',
    size: '',
    isRequired: true,
    skipCheck: true,
  },
];

export const forgotPasswordForm = [
  {
    id: 1,
    name: 'email',
    label: 'Email*',
    type: 'email',
    size: '',
    isRequired: true,
  },
];
