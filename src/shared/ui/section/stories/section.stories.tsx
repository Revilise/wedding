// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";

import { Section } from "../index";

const meta = {
  component: Section,
  tags: ["autodocs"],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div style={{ background: "var(--colorCabbagePont)", width: "100%", height: "200px" }} />
        <div style={{ background: "var(--colorCoolHazel)", width: "100%", height: "200px" }} />
        <div style={{ background: "var(--colorDuskySkyBlue)", width: "100%", height: "200px" }} />
      </>
    ),
  },
};

