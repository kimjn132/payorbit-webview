import { create } from 'zustand';

export type AuthUser = {
  id: string;
  name: string;
  phoneNumber: string;
};

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (payload: AuthTokens & { user: AuthUser }) => void;
  clearSession: () => void;
};

const STORAGE_KEY = 'payorbit.auth';

type PersistedAuth = AuthTokens & { user: AuthUser };

function readPersisted(): PersistedAuth | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<PersistedAuth>;
    if (
      typeof parsed.accessToken === 'string' &&
      typeof parsed.refreshToken === 'string' &&
      parsed.user &&
      typeof parsed.user.id === 'string' &&
      typeof parsed.user.phoneNumber === 'string' &&
      typeof parsed.user.name === 'string'
    ) {
      return {
        accessToken: parsed.accessToken,
        refreshToken: parsed.refreshToken,
        user: {
          id: parsed.user.id,
          phoneNumber: parsed.user.phoneNumber,
          name: parsed.user.name,
        },
      };
    }
    return null;
  } catch {
    return null;
  }
}

function writePersisted(value: PersistedAuth | null) {
  if (typeof window === 'undefined') {
    return;
  }
  if (value === null) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

const initial = readPersisted();

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: initial?.accessToken ?? null,
  refreshToken: initial?.refreshToken ?? null,
  user: initial?.user ?? null,
  isAuthenticated: initial !== null,
  setSession: ({ accessToken, refreshToken, user }) => {
    writePersisted({ accessToken, refreshToken, user });
    set({ accessToken, refreshToken, user, isAuthenticated: true });
  },
  clearSession: () => {
    writePersisted(null);
    set({ accessToken: null, refreshToken: null, user: null, isAuthenticated: false });
  },
}));
