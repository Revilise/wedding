export type OnEventHandlers<T> = Pick<
   T,
   { [K in keyof T]: K extends `on${string}` ? K : never }[keyof T]
>;
