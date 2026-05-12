import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import type { FormEvent } from 'react';

import { getApiErrorMessage } from '../../../shared/api/apiClient';
import { useToast } from '../../../shared/toast/toastStore';
import { AuthForm } from '../components/AuthForm';
import { AuthPageFrame } from '../components/AuthPageFrame';
import { AuthTextField } from '../components/AuthTextField';
import { useSignupMutation } from '../hooks/useSignupMutation';
import { hasErrors, validateSignup } from '../validation/authValidation';
import type { FieldErrors, SignupFormValues } from '../validation/authValidation';

const INITIAL_VALUES: SignupFormValues = {
  name: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
};

export function SignupPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const signupMutation = useSignupMutation();

  const [values, setValues] = useState<SignupFormValues>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<SignupFormValues>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = <K extends keyof SignupFormValues>(
    field: K,
    value: SignupFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (signupMutation.isPending) {
      return;
    }

    const errors = validateSignup(values);
    if (hasErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSubmitError(null);

    signupMutation.mutate(
      {
        name: values.name.trim(),
        phoneNumber: values.phoneNumber.trim(),
        password: values.password,
      },
      {
        onSuccess: () => {
          toast.success('Account created. Please log in.');
          navigate({ to: '/auth/login', replace: true });
        },
        onError: (error) => {
          setSubmitError(getApiErrorMessage(error, 'Failed to sign up. Please try again.'));
        },
      },
    );
  };

  return (
    <AuthPageFrame title="Create account" description="Set up your Payorbit account.">
      <AuthForm
        submitLabel="Sign up"
        pendingLabel="Creating account..."
        onSubmit={handleSubmit}
        isSubmitting={signupMutation.isPending}
        errorMessage={submitError}
        footerText="Already have an account?"
        footerLinkLabel="Log in"
        footerLinkTo="/auth/login"
      >
        <AuthTextField
          label="Name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={values.name}
          onChange={(value) => updateField('name', value)}
          error={fieldErrors.name}
          disabled={signupMutation.isPending}
        />
        <AuthTextField
          label="Phone number"
          name="phoneNumber"
          type="tel"
          autoComplete="tel"
          placeholder="010-0000-0000"
          value={values.phoneNumber}
          onChange={(value) => updateField('phoneNumber', value)}
          error={fieldErrors.phoneNumber}
          disabled={signupMutation.isPending}
        />
        <AuthTextField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={values.password}
          onChange={(value) => updateField('password', value)}
          error={fieldErrors.password}
          disabled={signupMutation.isPending}
        />
        <AuthTextField
          label="Confirm password"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          value={values.passwordConfirm}
          onChange={(value) => updateField('passwordConfirm', value)}
          error={fieldErrors.passwordConfirm}
          disabled={signupMutation.isPending}
        />
      </AuthForm>
    </AuthPageFrame>
  );
}
