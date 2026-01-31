import {type FC, useId} from "react";
import type {ICheckerGroup} from "@ui/checkerGroup/config/types.ts";
import {useBEM} from "@lib/bem";
import {Checker} from "@ui/checker";

export const CheckerGroup: FC<ICheckerGroup> = ({
  extraCN,
  utilCN,
  label,
  type = "checkbox",
  options
}) => {
  const { bem } = useBEM("checkerGroup");
  const id = useId();

  return (
     <div className={bem("", { extraCN, utilCN })}>
       {label && <span className={bem("label")}>{label}</span>}
       <fieldset className={bem("options")}>
         {options.map((option, idx) => <Checker key={`${id}-${idx}`} {...option} type={type} />)}
       </fieldset>
     </div>
  )
}
