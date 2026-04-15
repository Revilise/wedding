import { Storage } from './base';

export type ILocalStorageCfg = {};

export class LocalStorage extends Storage {
    static has(name: string): boolean {
        return localStorage.getItem(name) !== null;
    }

    static delete(name: string): void {
        localStorage.removeItem(name);
    }

    static set(name: string, value: unknown): void {
        try {
            localStorage.setItem(name, JSON.stringify(value));
        } catch (e) {
            throw new Error(`LocalStorage set failed: ${e}`);
        }
    }

    static get(name: string): unknown {
        try {
            const item = localStorage.getItem(name);
            return item ? JSON.parse(item) : undefined;
        } catch (e) {
            throw new Error(`LocalStorage get failed: ${e}`);
        }
    }

    static update(name: string, value: unknown): void {
        if (this.has(name)) {
            this.set(name, value);
        } else {
            throw new Error(`Key ${name} not found for update`);
        }
    }
}
