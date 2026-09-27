'use client';

import { Button } from '@ui/button';
import { type FC, useState } from 'react';
import { useBEM } from '@lib/bem';
import type { IPalette } from '../config/types';

export const Palette: FC<IPalette> = ({ extraCN, utilCN, colors = [] }) => {
    const { bem } = useBEM('palette');
    const [active, setActive] = useState(0);
    const [copyStatus, setCopyStatus] = useState('');
    const color = colors[active] ?? colors[0];
    if (!color) return null;

    const select = (index: number) => {
        setActive(index);
        setCopyStatus('');
    };

    return (
        <div className={bem('', { extraCN, utilCN })}>
            <div className='palette__wheel'>
                <svg viewBox='0 0 400 400' aria-label='Цветовой круг дресс-кода'>
                    {colors.map((item, index) => {
                        const angle = (Math.PI * 2) / colors.length;
                        const start = index * angle - Math.PI / 2 + 0.015;
                        const end = (index + 1) * angle - Math.PI / 2 - 0.015;
                        const point = (radius: number, a: number) =>
                            `${200 + radius * Math.cos(a)} ${200 + radius * Math.sin(a)}`;
                        const large = end - start > Math.PI ? 1 : 0;
                        return (
                            <path
                                key={item.hex}
                                d={`M ${point(100, start)} L ${point(178, start)} A 178 178 0 ${large} 1 ${point(178, end)} L ${point(100, end)} A 100 100 0 ${large} 0 ${point(100, start)} Z`}
                                fill={item.hex}
                                className='palette__sector'
                                role='button'
                                tabIndex={0}
                                aria-label={`${item.name}, ${item.hex}`}
                                aria-pressed={active === index}
                                onMouseEnter={() => select(index)}
                                onFocus={() => select(index)}
                                onClick={() => select(index)}
                                onKeyDown={event => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        select(index);
                                    }
                                }}
                            />
                        );
                    })}
                </svg>
                <div className='palette__caption' aria-live='polite'>
                    <span className='palette__eyebrow'>Ваш оттенок</span>
                    <strong>{color.name}</strong>
                    <span className='palette__hex'>{color.hex.toUpperCase()}</span>
                </div>
            </div>
            <div className='palette__details'>
                <span className='palette__eyebrow'>Палитра праздника</span>
                <p>Тёплые оттенки лета</p>
                <div className='palette__legend' aria-label='Оттенки палитры'>
                    {colors.map((item, index) => (
                        <Button
                            key={item.hex}
                            type='button'
                            onClick={() => select(index)}
                            extraCN={{ isPaletteOption: true }}
                            motion={false}
                            extraAttrs={{ 'aria-pressed': active === index }}
                        >
                            <span className='btn__swatch' style={{ backgroundColor: item.hex }} />
                            {item.name}
                        </Button>
                    ))}
                </div>
                <p className='palette__hint'>
                    Наведите на сектор или коснитесь цвета, чтобы узнать его название и HEX.
                </p>
                <Button
                    type='button'
                    onClick={async () => {
                        try {
                            await navigator.clipboard.writeText(color.hex);
                            setCopyStatus('HEX скопирован');
                        } catch {
                            setCopyStatus(`Не удалось скопировать. Код: ${color.hex.toUpperCase()}`);
                        }
                    }}
                    extraCN={{ isTextLink: true }}
                    motion={false}
                >
                    Скопировать {color.hex.toUpperCase()}
                </Button>
                <span className='palette__status' role='status'>
                    {copyStatus}
                </span>
            </div>
        </div>
    );
};
