import { useNavigate } from '@tanstack/react-router';
import styled from 'styled-components';

import { useAuthStore } from '../../auth/stores/authStore';

export function HomePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  const handleLogout = () => {
    clearSession();
    navigate({ to: '/auth/login', replace: true });
  };

  return (
    <Shell>
      <Card>
        <Greeting>Welcome{user ? `, ${user.name}` : ''}.</Greeting>
        <Message>You're signed in to Payorbit.</Message>
        <LogoutButton type="button" onClick={handleLogout}>
          Log out
        </LogoutButton>
      </Card>
    </Shell>
  );
}

const Shell = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Card = styled.section`
  display: grid;
  width: min(100%, 420px);
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background.surface};
`;

const Greeting = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 24px;
  font-weight: 700;
  line-height: 1.25;
`;

const Message = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  line-height: 1.5;
`;

const LogoutButton = styled.button`
  min-height: 44px;
  margin-top: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.background.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.background.subtle};
  }
`;
