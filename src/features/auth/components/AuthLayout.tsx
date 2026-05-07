import { Outlet } from '@tanstack/react-router';
import styled from 'styled-components';

export function AuthLayout() {
  return (
    <PageShell>
      <AuthPanel>
        <BrandBlock>
          <BrandName>Payorbit</BrandName>
          <BrandText>Secure account access for payment operations.</BrandText>
        </BrandBlock>
        <Outlet />
      </AuthPanel>
    </PageShell>
  );
}

const PageShell = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const AuthPanel = styled.section`
  display: grid;
  width: min(100%, 420px);
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background.surface};
`;

const BrandBlock = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const BrandName = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 28px;
  font-weight: 700;
  line-height: 1.15;
`;

const BrandText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 15px;
  line-height: 1.5;
`;
