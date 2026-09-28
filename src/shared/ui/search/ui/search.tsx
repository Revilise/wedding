import { useSearch } from '../model';
import { Button } from '@ui/button';
import { useBEM } from '@lib/bem';
import type { SearchProps } from '../config/types';

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
    const { searchId, query, setQuery, selectedKey, setSelectedKey, terms, filtered, reset } = useSearch({
        items,
        matches,
    });

    return (
        <div className={bem('', { extraCN, utilCN })}>
            <label className={bem('label')} htmlFor={searchId}>
                {label}
            </label>
            <div className={bem('input')}>
                <input
                    className={bem('field')}
                    id={searchId}
                    type='search'
                    placeholder={placeholder}
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    aria-controls={`${searchId}-results`}
                />
                {query && (
                    <Button
                        type='button'
                        onClick={reset}
                        utilCN={[bem('clear')]}
                        extraCN={{ isIconMuted: true }}
                        motion={false}
                        extraAttrs={{ 'aria-label': 'Очистить поиск' }}
                    >
                        ×
                    </Button>
                )}
            </div>
            <p className={bem('count')} role='status'>
                {renderCount(filtered.length, terms.length > 0)}
            </p>
            <div className={bem('results')} id={`${searchId}-results`}>
                {filtered.length ? (
                    <ul className={bem('list')}>
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
                        {emptyDescription && <p className={bem('description')}>{emptyDescription}</p>}
                        <Button type='button' onClick={reset} extraCN={{ isCompactBordered: true }} motion={false}>
                            {resetLabel}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
