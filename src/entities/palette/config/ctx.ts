import { createContext } from "react";

import type { bemOptions } from "@lib/bem/types";

export const context = createContext<{ bem: (blockCN: string, options: Omit<bemOptions, "baseCN">) => string }>({
  bem: () => "",
});

