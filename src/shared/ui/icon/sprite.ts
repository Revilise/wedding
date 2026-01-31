/**
 * URL SVG-спрайта (файл в public/icons/sprite.svg).
 * Использование: <Icon src={getIconSrc('revilise')} /> или <Icon name="revilise" />.
 */
export const iconSpriteUrl = "/icons/sprite.svg";

/** Собирает ссылку на иконку из спрайта: `sprite.svg#id` */
export const getIconSrc = (id: string): string => `${iconSpriteUrl}#${id}`;
