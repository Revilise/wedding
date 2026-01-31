/**
 * Класс для фиксации/разфиксации скролла страницы.
 *
 * Предотвращает прокрутку body при открытии модалок, меню и других оверлеев.
 * Сохраняет текущую позицию скролла и восстанавливает её при разблокировке.
 *
 * @example
 * const scroll = new Scroll();
 * scroll.fix();     // Заблокировать скролл
 * scroll.unfix();   // Разблокировать
 * scroll.toggle(true);  // toggle с boolean
 */
class Scroll {
  /**
   * Текущая позиция скролла Y (пиксели).
   * Сохраняется при фиксации и используется для восстановления позиции.
   */
  scrollY = 0;

  /**
   * Фиксирует скролл: сохраняет позицию и блокирует прокрутку body.
   *
   * Устанавливает `overflow: hidden` на body и сохраняет `window.scrollY`.
   *
   * @example
   * scroll.fix(); // Скролл заблокирован на текущей позиции
   */
  fix() {
    this.scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
  }

  /**
   * Разблокирует скролл и восстанавливает сохранённую позицию.
   *
   * Снимает `overflow: hidden` с body и возвращает страницу на сохранённую позицию.
   *
   * @example
   * scroll.unfix(); // Скролл разблокирован, позиция восстановлена
   */
  unfix() {
    document.body.style.overflow = '';
    window.scrollTo(0, this.scrollY);
  }

  /**
   * Переключает состояние скролла в зависимости от значения.
   *
   * - `true` → вызывает `fix()`
   * - `false` → вызывает `unfix()`
   *
   * @param {boolean} value - true для фиксации, false для разблокировки
   *
   * @example
   * scroll.toggle(true);  // Заблокировать
   * scroll.toggle(false); // Разблокировать
   */
  toggle(value: boolean) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    value ? this.fix() : this.unfix();
  }
}

export default new Scroll();
