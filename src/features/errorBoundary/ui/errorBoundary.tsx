'use client';

import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

type ErrorBoundaryFallback = ReactNode | ((error: unknown) => ReactNode);

export interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ErrorBoundaryFallback;
    onError?: (error: unknown, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: unknown;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false, error: null };

    static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
        console.error('[ErrorBoundary]', error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }

    render() {
        if (!this.state.hasError) return this.props.children;

        const { fallback } = this.props;
        if (typeof fallback === 'function') return fallback(this.state.error);
        if (fallback != null) return fallback;

        return (
            <div style={{ padding: '2rem' }}>
                <div className='text'>Блок временно недоступен.</div>
            </div>
        );
    }
}

