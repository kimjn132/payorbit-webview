import type { FormEvent } from 'react';

import { AuthForm } from '../components/AuthForm';
import { AuthPageFrame } from '../components/AuthPageFrame';
import { AuthTextField } from '../components/AuthTextField';

export function SignupPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AuthPageFrame title="Create account" description="Set up your Payorbit account.">
      <AuthForm
        submitLabel="Sign up"
        onSubmit={handleSubmit}
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
        />
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
          autoComplete="new-password"
          placeholder="Create a password"
        />
        <AuthTextField
          label="Confirm password"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
        />
      </AuthForm>
    </AuthPageFrame>
  );
}
