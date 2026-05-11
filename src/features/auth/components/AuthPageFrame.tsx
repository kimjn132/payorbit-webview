import type { PropsWithChildren } from 'react';
import styled from 'styled-components';

type AuthPageFrameProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export function AuthPageFrame({ title, description, children }: AuthPageFrameProps) {
  return (
    <Frame>
      <Header>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Header>
      {children}
    </Frame>
  );
}

const Frame = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 32px;
  font-weight: 700;
  line-height: 1.15;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 16px;
  line-height: 1.5;
`;
