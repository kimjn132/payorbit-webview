import { Link } from '@tanstack/react-router';
import type { FormEventHandler, PropsWithChildren } from 'react';
import styled from 'styled-components';

type AuthFormProps = PropsWithChildren<{
  submitLabel: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
}>;

export function AuthForm({
  submitLabel,
  onSubmit,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}: AuthFormProps) {
  return (
    <Form onSubmit={onSubmit}>
      <Fields>{children}</Fields>
      <SubmitButton type="submit">{submitLabel}</SubmitButton>
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

const SubmitButton = styled.button`
  min-height: 48px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.action.primary};
  color: #ffffff;
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.action.primaryHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.action.disabled};
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
