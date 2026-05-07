import styled from 'styled-components';

type AuthTextFieldProps = {
  label: string;
  name: string;
  type: 'email' | 'password' | 'text';
  autoComplete: string;
  placeholder: string;
};

export function AuthTextField({
  label,
  name,
  type,
  autoComplete,
  placeholder,
}: AuthTextFieldProps) {
  return (
    <Field>
      <Label>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
    </Field>
  );
}

const Field = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  font-weight: 700;
`;

const Input = styled.input`
  min-height: 46px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.surface};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.focus};
  }
`;
