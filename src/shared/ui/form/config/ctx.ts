import {createContext} from "react";
import type {IFormContext} from "@ui/form/config/types.ts";

export const ctx = createContext<IFormContext>({
  bem: () => "",
  activeStepId: 0
});
