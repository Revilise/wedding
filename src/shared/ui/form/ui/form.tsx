import {type FC, useState} from "react";
import type {IForm} from "@ui/form/config/types.ts";
import {useBEM} from "@lib/bem";
import { ctx as FormContext } from "../config/ctx";
import {AnimatePresence} from "motion/react";

export const Form: FC<IForm> = ({
  extraCN,
  utilCN,
  url,
  children
}) => {
  const { bem } = useBEM("form");
  const [ activeStepId, setActiveId ] = useState<string>("0");

  function handleSubmit(e: SubmitEvent) {}

  return (
     <FormContext.Provider value={{ activeStepId, bem }}>
         <form
            className={bem("", {extraCN, utilCN})}
            onSubmit={(e) => handleSubmit(e)}
         >
           <AnimatePresence>
            {children}
           </AnimatePresence>
         </form>
     </FormContext.Provider>
  )
}
