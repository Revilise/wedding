import type { ICard } from '@ui/card/config/types';

export interface IOutfitLook {
    id: string;
    category: 'women' | 'men';
    previewCard: ICard;
    fullscreenCard: ICard;
}
