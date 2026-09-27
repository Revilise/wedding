import { Section } from '@ui/section';
import { Palette } from '@entities/palette';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Grid } from '@ui/grid';
import { Flex } from '@ui/flex';
import { POPOVER } from '@shared/const';
import { dressCodeSection, outfitInspiration } from './mock.tsx';
import { useDressCode } from './model';
import { Fullscreen } from '@features/fullscreen';

export const DressCodeSection = () => {
    const { looks, filter, setFilter, selected, setSelected, activeLook, move, viewerId, gridId } = useDressCode();

    return (
        <>
            <Section
                id={dressCodeSection.anchorId}
                extraCN={{ isDressCode: true }}
                heading={
                    <>
                        <h2 className='h2'>{dressCodeSection.heading}</h2>
                        <h4 className='h4'>{dressCodeSection.subTitle}</h4>
                    </>
                }
            >
                <div className='flex-column gap-16'>{dressCodeSection.content}</div>
                <Palette colors={dressCodeSection.palette} />
                <p>При подборе образов покажите эту палитру консультантам или стилистам в магазине.</p>
            </Section>
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
                <Flex extraCN={{ isColumn: true, isGap3: true }}>
                    <div role='group' aria-label='Подборка образов'>
                        <Flex>
                            {[
                                { value: 'all', label: 'Все образы' },
                                { value: 'women', label: 'Для неё' },
                                { value: 'men', label: 'Для него' },
                            ].map(item => (
                                <Button
                                    key={item.value}
                                    extraCN={{ isOutline: true, isFit: true }}
                                    motion={false}
                                    size={24}
                                    onClick={() => setFilter(item.value)}
                                    extraAttrs={{ 'aria-pressed': filter === item.value, 'aria-controls': gridId }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Flex>
                    </div>
                    <p role='status'>Образов: {looks.length}</p>
                    <div id={gridId}>
                        <Grid extraCN={{ is2Cols: true }}>
                            {looks.map((look, index) => (
                                <Fullscreen
                                    preview={
                                        <Card
                                            key={look.src}
                                            extraCN={{ isLook: true }}
                                            heading={<h3 className='h3'>{look.title}</h3>}
                                            images={[{ src: look.src, alt: look.alt }]}
                                            tags={[
                                                { label: look.shade },
                                                { label: look.detail, extraCN: { isOutline: true } },
                                            ]}
                                            footer={
                                                <Button
                                                    extraCN={{ isOutline: true }}
                                                    motion={false}
                                                    onClick={() => setSelected(index)}
                                                    extraAttrs={{
                                                        [POPOVER.SHOW]: viewerId,
                                                        'aria-label': `Рассмотреть образ «${look.title}»`,
                                                    }}
                                                >
                                                    Рассмотреть ↗
                                                </Button>
                                            }
                                        >
                                            <p>{look.description}</p>
                                        </Card>
                                    }
                                >
                                    <Card
                                        extraCN={{ isLookFullscreen: true }}
                                        heading={activeLook.title}
                                        tags={[{ label: `${selected + 1} / ${looks.length}` }]}
                                        images={[{ src: look.src, alt: look.alt }]}
                                        children={
                                            <Flex>
                                                <Button
                                                    extraCN={{ isOutline: true }}
                                                    motion={false}
                                                    onClick={() => move(1)}
                                                >
                                                    Следующий образ →
                                                </Button>
                                            </Flex>
                                        }
                                    />
                                </Fullscreen>
                            ))}
                        </Grid>
                    </div>
                    <p>Вдохновляйтесь деталями — и выбирайте то, в чём вам будет комфортно праздновать с нами.</p>
                </Flex>
            </Section>
        </>
    );
};
