interface RequestOptions {
  method: "get" | "post" | "put" | "delete";
  url: string;
}

export function request(data: unknown, options: RequestOptions) {
  return fetch(options.url, {
    method: options.method,
    body: JSON.stringify(data),
  }).then(res => res.json());
}
