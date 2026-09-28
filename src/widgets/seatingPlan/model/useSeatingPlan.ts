import { useState } from 'react';
import type { Guest, SeatingPlanProps } from '../config';
export function useSeatingPlan(tables: SeatingPlanProps['tables']) {
    const [selected, setSelected] = useState<Guest | null>(null);
    return { selected, setSelected, guests: tables.flatMap(table => table.guests) };
}
