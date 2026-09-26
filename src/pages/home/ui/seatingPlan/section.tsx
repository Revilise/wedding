import { useId, useState } from 'react';
import { Section } from '@ui/section';
import { Zoom } from '@ui/zoom';
import { seatingPlanSection } from './mock.ts';
import './seatingPlan.pcss';

const normalize = (value: string) => value.toLocaleLowerCase('ru').replaceAll('ё', 'е').trim();

export const SeatingPlanSection = () => {
    const searchId = useId();
    const [query, setQuery] = useState('');
    const [selectedPlace, setSelectedPlace] = useState<number | null>(null);
    const guests = seatingPlanSection.tables.flatMap(table => table.guests);
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    const filtered = guests.filter(guest =>
        terms.every(term => normalize(guest.name).includes(term) || String(guest.place) === term)
    );
    const selected = guests.find(guest => guest.place === selectedPlace);

    return (
        <Section
            id={seatingPlanSection.anchorId}
            heading={
                <>
                    <h2 className='h2'>{seatingPlanSection.heading}</h2>
                    <p>Найдите своё имя — и своё место за праздничным столом.</p>
                </>
            }
        >
            <div className='seating-plan'>
                <div className='seating-plan__map'>
                    <div className='seating-plan__heading'>
                        <span>Схема зала</span>
                        <span>
                            Гостей: {guests.length} · Столов: {seatingPlanSection.tables.length}
                        </span>
                    </div>
                    <Zoom image={seatingPlanSection.image} height={364} width={655} showControls />
                    <p className='seating-plan__hint'>
                        Номера рядом со столами — места гостей. Увеличьте схему, чтобы рассмотреть детали.
                    </p>
                    <div className='seating-plan__selection' aria-live='polite'>
                        {selected ? (
                            <>
                                <span className='seating-plan__place'>{selected.place}</span>
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
                <div className='seating-plan__directory'>
                    <label htmlFor={searchId}>Найти своё место</label>
                    <div className='seating-plan__search'>
                        <input
                            id={searchId}
                            type='search'
                            placeholder='Имя, фамилия или номер места'
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                            aria-controls={`${searchId}-results`}
                        />
                        {query && (
                            <button type='button' onClick={() => setQuery('')} aria-label='Очистить поиск'>
                                ×
                            </button>
                        )}
                    </div>
                    <p className='seating-plan__count' role='status'>
                        {terms.length ? `Найдено гостей: ${filtered.length}` : `Все гости · ${guests.length}`}
                    </p>
                    <div className='seating-plan__results' id={`${searchId}-results`}>
                        {filtered.length ? (
                            <ul>
                                {filtered.map(guest => (
                                    <li key={guest.place}>
                                        <button
                                            type='button'
                                            aria-pressed={guest.place === selectedPlace}
                                            onClick={() => setSelectedPlace(guest.place)}
                                        >
                                            <span>{guest.name}</span>
                                            <span className='seating-plan__badge'>
                                                Место <b>{guest.place}</b>
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className='seating-plan__empty'>
                                <strong>Гость не найден</strong>
                                <p>Проверьте написание или введите только имя либо фамилию.</p>
                                <button type='button' onClick={() => setQuery('')}>
                                    Показать всех гостей
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
};
