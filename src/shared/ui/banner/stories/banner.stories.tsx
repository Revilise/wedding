// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import ExampleImage from '@images/banner-flowers.jpg';

import { Banner } from '../index';

const meta = {
    component: Banner,
    tags: ['autodocs'],
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        image: { src: ExampleImage as string },
        title: <span className='h1 colorWhite'>Анастасия & Георгий</span>,
        children: (
            <span className='colorWhite text bold'>Любовь, как выдержанное кьянти — раскрывается со временем.</span>
        ),
    },
};
