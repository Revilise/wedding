import type { IPopoverObserver } from '../config/types';
import Scroll from '@lib/scroll';

type Actions = 'show' | 'hide';

/**
 * Реализует паттерн "наблюдатель" для управления состояниями popover'ов.
 * Позволяет подписывать функции на обновления, уведомлять по идентификатору или всех сразу.
 */
class Observer implements IPopoverObserver {
    collection = new Map<string, Set<(value: boolean) => void>>();
    opened = new Set<string>();

    constructor() {
        this.collection = new Map();
    }

    /**
     * Уведомляет подписчиков об изменении состояния.
     * id — уникальный идентификатор popover'а.
     * action — действие: "show" или "hide".
     */
    notify(id: string, action: Actions) {
        const callbacks = this.collection.get(id);
        if (!callbacks?.size) return;

        if (action === 'show') {
            this.opened.add(id);
            Scroll.fix();
            for (const cb of callbacks) {
                cb(true);
            }
        } else {
            this.opened.delete(id);
            Scroll.toggle(this.opened.size > 0);
            for (const cb of callbacks) {
                cb(false);
            }
        }
    }

    /**
     * Уведомляет всех подписчиков о действии сразу.
     * action — действие, применяемое ко всем подписчикам.
     */
    notifyAll(action: Actions) {
        const ids = [...this.collection.keys()];

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
        let set = this.collection.get(id);
        if (!set) {
            set = new Set();
            this.collection.set(id, set);
        }
        set.add(callback);
    }

    /**
     * Удаляет подписчика.
     * Если передан callback — снимает только его; иначе удаляет всех подписчиков для id.
     */
    unsubscribe(id: string, callback?: (value: boolean) => void) {
        const set = this.collection.get(id);
        if (!set) return;

        if (callback) {
            set.delete(callback);
            if (set.size === 0) {
                this.collection.delete(id);
            }
        } else {
            this.collection.delete(id);
        }
    }
}

export default new Observer();
