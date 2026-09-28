import { Button } from '@ui/button';
import { useBEM } from '@lib/bem';
import { Search } from '@ui/search';
import { Zoom } from '@ui/zoom';

import type { SeatingPlanProps } from '../config';
import { useSeatingPlan } from '../model/useSeatingPlan';

export const SeatingPlan = ({ image, tables, extraCN, utilCN, extraAttrs }: SeatingPlanProps) => {
    const { bem } = useBEM('seating-plan');
    const { selected, setSelected, guests } = useSeatingPlan(tables);

    return (
        <div className={bem('', { extraCN, utilCN })} {...extraAttrs}>
            <div className={bem('map')}>
                <div className={bem('heading')}>
                    <span>Схема зала</span>
                    <span className={bem('summary')}>
                        Гостей: {guests.length} · Столов: {tables.length}
                    </span>
                </div>
                <Zoom
                    extraCN={{ isPaper: true, isFullWidth: true }}
                    image={image}
                    height={364}
                    width={655}
                    showControls
                />
                <p className={bem('hint')}>
                    Номера рядом со столами — места гостей. Увеличьте схему, чтобы рассмотреть детали.
                </p>
                <div className={bem('selection')} aria-live='polite'>
                    {selected ? (
                        <>
                            <span className={bem('place')}>{selected.place}</span>
                            <div>
                                <span className={bem('selectionHint')}>Ваше место на схеме</span>
                                <strong className={bem('selectedName')}>{selected.name}</strong>
                            </div>
                        </>
                    ) : (
                        <p className={bem('selectionHint')}>Выберите гостя в списке, чтобы запомнить номер места.</p>
                    )}
                </div>
            </div>
            <div className={bem('directory')}>
                <Search
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
                            type='button'
                            onClick={select}
                            extraCN={{ isUnderlinedRow: true }}
                            motion={false}
                            extraAttrs={{ 'aria-pressed': isSelected }}
                        >
                            <span>{guest.name}</span>
                            <span className={bem('badge')}>
                                Место{' '}
                                <b className={bem('badgeNumber', { utilCN: isSelected ? ['isSelected'] : [] })}>
                                    {guest.place}
                                </b>
                            </span>
                        </Button>
                    )}
                />
            </div>
        </div>
    );
};
