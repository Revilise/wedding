import { Button } from '@ui/button';
import { useState } from 'react';
import { useBEM } from '@lib/bem';
import { Search } from '@ui/search';
import { Zoom } from '@ui/zoom';
import './seatingPlan.pcss';

type Guest = { place: number; name: string };

type SeatingPlanProps = {
    image: { src: string; alt?: string };
    tables: { guests: Guest[] }[];
};

export const SeatingPlan = ({ image, tables }: SeatingPlanProps) => {
    const { bem } = useBEM('seating-plan');
    const [selected, setSelected] = useState<Guest | null>(null);
    const guests = tables.flatMap(table => table.guests);

    return (
        <div className={bem('')}>
            <div className={bem('map')}>
                <div className={bem('heading')}>
                    <span>Схема зала</span>
                    <span>
                        Гостей: {guests.length} · Столов: {tables.length}
                    </span>
                </div>
                <Zoom image={image} height={364} width={655} showControls />
                <p className={bem('hint')}>
                    Номера рядом со столами — места гостей. Увеличьте схему, чтобы рассмотреть детали.
                </p>
                <div className={bem('selection')} aria-live='polite'>
                    {selected ? (
                        <>
                            <span className={bem('place')}>{selected.place}</span>
                            <div>
                                <span>Ваше место на схеме</span>
                                <strong>{selected.name}</strong>
                            </div>
                        </>
                    ) : (
                        <p>Выберите гостя в списке, чтобы запомнить номер места.</p>
                    )}
                </div>
            </div>
            <Search
                utilCN={[bem('directory')]}
                items={guests}
                getKey={guest => guest.place}
                matches={(guest, term, normalize) =>
                    normalize(guest.name).includes(term) || String(guest.place) === term
                }
                label='Найти своё место'
                placeholder='Имя, фамилия или номер места'
                renderCount={(count, isSearching) =>
                    isSearching ? `Найдено гостей: ${count}` : `Все гости · ${count}`
                }
                emptyTitle='Гость не найден'
                emptyDescription='Проверьте написание или введите только имя либо фамилию.'
                resetLabel='Показать всех гостей'
                onSelect={setSelected}
                renderCard={(guest, { isSelected, select }) => (
                    <Button
                        utilCN={[bem('guest')]}
                        type='button'
                        onClick={select}
                        extraCN={{ isGuest: true }}
                        motion={false}
                        extraAttrs={{ 'aria-pressed': isSelected }}
                    >
                        <span>{guest.name}</span>
                        <span className={bem('badge')}>
                            Место <b>{guest.place}</b>
                        </span>
                    </Button>
                )}
            />
        </div>
    );
};
