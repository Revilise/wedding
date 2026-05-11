"use client"
import { useEffect, useState } from 'react';

export function useLocalStorage(key: string, defaultValue: unknown) {
    const [value, setValue] = useState(() => {
        if (typeof window === 'undefined') {
            return defaultValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        }
        catch (error) {
            console.error("[useLocalStorage] useState: ", error);
            return defaultValue;
        }
    });

    useEffect(function updateStorageValue() {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error("[useLocalStorage]: updateStorageValue", error);
        }
    }, [key, value]);

    useEffect(function listenStorageChange() {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue !== JSON.stringify(value)) {
                setValue(JSON.parse(e.newValue || ""));
            }
        }

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key, value]);

    return { value, setValue }
}
