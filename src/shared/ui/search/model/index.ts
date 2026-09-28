import { useId, useState, type Key } from 'react';
import type { SearchModelOptions } from '../config';
const normalize = (value: string) => value.toLocaleLowerCase('ru').replace(/ё/g, 'е').trim();

export function useSearch<T>({ items, matches }: SearchModelOptions<T>) {
    const searchId = useId();
    const [query, setQuery] = useState('');
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    const filtered = items.filter(item => terms.every(term => matches(item, term, normalize)));
    const reset = () => setQuery('');

    return { searchId, query, setQuery, selectedKey, setSelectedKey, terms, filtered, reset };
}
