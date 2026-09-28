import { Section } from '@ui/section';
import { Card } from '@ui/card';
import { Tabs } from '@ui/tabs';
import { outfitInspiration } from './mock.tsx';
import { Fullscreen } from '@features/fullscreen';

export const DressCodeSection = () => {
    return (
        <>
            <Section
                heading={
                    <>
                        <h2 className='h2'>{outfitInspiration.heading}</h2>
                        <p>
                            Мягкие оттенки, лёгкие ткани и свобода быть собой. Несколько идей, чтобы найти свой образ.
                        </p>
                    </>
                }
            >
                <Tabs
                    extraCN={{ isLooks: true }}
                    extraAttrs={{ 'aria-label': 'Подборка образов' }}
                    items={[
                        { value: 'all', label: 'Все образы' },
                        { value: 'women', label: 'Для неё' },
                        { value: 'men', label: 'Для него' },
                    ].map(({ value, label }) => {
                        const looks = outfitInspiration.looks.filter(
                            look => value === 'all' || look.category === value
                        );

                        return {
                            navigation: [
                                {
                                    label,
                                    extraCN: { isOutline: true, isFit: true },
                                    motion: false,
                                    size: 24,
                                },
                            ],
                            children: (
                                <>
                                    <p role='status'>Образов: {looks.length}</p>
                                    {looks.map((look, index) => (
                                        <Fullscreen key={look.id} preview={<Card {...look.previewCard} />}>
                                            <Card
                                                {...look.fullscreenCard}
                                                tags={[{ label: `${index + 1} / ${looks.length}` }]}
                                            />
                                        </Fullscreen>
                                    ))}
                                </>
                            ),
                        };
                    })}
                />
                <p>Вдохновляйтесь деталями — и выбирайте то, в чём вам будет комфортно праздновать с нами.</p>
            </Section>
        </>
    );
};
