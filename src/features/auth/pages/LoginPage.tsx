import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import type { FormEvent } from 'react';

import { getApiErrorMessage } from '../../../shared/api/apiClient';
import { AuthForm } from '../components/AuthForm';
import { AuthPageFrame } from '../components/AuthPageFrame';
import { AuthTextField } from '../components/AuthTextField';
import { useLoginMutation } from '../hooks/useLoginMutation';
import { hasErrors, validateLogin } from '../validation/authValidation';
import type { FieldErrors, LoginFormValues } from '../validation/authValidation';

const INITIAL_VALUES: LoginFormValues = {
  phoneNumber: '',
  password: '',
};

export function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const [values, setValues] = useState<LoginFormValues>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<LoginFormValues>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = <K extends keyof LoginFormValues>(field: K, value: LoginFormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginMutation.isPending) {
      return;
    }

    const errors = validateLogin(values);
    if (hasErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSubmitError(null);

    loginMutation.mutate(
      { phoneNumber: values.phoneNumber.trim(), password: values.password },
      {
        onSuccess: () => {
          navigate({ to: '/', replace: true });
        },
        onError: (error) => {
          setSubmitError(getApiErrorMessage(error, 'Failed to log in. Please try again.'));
        },
      },
    );
  };

  return (
    <AuthPageFrame title="Log in" description="Enter your credentials to continue.">
      <AuthForm
        submitLabel="Log in"
        pendingLabel="Logging in..."
        onSubmit={handleSubmit}
        isSubmitting={loginMutation.isPending}
        errorMessage={submitError}
        footerText="Need an account?"
        footerLinkLabel="Sign up"
        footerLinkTo="/auth/signup"
      >
        <AuthTextField
          label="Phone number"
          name="phoneNumber"
          type="tel"
          autoComplete="tel"
          placeholder="010-0000-0000"
          value={values.phoneNumber}
          onChange={(value) => updateField('phoneNumber', value)}
          error={fieldErrors.phoneNumber}
          disabled={loginMutation.isPending}
        />
        <AuthTextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={values.password}
          onChange={(value) => updateField('password', value)}
          error={fieldErrors.password}
          disabled={loginMutation.isPending}
        />
      </AuthForm>
    </AuthPageFrame>
  );
}
