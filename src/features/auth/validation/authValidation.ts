export const MIN_PASSWORD_LENGTH = 8;
export const MIN_NAME_LENGTH = 2;

const PHONE_PATTERN = /^010-\d{4}-\d{4}$/;

export type LoginFormValues = {
  phoneNumber: string;
  password: string;
};

export type SignupFormValues = {
  name: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
};

export type FieldErrors<TValues> = Partial<Record<keyof TValues, string>>;

export function validateLogin(values: LoginFormValues): FieldErrors<LoginFormValues> {
  const errors: FieldErrors<LoginFormValues> = {};

  if (values.phoneNumber.trim().length === 0) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (!PHONE_PATTERN.test(values.phoneNumber.trim())) {
    errors.phoneNumber = 'Enter a valid phone number (010-0000-0000).';
  }

  if (values.password.length === 0) {
    errors.password = 'Password is required.';
  }

  return errors;
}

export function validateSignup(values: SignupFormValues): FieldErrors<SignupFormValues> {
  const errors: FieldErrors<SignupFormValues> = {};

  if (values.name.trim().length < MIN_NAME_LENGTH) {
    errors.name = `Name must be at least ${MIN_NAME_LENGTH} characters.`;
  }

  if (values.phoneNumber.trim().length === 0) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (!PHONE_PATTERN.test(values.phoneNumber.trim())) {
    errors.phoneNumber = 'Enter a valid phone number (010-0000-0000).';
  }

  if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Passwords do not match.';
  }

  return errors;
}

export function hasErrors<TValues>(errors: FieldErrors<TValues>): boolean {
  return Object.keys(errors).length > 0;
}
