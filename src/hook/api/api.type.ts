export type Request = {
    endpoint: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    pathParams?: Record<string, string | number>;
    queryParams?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
    body?: unknown; // Because response body can be of different types
};
