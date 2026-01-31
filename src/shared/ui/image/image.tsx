import {useBEM} from "@lib/bem";
import type {IImage} from "@ui/image/types.ts";
import type {FC} from "react";

export const Image: FC<IImage> = ({
  extraCN,
  utilCN,
  src,
  alt = "",
}) => {
  const { bem } = useBEM("image")

  return (
     <div className={bem("", { extraCN, utilCN })}>
       <img src={src} alt={alt} decoding={"async"} />
     </div>
  )
}
