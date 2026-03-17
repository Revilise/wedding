import { Storage } from "./base.ts";
import { LocalStorage } from "./localStorage.ts";
import { CookieStorage } from "./cookieStorage.ts";

export enum StorageType {
  localStorage = "localStorage",
  cookies = "cookies",
}

export function StorageFactory(type: StorageType | keyof StorageType): Storage {
  switch(type) {
    case StorageType.cookies: return CookieStorage;
    case StorageType.localStorage: return LocalStorage;

    default: {
      return new LocalStorage();
    }
  }
}
