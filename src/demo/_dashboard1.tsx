import {Dashboard1, MenuItemProps} from "../dashboard1/dashboard1";
import React from "react";

export const menuItems: MenuItemProps[] = [
    {
        href: "/dashboard1/tasks",
        text: "Tasks",
        // icon: <SettingsIcon/>,
    },
    {
        href: "/dashboard1/analyses",
        text: "Anslyses",
        // icon: <SettingsIcon/>,
    },
    {
        href: "/dashboard1/reports",
        text: "Reports",
        // icon: <SettingsIcon/>,
    },
    {
        href: "/dashboard1/statistics",
        text: "Statistics",
        // icon: <SettingsIcon/>,
    },
    {
        href: "/dashboard1/settings",
        text: "Settings",
        // icon: <SettingsIcon/>,
    },
]

export function Dashboard1Demo() {
    return (
        <div className="app">
            <Dashboard1 menuItems={menuItems} title="Dashboard">
                <div>content</div>
            </Dashboard1>
        </div>
    )
}