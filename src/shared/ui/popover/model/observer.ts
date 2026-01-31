import type { IPopoverObserver } from "@ui/popover/config/types.ts";
import Scroll from "@lib/scroll";

type Actions = "show" | "hide";

/**
 * Реализует паттерн "наблюдатель" для управления состояниями popover'ов.
 * Позволяет подписывать функции на обновления, уведомлять по идентификатору или всех сразу.
 */
class Observer implements IPopoverObserver {
  collection = new Map<string, (value: boolean) => void>();
  opened = new Set();

  constructor() {
    this.collection = new Map();
  }

  /**
   * Уведомляет одного подписчика об изменении состояния.
   * id — уникальный идентификатор popover'а.
   * action — действие: "show" или "hide".
   */
  notify(id: string, action: Actions) {
    const callback = this.collection.get(id);

    if (typeof callback === "function") {
      if (action === "show") {
        this.opened.add(id);
        Scroll.fix();
        callback(true);
      }
      else {
        this.opened.delete(id);
        Scroll.toggle(this.opened.size > 0);
        callback(false);
      }
    }
  }

  /**
   * Уведомляет всех подписчиков о действии сразу.
   * action — действие, применяемое ко всем подписчикам.
   */
  notifyAll(action: Actions) {
    const ids = this.collection.keys();

    for (const id of ids) {
      this.notify(id, action);
    }
  }

  /**
   * Добавляет нового подписчика.
   * id — идентификатор popover'а.
   * callback — функция, вызываемая при уведомлении.
   */
  subscribe(id: string, callback: (value: boolean) => void) {
    this.collection.set(id, callback);
  }

  /**
   * Удаляет подписчика по его id.
   * id — идентификатор popover'а, который нужно удалить из коллекции.
   */
  unsubscribe(id: string) {
    this.collection.delete(id);
  }
}

export default new Observer();
