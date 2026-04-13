import type { ISection } from "@ui/section/types.ts";
import type {FC} from "react";
import {useBEM} from "@lib/bem";
import {ErrorBoundary} from "@features/errorBoundary";

export const Section: FC<ISection> = ({
  extraCN,
  utilCN,
  heading,
  children,
}) => {
  const { bem } = useBEM("section");

  return (
     <ErrorBoundary>
       <section className={bem("", { extraCN, utilCN })}>
         {heading && <div className={bem("heading")}>{heading}</div>}
         <div className={bem("wrapper")}>
           {children}
         </div>
       </section>
     </ErrorBoundary>
  )
}
