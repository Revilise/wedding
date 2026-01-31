// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";

import {Grid, GridItem} from "./index.ts";
import type {ReactNode} from "react";

const meta = {
  component: Grid,
  tags: ["autodocs"]
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const createChildren = (amount: number, extras: Record<number, Record<string, boolean>> = {}): ReactNode[] => {
  const colors = [
    "--colorCabbagePont",
    "--colorCoolHazel",
    "--colorDuskySkyBlue",
    "--colorShinyCopper",
    "--colorAmericanCheese"
  ]

  return new Array(amount).fill(null).map((_, i) => (
     <GridItem key={i} extraCN={extras[i] || {}}>
       <div style={{padding: "32px", background: `var(${colors[i]})`, width: "100%", minHeight: "200px", height: "100%"}}>
         <span style={{color: "white", fontSize: "22px"}}>{i}</span>
       </div>
     </GridItem>
  ))
}

export const Default: Story = {
  args: {
    children: createChildren(3)
  }
}

export const Variant1: Story = {
  args: {
    extraCN: { isVariant1: true },
    children: createChildren(3, { "2": {
        isCol2: true,
        isRowStart1: true,
        isRowEnd3: true,
      }
    })
  }
}

export const Variant2: Story = {
  args: {
    extraCN: { isVariant2: true },
    children: createChildren(3, { "2": {
        isCol2: true,
        isRowStart1: true,
        isRowEnd3: true,
      }
    })
  }
}

export const Variant3: Story = {
  args: {
    extraCN: { isOffset: true },
    children: createChildren(3, { "0": {
        isRowStart1: true,
        isRowEnd3: true,
      }
    })
  }
}
