import styled, { css } from 'styled-components';

import { useToastStore } from './toastStore';
import type { ToastVariant } from './toastStore';

export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <Viewport role="status" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} $variant={toast.variant}>
          {toast.message}
        </ToastItem>
      ))}
    </Viewport>
  );
}

const Viewport = styled.div`
  position: fixed;
  inset: auto 0 ${({ theme }) => theme.spacing.lg} 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-items: center;
  pointer-events: none;
  z-index: 1000;
`;

const variantStyles = {
  success: css`
    background: #0f9d58;
  `,
  error: css`
    background: #d93025;
  `,
} satisfies Record<ToastVariant, ReturnType<typeof css>>;

const ToastItem = styled.div<{ $variant: ToastVariant }>`
  ${({ $variant }) => variantStyles[$variant]};
  max-width: min(100%, 360px);
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: #ffffff;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.18);
`;
