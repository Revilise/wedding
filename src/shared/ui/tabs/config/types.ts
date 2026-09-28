import type { ReactNode, Dispatch, SetStateAction } from 'react';
import type { IButton as IBtnProps } from '@ui/button';
import type { IComponent } from '@shared/types/component';

export interface ITabsItem {
    navigation?: IBtnProps[];
    children?: ReactNode;
}

export interface ITabs extends IComponent {
    children?: ReactNode;
    activeTab?: number;
    items: ITabsItem[];
}

export interface IUseTabs {
    activeTab?: number;
}

export interface ITabsContext {
    activeTab: number;
    setActiveTab: Dispatch<SetStateAction<number>>;
}
