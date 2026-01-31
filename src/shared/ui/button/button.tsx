import type {IButton} from "@ui/button/types.ts";
import type {FC} from "react";
import {useBEM} from "@lib/bem";
import {motion} from "motion/react";

export const Button: FC<IButton> = ({
  extraCN,
  utilCN,
  href,
  extraAttrs,
  type = "button",
  children,
}) => {
  const { bem } = useBEM("btn");
  const TagName = type === "link" ? motion.a : motion.button;

  return (
     <TagName
        className={bem("", { extraCN, utilCN })} href={href} {...extraAttrs}
        whileTap={{ y: 5 }}
        whileHover={{ scale: 1.02 }}
     >
       {children}
     </TagName>
  )
}
