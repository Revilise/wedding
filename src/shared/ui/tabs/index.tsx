import './tabs.pcss';

export { Tabs } from './ui/tabs';
// Public slice API includes both the component and its hooks.
// eslint-disable-next-line react-refresh/only-export-components
export { useTabs, useTabsContext } from './model';
export { TabsContext } from './config';
export type { ITabs, ITabsItem, ITabsContext, IUseTabs } from './config';
