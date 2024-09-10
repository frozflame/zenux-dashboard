import React from "react";

export interface MenuItemProps {
    text: string;
    href?: string;
    icon?: React.ReactNode;
    items?: MenuItemProps[];
    onClick?: (event: React.MouseEvent) => void;
}

export interface MenuProps {
    items?: MenuItemProps[];
}

export function NonleafIndicator() {
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

export function MenuItem({ text, href, icon, items, onClick }: MenuItemProps) {
    let name: string = text;
    if (text.length > 16) {
        name = text.slice(0, 16) + "...";
    }

    const nonleafIndicator =
        items && items.length > 0 ? <NonleafIndicator /> : <></>;

    return (
        <li>
            <a href={href} title={text} onClick={onClick}>
                {icon} <span className="label">{name}</span>
                {nonleafIndicator}
            </a>
            <Menu items={items} />
        </li>
    );
}
