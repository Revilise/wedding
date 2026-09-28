'use client';

import { Children, type FC, type ReactNode } from 'react';

import { ErrorBoundary } from '@ui/errorBoundary';
import { Footer } from '@ui/footer';
import { Header } from '@ui/header';
import { useBEM } from '@lib/bem';

import type { ILayout } from '../config/types';

export const Layout: FC<ILayout> = ({ children, header, extraCN, utilCN, footerNavigation = [] }) => {
    const { bem } = useBEM('layout');

    return (
        <div className={bem('', { extraCN, utilCN })}>
            <Header {...header} />
            <main className={bem('content')}>{wrapChildrenWithBoundaries(children)}</main>
            <Footer navigation={footerNavigation} />
        </div>
    );
};

function wrapChildrenWithBoundaries(children: ReactNode) {
    return Children.map(children, child => (child == null ? child : <ErrorBoundary>{child}</ErrorBoundary>));
}
