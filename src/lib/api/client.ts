type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestConfig extends Omit<RequestInit, 'method' | 'body'> {
  params?: Record<string, string>;
  timeout?: number;
}

class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown,
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
  }
}

function buildUrl(base: string, path: string, params?: Record<string, string>): string {
  const url = new URL(path, base);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return url.toString();
}

async function request<T>(
  method: HttpMethod,
  baseUrl: string,
  path: string,
  body?: unknown,
  config: RequestConfig = {},
): Promise<T> {
  const { params, timeout = 10000, ...init } = config;
  const url = buildUrl(baseUrl, path, params);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      ...init,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => undefined);
      throw new ApiError(response.status, response.statusText, data);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

export function createApiClient(baseUrl: string) {
  return {
    get: <T>(path: string, config?: RequestConfig) =>
      request<T>('GET', baseUrl, path, undefined, config),
    post: <T>(path: string, body?: unknown, config?: RequestConfig) =>
      request<T>('POST', baseUrl, path, body, config),
    put: <T>(path: string, body?: unknown, config?: RequestConfig) =>
      request<T>('PUT', baseUrl, path, body, config),
    patch: <T>(path: string, body?: unknown, config?: RequestConfig) =>
      request<T>('PATCH', baseUrl, path, body, config),
    delete: <T>(path: string, config?: RequestConfig) =>
      request<T>('DELETE', baseUrl, path, undefined, config),
  };
}

export { ApiError };
export type { RequestConfig };
