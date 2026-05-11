import { Outlet } from '@tanstack/react-router';
import styled from 'styled-components';

export function AuthLayout() {
  return (
    <PageShell>
      <IntroBlock aria-hidden="true">
        <ProductName>Payorbit</ProductName>
        <ProductCopy>Fast, calm payment operations for modern teams.</ProductCopy>
      </IntroBlock>
      <AuthPanel>
        <BrandBlock>
          <BrandName>Payorbit</BrandName>
          <BrandText>Secure access for your payment workspace.</BrandText>
        </BrandBlock>
        <Outlet />
      </AuthPanel>
    </PageShell>
  );
}

const PageShell = styled.main`
  display: grid;
  min-height: 100svh;
  align-items: stretch;
  padding: max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-top))
    max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-right))
    max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-bottom))
    max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-left));
  background: ${({ theme }) => theme.colors.background.page};

  @media (min-width: 768px) {
    grid-template-columns: minmax(0, 1fr) 420px;
    gap: ${({ theme }) => theme.spacing.xxl};
    align-items: center;
    padding: ${({ theme }) => theme.spacing.xxl};
  }
`;

const AuthPanel = styled.section`
  display: grid;
  align-content: center;
  width: min(100%, 430px);
  gap: ${({ theme }) => theme.spacing.xl};
  justify-self: center;

  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl};
    border: 1px solid ${({ theme }) => theme.colors.border.default};
    border-radius: ${({ theme }) => theme.radii.md};
    background: ${({ theme }) => theme.colors.background.surface};
    box-shadow: ${({ theme }) => theme.colors.shadow.panel};
  }
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

  @media (min-width: 768px) {
    display: none;
  }
`;

const BrandText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 15px;
  line-height: 1.5;

  @media (min-width: 768px) {
    display: none;
  }
`;

const IntroBlock = styled.aside`
  display: none;

  @media (min-width: 768px) {
    display: grid;
    max-width: 560px;
    gap: ${({ theme }) => theme.spacing.lg};
    justify-self: end;
  }
`;

const ProductName = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 56px;
  font-weight: 700;
  line-height: 1;
`;

const ProductCopy = styled.p`
  max-width: 420px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 20px;
  line-height: 1.5;
`;
