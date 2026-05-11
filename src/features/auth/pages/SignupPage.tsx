import type { FormEvent } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { AuthForm } from '../components/AuthForm';
import { AuthPageFrame } from '../components/AuthPageFrame';
import { AuthTextField } from '../components/AuthTextField';

export function SignupPage() {
  const [step, setStep] = useState<SignupStep>('account');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 'account') {
      setStep('security');
    }
  };

  const isAccountStep = step === 'account';

  return (
    <AuthPageFrame
      title="Create account"
      description={isAccountStep ? 'Start with the basics.' : 'Secure your account.'}
    >
      <Progress aria-label={`Signup step ${isAccountStep ? '1' : '2'} of 2`}>
        <ProgressBar $active={isAccountStep} />
        <ProgressBar $active={!isAccountStep} />
      </Progress>
      <AuthForm
        submitLabel={isAccountStep ? 'Continue' : 'Sign up'}
        onSubmit={handleSubmit}
        footerText="Already have an account?"
        footerLinkLabel="Log in"
        footerLinkTo="/auth/login"
      >
        {isAccountStep ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </AuthForm>
    </AuthPageFrame>
  );
}

type SignupStep = 'account' | 'security';

const Progress = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ProgressBar = styled.span<{ $active: boolean }>`
  height: 4px;
  border-radius: 999px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.action.primary : theme.colors.background.subtle};
  transition: background 200ms ease;
`;
