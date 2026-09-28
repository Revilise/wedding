import type { ICard } from '@ui/card';

export interface IOutfitLook {
    id: string;
    category: 'women' | 'men';
    previewCard: ICard;
    fullscreenCard: ICard;
}
