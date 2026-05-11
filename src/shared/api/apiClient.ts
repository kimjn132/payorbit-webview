const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export type ApiErrorBody = {
  message?: string;
  code?: string;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  signal?: AbortSignal;
  accessToken?: string | null;
};

export async function apiRequest<TResponse>(
  path: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const { method = 'GET', body, signal, accessToken } = options;

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  if (response.status === 204) {
    return undefined as TResponse;
  }

  const text = await response.text();
  const data = text.length > 0 ? (JSON.parse(text) as unknown) : undefined;

  if (!response.ok) {
    const errorBody = (data ?? {}) as ApiErrorBody;
    throw new ApiError(
      response.status,
      errorBody.message ?? `Request failed with status ${response.status}`,
      errorBody.code,
    );
  }

  return data as TResponse;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}
