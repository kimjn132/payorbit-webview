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
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Fields = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SubmitButton = styled.button`
  position: sticky;
  bottom: max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-bottom));
  min-height: 48px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.action.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: 700;
  transition:
    background 200ms ease,
    transform 200ms ease,
    box-shadow 200ms ease;

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.colors.shadow.focus};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.action.primaryHover};
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.action.disabled};
    cursor: not-allowed;
    transform: none;
  }

  @media (min-width: 768px) {
    position: static;
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
  line-height: 1.5;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.action.primary};
  font-weight: 700;

  &:focus-visible {
    border-radius: ${({ theme }) => theme.radii.sm};
    outline: none;
    box-shadow: ${({ theme }) => theme.colors.shadow.focus};
  }
`;
