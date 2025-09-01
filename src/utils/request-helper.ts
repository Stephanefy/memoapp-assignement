export class ApiError extends Error {
    status: number;
    body?: unknown;

    constructor(status: number, body?: unknown, message?: string) {
        super(message ?? `Request failed with ${status}`);
        this.name = 'ApiError';
        this.status = status;
        this.body = body;
    }
}

export async function request<T>(
    input: RequestInfo | URL,
    init?: RequestInit
): Promise<T> {
    const headers = new Headers(init?.headers);

    if (
        init?.body &&
        typeof init.body === 'object' &&
        init.body.constructor === Object
    ) {
        init.body = JSON.stringify(init.body);
        if (!headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }
    }
    if (!headers.has('Accept')) {
        headers.set('Accept', 'application/json');
    }

    const res = await fetch(input, { ...init, headers });

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    if (!res.ok) {
        let body: unknown;
        try {
            body = isJson ? await res.json() : await res.text();
        } catch { }

        const message =
            (body as { message?: string })?.message ??
            res.statusText ??
            `HTTP error ${res.status}`;

        throw new ApiError(res.status, body, message);
    }

    if (res.status === 204 || contentType === '') {
        return undefined as unknown as T;
    }

    return isJson
        ? ((await res.json()) as T)
        : ((await res.text()) as unknown as T);
}
