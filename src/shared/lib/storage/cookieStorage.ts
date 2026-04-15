import { Storage } from './base';

export type CookieStorageCfg = {
    options?: {
        expires?: Date;
        path?: string;
        domain?: string;
        secure?: boolean;
        sameSite?: 'Strict' | 'Lax' | 'None';
    };
};

export class CookieStorage extends Storage {
    static getStringOptions(config: CookieStorageCfg['options']) {
        const opts: string[] = [];
        if (config?.expires) opts.push(`expires=${config?.expires.toUTCString()}`);
        if (config?.path) opts.push(`path=${config?.path}`);
        if (config?.domain) opts.push(`domain=${config?.domain}`);
        if (config?.secure) opts.push('secure');
        if (config?.sameSite) opts.push(`SameSite=${config?.sameSite}`);

        return opts.length ? `; ${opts.join('; ')}` : '';
    }

    static has(name: string): boolean {
        return document.cookie.split(';').some(cookie => cookie.trim().startsWith(`${name}=`));
    }

    static delete(name: string): void {
        if (this.has(name)) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
    }

    static set(name: string, value: unknown, options: CookieStorageCfg['options'] = {}): void {
        const optionsString = this.getStringOptions(options);
        const cookieValue = encodeURIComponent(JSON.stringify(value));
        document.cookie = `${name}=${cookieValue}${optionsString}`;
    }

    static get(name: string): unknown {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [key, val] = cookie.trim().split('=');
            if (key === name && val) {
                try {
                    return JSON.parse(decodeURIComponent(val));
                } catch {
                    return undefined;
                }
            }
        }
        return undefined;
    }

    static update(name: string, value: unknown): void {
        if (this.has(name)) {
            this.set(name, value);
        } else {
            throw new Error(`Key ${name} not found for update`);
        }
    }
}
