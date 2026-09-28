import type { ErrorInfo, ReactNode } from 'react';
type ErrorBoundaryFallback = ReactNode | ((error: unknown) => ReactNode);

export interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ErrorBoundaryFallback;
    onError?: (error: unknown, errorInfo: ErrorInfo) => void;
}

export interface ErrorBoundaryState {
    hasError: boolean;
    error: unknown;
}
