export interface IMasonryFlow {
    /** URL картинок по порядку */
    images: readonly string[];
    /** Подписи к `alt`; по умолчанию нейтральная формулировка */
    getAlt?: (index: number) => string;
    columnsCountBreakPoints?: Record<number, number>;
    gutterBreakPoints?: Record<number, string>;
    /** Доп. класс на корневой контейнер */
    className?: string;
}
