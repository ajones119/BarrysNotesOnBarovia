import React, { ReactNode } from 'react';
import css from "./Tabs.module.scss"
import { Spacer } from '../Spacer/Spacer';

export interface Tab {
    key: string,
    name: ReactNode,
    content: ReactNode
}

declare interface TabsProps {
    tabs: Array<Tab>,
    currentTab: string,
    onChange: (tabKey: string) => void
}

const Tabs = ({ tabs, currentTab, onChange }: TabsProps) => {

    const current = tabs.find((tab) => tab.key === currentTab);

    return (
        <div className={css.Tabs}>
            <div className={css.headerContainer}>
                <div className={css.header}>
                    { tabs?.map(tab => (
                        <div className={`${css.tab} ${tab.key === current?.key && css.active} `} onClick={() => onChange(tab.key)}>{tab.name}</div>
                    )) }
                </div>
            </div>
            <Spacer height={24} />
            <div className={css.content}>{current?.content}</div>
        </div>
    );
}

export default Tabs;