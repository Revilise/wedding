import {type FC, useContext} from "react";
import type {IFormContext, IFormStep} from "@ui/form/config/types.ts";
import { ctx as FormContext } from "../config/ctx";

export const FormStep: FC<IFormStep> = ({
  extraCN = {},
  utilCN,
  id = 0,
  children
}) => {
  const { bem, activeStepId } = useContext<IFormContext>(FormContext);

  return (
     <div className={bem("step", { extraCN: {...extraCN, isActive: id === activeStepId }, utilCN })}>
       {children}
     </div>
  )
}
