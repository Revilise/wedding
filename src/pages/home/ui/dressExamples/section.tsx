import { useEffect, useId, useRef, useState } from 'react';
import { Section } from '@ui/section';
import { dressExamplesSection } from './mock.ts';
import './dressExamples.pcss';

const filters = [
    { value: 'all', label: 'Все образы' },
    { value: 'women', label: 'Для неё' },
    { value: 'men', label: 'Для него' },
];

export const DressExamplesSection = () => {
    const [filter, setFilter] = useState('all');
    const [selected, setSelected] = useState<number | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const id = useId();
    const looks = dressExamplesSection.looks.filter(look => filter === 'all' || look.category === filter);
    const activeLook = selected === null ? null : looks[selected];
    const isOpen = selected !== null;

    useEffect(() => {
        if (!isOpen) return;
        const dialog = dialogRef.current;
        const previousOverflow = document.body.style.overflow;
        dialog?.showModal();
        document.body.style.overflow = 'hidden';
        return () => {
            dialog?.close();
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    const move = (direction: number) =>
        setSelected(current => (current === null ? null : (current + direction + looks.length) % looks.length));

    return (
        <Section
            extraCN={{ isDressExamples: true }}
            heading={
                <>
                    <span className='dress-examples__eyebrow'>Детали вашего лета</span>
                    <h2 className='h2'>{dressExamplesSection.heading}</h2>
                    <p>Мягкие оттенки, лёгкие ткани и свобода быть собой. Несколько идей, чтобы найти свой образ.</p>
                </>
            }
        >
            <div className='dress-examples'>
                <div className='dress-examples__toolbar'>
                    <div className='dress-examples__filters' role='group' aria-label='Подборка образов'>
                        {filters.map(item => (
                            <button
                                key={item.value}
                                type='button'
                                aria-pressed={filter === item.value}
                                aria-controls={`${id}-looks`}
                                onClick={() => setFilter(item.value)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <span className='dress-examples__count' role='status'>
                        Образов: {looks.length}
                    </span>
                </div>
                <div className='dress-examples__grid' id={`${id}-looks`}>
                    {looks.map((look, index) => (
                        <figure className='dress-examples__card' key={look.src}>
                            <button
                                className='dress-examples__photo'
                                type='button'
                                onClick={() => setSelected(index)}
                                aria-label={`Рассмотреть образ «${look.title}»`}
                                aria-haspopup='dialog'
                            >
                                <img src={look.src} alt={look.alt} loading='lazy' decoding='async' />
                                <span className='dress-examples__number' aria-hidden='true'>
                                    0{index + 1}
                                </span>
                                <span className='dress-examples__expand' aria-hidden='true'>
                                    Рассмотреть <span>↗</span>
                                </span>
                            </button>
                            <figcaption>
                                <div className='dress-examples__meta'>
                                    <span>
                                        <i style={{ background: look.color }} />
                                        {look.shade}
                                    </span>
                                    <span>{look.detail}</span>
                                </div>
                                <h3>{look.title}</h3>
                                <p>{look.description}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
                <p className='dress-examples__note'>
                    Вдохновляйтесь деталями — и выбирайте то, в чём вам будет комфортно праздновать с нами.
                </p>
            </div>
            <dialog
                className='look-viewer'
                ref={dialogRef}
                aria-labelledby={`${id}-title`}
                onClose={() => setSelected(null)}
                onClick={event => {
                    if (event.target === event.currentTarget) setSelected(null);
                }}
                onKeyDown={event => {
                    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                        event.preventDefault();
                        move(event.key === 'ArrowLeft' ? -1 : 1);
                    }
                }}
            >
                <button
                    className='look-viewer__close'
                    type='button'
                    onClick={() => setSelected(null)}
                    aria-label='Закрыть просмотр'
                >
                    ×
                </button>
                {activeLook && (
                    <>
                        <img className='look-viewer__image' src={activeLook.src} alt={activeLook.alt} />
                        <div className='look-viewer__footer'>
                            <div aria-live='polite'>
                                <span>
                                    {(selected ?? 0) + 1} / {looks.length}
                                </span>
                                <h3 id={`${id}-title`}>{activeLook.title}</h3>
                            </div>
                            <div className='look-viewer__controls'>
                                <button type='button' onClick={() => move(-1)} aria-label='Предыдущий образ'>
                                    ←
                                </button>
                                <button type='button' onClick={() => move(1)} aria-label='Следующий образ'>
                                    →
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </dialog>
        </Section>
    );
};
