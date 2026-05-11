import type { FormEvent } from 'react';

import { AuthForm } from '../components/AuthForm';
import { AuthPageFrame } from '../components/AuthPageFrame';
import { AuthTextField } from '../components/AuthTextField';

export function LoginPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AuthPageFrame title="Welcome back" description="Log in to continue managing payments.">
      <AuthForm
        submitLabel="Log in"
        onSubmit={handleSubmit}
        footerText="Need an account?"
        footerLinkLabel="Sign up"
        footerLinkTo="/auth/signup"
      >
        <AuthTextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <AuthTextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
        />
      </AuthForm>
    </AuthPageFrame>
  );
}
