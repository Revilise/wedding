import type { FC } from "react";
import type {ILayout} from "./types.ts";
import {Header} from "@ui/header";

export const Layout: FC<ILayout> = ({ children }) => {
  return (
     <div className={"layout"}>
       <Header />
       {children}
     </div>
  )
}
