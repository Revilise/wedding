import type { IComponent } from '@shared/types/component.ts';

export interface Iicon extends IComponent {
    /** Ссылка на символ в спрайте: путь к sprite.svg#id или только #id при инлайновом спрайте */
    src?: string;
    /** Имя иконки в спрайте (используется, если не передан src). Пример: "revilise" */
    name?: string;
}
