import React from "react";
import { Icon } from "../common";

export interface MenuItemProps {
    text: string;
    href?: string;
    icon?: string | React.ReactNode;
    items?: MenuItemProps[];
}

export interface MenuProps {
    items?: MenuItemProps[];
}

export function NonleafIndicator({ items }: MenuProps) {
    if (!items || items.length === 0) {
        return <></>;
    }
    return <span className="nonleaf">{">"}</span>;
}

export function Menu({ items }: MenuProps) {
    if (!items || items.length === 0) {
        return <></>;
    }
    const menuItems = items.map((item, idx) => {
        return <MenuItem {...item} key={idx} />;
    });
    return <ul>{menuItems}</ul>;
}

export function MenuItem({ text, href, icon, items }: MenuItemProps) {
    let name: string = text;
    if (text.length > 16) {
        name = text.slice(0, 16) + "...";
    }
    let iconElement: React.ReactNode;
    if (typeof icon === "string") {
        iconElement = <Icon name={icon} />;
    } else {
        iconElement = icon;
    }
    return (
        <li>
            <a href={href} title={text}>
                <span>
                    {iconElement}
                    {name}
                </span>
                <NonleafIndicator items={items} />
            </a>
            <Menu items={items} />
        </li>
    );
}
