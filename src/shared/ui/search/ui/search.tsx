import { useId, useState } from 'react';
import type { Key } from 'react';
import { useBEM } from '@lib/bem';
import type { SearchProps } from '../config/types';
import '../search.pcss';

const normalize = (value: string) => value.toLocaleLowerCase('ru').replace(/ё/g, 'е').trim();

export const Search = <T,>({
    items,
    getKey,
    matches,
    renderCard,
    onSelect,
    label,
    placeholder,
    extraCN,
    utilCN,
    renderCount,
    emptyTitle,
    emptyDescription,
    resetLabel,
}: SearchProps<T>) => {
    const { bem } = useBEM('search');
    const searchId = useId();
    const [query, setQuery] = useState('');
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    const filtered = items.filter(item => terms.every(term => matches(item, term, normalize)));
    const reset = () => setQuery('');

    return (
        <div className={bem('', { extraCN, utilCN })}>
            <label htmlFor={searchId}>{label}</label>
            <div className={bem('input')}>
                <input
                    id={searchId}
                    type='search'
                    placeholder={placeholder}
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    aria-controls={`${searchId}-results`}
                />
                {query && (
                    <button type='button' onClick={reset} aria-label='Очистить поиск'>
                        ×
                    </button>
                )}
            </div>
            <p className={bem('count')} role='status'>
                {renderCount(filtered.length, terms.length > 0)}
            </p>
            <div className={bem('results')} id={`${searchId}-results`}>
                {filtered.length ? (
                    <ul>
                        {filtered.map(item => {
                            const key = getKey(item);
                            return (
                                <li key={key}>
                                    {renderCard(item, {
                                        isSelected: key === selectedKey,
                                        select: () => {
                                            setSelectedKey(key);
                                            onSelect?.(item);
                                        },
                                    })}
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className={bem('empty')}>
                        <strong>{emptyTitle}</strong>
                        {emptyDescription && <p>{emptyDescription}</p>}
                        <button type='button' onClick={reset}>
                            {resetLabel}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
