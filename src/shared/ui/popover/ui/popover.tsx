import {type FC, useEffect, useState} from "react";
import { AnimatePresence, motion } from "motion/react"
import type {IPopover} from "../config/types.ts";
import {useBEM} from "@lib/bem";
import PopoverObserver from "../model/observer.ts";
import {createPortal} from "react-dom";
import {Button} from "@ui/button";
import {Icon} from "@ui/icon";
import {POPOVER} from "@shared/const";

export const Popover: FC<IPopover> = ({
  extraCN = {},
  utilCN,
  isOpen: defaultIsOpen = false,
  id,
  children,
}) => {
  const { bem } = useBEM("popover");
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  useEffect(() => {
    PopoverObserver.subscribe(id, (value: boolean) =>  setIsOpen(value));

    return function() {
      PopoverObserver.unsubscribe(id);
    }
  }, []);

  return createPortal(<AnimatePresence initial={false}>
    {isOpen && (
       <>
         <motion.div
            className={"popover-overlay"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
         />
         <motion.div
            id={id}
            className={bem("", {extraCN, utilCN})}
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0}}
         >
           <div className={bem("wrapper")}>
             <Button extraCN={{ isClosePopover: true }} extraAttrs={{ [POPOVER.HIDE]: id }}>
               <Icon name={"close"} />
             </Button>

             {children}
           </div>
         </motion.div>
       </>
    )}
  </AnimatePresence>, document.body);
}
