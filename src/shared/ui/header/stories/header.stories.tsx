// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

import { Header } from '../index';

const meta = {
    component: Header,
    tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { date: '01.08.2026', time: '14:00', address: 'Адрес мероприятия', logo: 'A&G' },
};
