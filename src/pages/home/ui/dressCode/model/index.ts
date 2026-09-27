import { useId, useState } from 'react';
import { outfitInspiration } from '../mock.tsx';

export const useDressCode = () => {
    const id = useId();
    const [filter, setFilter] = useState('all');
    const [selected, setSelected] = useState(0);
    const looks = outfitInspiration.looks.filter(look => filter === 'all' || look.category === filter);
    const move = (direction: number) => setSelected(current => (current + direction + looks.length) % looks.length);

    return {
        looks,
        filter,
        setFilter: (value: string) => {
            setFilter(value);
            setSelected(0);
        },
        selected,
        setSelected,
        activeLook: looks[selected],
        move,
        viewerId: `${id}-viewer`,
        gridId: `${id}-looks`,
    };
};
