import type { CSSProperties } from 'react';

export interface IComponent {
    id?: string,
    extraCN?: Record<string, boolean>,
    utilCN?: Array<string>,
    extraAttrs?: Record<string, unknown>,
    style?: CSSProperties
}
