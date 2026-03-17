import type {FC} from "react";
import { ErrorBoundary } from "@features/errorBoundary";

import type { IScaleSuggest } from "./types.ts";
import { ScaleSuggest as ScaleSuggestComponent } from "./scaleSuggest.tsx";

export const ScaleSuggest: FC<IScaleSuggest> = (props) => {
  return (
     <ErrorBoundary>
        <ScaleSuggestComponent {...props} />
     </ErrorBoundary>
  )
}
