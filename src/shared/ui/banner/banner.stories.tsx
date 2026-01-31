// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";
import ExampleImage from "@images/banner-flowers.jpg";

import { Banner } from "./index.ts";

const meta = {
  component: Banner,
  tags: ["autodocs"]
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slides: [{
      image: {
        src: ExampleImage as string
      },
      title: (
         <>
           <div className={"h1 colorWhite"}>Анастасия</div>
           <div className={"h1 colorWhite"}>&Георгий</div>
         </>
      ),
      description: <span className={"colorWhite text bold"}>Любовь, как выдержанное кьянти - раскрывается со временем, становясь крепче.</span>,
      corner: {
        position: "right-bottom",
        content: (
           <div className={"text-2 bold align-right colorVintageCoral pt-24 pl-24"}>
             <div>01.08</div>
             <div>2026</div>
             <div>13:00</div>
           </div>
        )
      }
    }]
  }
}
