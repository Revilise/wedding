import PopoverObserver from "../model/observer.ts";

export const usePopover = (id: string) => {
  return {
    close() {
      return PopoverObserver.notify(id, "hide")
    }
  }
}
