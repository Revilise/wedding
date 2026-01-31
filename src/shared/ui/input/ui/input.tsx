import type {FC} from "react";
import type {Iinput} from "@ui/input/config/types.ts";
import {useBEM} from "@lib/bem";

export const Input: FC<Iinput> = ({
   extraCN,
   utilCN,
   type = "text",
   label,
   value,
   handlers,
}) => {
   const { bem } = useBEM("input")

   return (
      <label className={bem("", { extraCN, utilCN })}>
         {label && <span className={bem("label")}>{label}</span>}
         <input
            type={type}
            className={bem("value")}
            value={value}
            {...handlers}
         />
      </label>
   )
}
