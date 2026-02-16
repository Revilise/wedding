import {type FC, type FormEvent, useCallback, useState} from "react";
import type {IForm} from "@ui/form/config/types.ts";
import {useBEM} from "@lib/bem";
import { ctx as FormContext } from "../config/ctx";
import {request} from "@lib/request";
import {AnimatePresence} from "motion/react";

export const Form: FC<IForm> = ({
  extraCN,
  utilCN,
  url,
  children
}) => {
  const { bem } = useBEM("form");
  const [ activeStepId, setActiveId ] = useState<string>("0");

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    request(formData, { url, method: "post" })
       .then(resp => {
          setActiveId("success");
       })
       .catch(err => {
         setActiveId("error")
       })
  }, [])

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
