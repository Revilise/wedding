import {type FC, type FormEvent, useCallback, useState} from "react";
import type {IForm} from "@ui/form/config/types.ts";
import {useBEM} from "@lib/bem";
import { ctx as FormContext } from "../config/ctx";

export const Form: FC<IForm> = ({
  extraCN,
  utilCN,
  url,
  children
}) => {
  const { bem } = useBEM("form");
  const [ activeStepId, setActiveStepId ] = useState<number>(0);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

  }, [])

  return (
     <FormContext.Provider value={{ activeStepId, bem }}>
       <form
          className={bem("", {extraCN, utilCN})}
          onSubmit={(e) => handleSubmit(e)}
       >
         {children}
       </form>
     </FormContext.Provider>
  )
}
