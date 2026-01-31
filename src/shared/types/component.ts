import type {bemOptions} from "@lib/bem/types.ts";
import type {CSSProperties} from "react";

export interface IComponent {
  extraCN?: bemOptions["extraCN"];
  utilCN?: bemOptions["utilCN"];
  extraAttrs?: Record<string, string>
  style?: CSSProperties,
}
