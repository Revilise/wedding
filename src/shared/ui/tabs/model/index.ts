import { useContext, useState } from 'react';
import { ctx } from '../config';
import type { IUseTabs } from '../config';

export const useTabs = ({ activeTab = 0 }: IUseTabs = {}) => {
    const [currentTab, setActiveTab] = useState(activeTab);
    const [previousTab, setPreviousTab] = useState(activeTab);

    if (previousTab !== activeTab) {
        setPreviousTab(activeTab);
        setActiveTab(activeTab);
    }

    return { activeTab: currentTab, setActiveTab };
};

export const useTabsContext = () => {
    const context = useContext(ctx);

    if (!context) {
        throw new Error('useTabsContext must be used within Tabs');
    }

    return context;
};
