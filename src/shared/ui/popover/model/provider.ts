import { type FC, useCallback, useEffect } from "react";
import type { IPopoverProvider } from "../config/types.ts";
import { POPOVER } from "@shared/const";
import PopoverObserver from "./observer.ts";

/**
 * Провайдер для централизованного управления состоянием popover'ов.
 *
 * Компонент:
 * - подписывается на глобальные события `click` и `keydown`;
 * - определяет, какой popover необходимо показать, скрыть или закрыть все сразу;
 * - взаимодействует с `PopoverObserver` для уведомления подписчиков о действии.
 *
 * Поведение:
 * - При клике на элемент с атрибутом `POPOVER.SHOW` — открывает соответствующий popover.
 * - При клике на элемент с атрибутом `POPOVER.HIDE` — скрывает соответствующий popover.
 * - При клике на элемент с классом `.popover` — скрывает все popover'ы.
 * - При нажатии клавиши `Escape` — скрывает все popover'ы.
 */
export const Provider: FC<IPopoverProvider> = ({ children }) => {
  /**
   * Обрабатывает клики по документу и определяет,
   * нужно ли показать, скрыть или закрыть все popover'ы.
   */
  const handleDocumentClick = useCallback((e: PointerEvent) => {
    const target = e.target as HTMLElement;

    const openId = target.getAttribute(POPOVER.SHOW);
    const hideId = target.getAttribute(POPOVER.HIDE);

    switch (true) {
      case !!openId: {
        return PopoverObserver.notify(openId, "show");
      }
      case !!hideId: {
        return PopoverObserver.notify(hideId, "hide");
      }
      case target.classList.contains("popover"): {
        return PopoverObserver.notifyAll("hide");
      }
    }
  }, []);

  /**
   * Обрабатывает клавиатурные события.
   * При нажатии клавиши `Escape` скрывает все активные popover'ы.
   */
  const handleDocumentKeydown = useCallback((e: KeyboardEvent) => {
    if (e.key.toLowerCase() === "escape") {
      PopoverObserver.notifyAll("hide");
    }
  }, []);

  /**
   * Добавляет глобальные слушатели событий при маунте
   * и удаляет их при анмаунте.
   */
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeydown);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeydown);
    };
  }, []);

  return children;
};
