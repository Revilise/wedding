import type { Key, ReactNode } from 'react';
import type { IComponent } from '@shared/types/component';

export interface SearchProps<T> extends IComponent {
    items: readonly T[];
    getKey: (item: T) => Key;
    matches: (item: T, term: string, normalize: (value: string) => string) => boolean;
    renderCard: (item: T, state: { isSelected: boolean; select: () => void }) => ReactNode;
    onSelect?: (item: T) => void;
    label: string;
    placeholder?: string;
    renderCount: (count: number, isSearching: boolean) => ReactNode;
    emptyTitle: string;
    emptyDescription?: string;
    resetLabel: string;
}
