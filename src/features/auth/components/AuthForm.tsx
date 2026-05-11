import { Link } from '@tanstack/react-router';
import type { FormEventHandler, PropsWithChildren } from 'react';
import styled from 'styled-components';

type AuthFormProps = PropsWithChildren<{
  submitLabel: string;
  pendingLabel?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
}>;

export function AuthForm({
  submitLabel,
  pendingLabel,
  onSubmit,
  isSubmitting = false,
  errorMessage,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}: AuthFormProps) {
  return (
    <Form onSubmit={onSubmit} noValidate>
      <Fields>{children}</Fields>
      {errorMessage ? <FormError role="alert">{errorMessage}</FormError> : null}
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? (pendingLabel ?? submitLabel) : submitLabel}
      </SubmitButton>
      <Footer>
        <span>{footerText}</span>
        <FooterLink to={footerLinkTo}>{footerLinkLabel}</FooterLink>
      </Footer>
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Fields = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormError = styled.p`
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: #fdecea;
  color: #b1271b;
  font-size: 13px;
  line-height: 1.4;
`;

const SubmitButton = styled.button`
  min-height: 48px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.action.primary};
  color: #ffffff;
  font-weight: 700;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.action.primaryHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.action.disabled};
    cursor: not-allowed;
  }
`;

const Footer = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  justify-content: center;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.action.primary};
  font-weight: 700;
`;
