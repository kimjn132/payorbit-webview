import type { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

type AuthTextFieldProps = {
  label: string;
  name: string;
  type: 'email' | 'password' | 'text';
  autoComplete: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
};

export function AuthTextField({
  label,
  name,
  type,
  autoComplete,
  placeholder,
  value,
  onChange,
  error,
  disabled,
}: AuthTextFieldProps) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        $hasError={Boolean(error)}
      />
      {error ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </Field>
  );
}

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  font-weight: 700;
`;

const Input = styled.input<{ $hasError: boolean }>`
  min-height: 46px;
  width: 100%;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? '#d93025' : theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.surface};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? '#d93025' : theme.colors.border.focus};
  }

  ${({ disabled }) =>
    disabled
      ? css`
          background: ${({ theme }) => theme.colors.background.subtle};
          color: ${({ theme }) => theme.colors.text.muted};
          cursor: not-allowed;
        `
      : ''}
`;

const ErrorText = styled.p`
  margin: 0;
  color: #d93025;
  font-size: 12px;
  line-height: 1.4;
`;
