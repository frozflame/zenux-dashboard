import React, { ReactNode } from "react";
import { joinClassNames } from "zenux";
import { Menu, MenuProps } from "./menu";
import "./styles/main.scss";

export interface Nav1NavItemProps {
    text: string;
    href: string;
    icon?: ReactNode;
}

function NavItem(props: Nav1NavItemProps) {
    const classNames = joinClassNames(
        "navitem",
        window.location.pathname === props.href ? "active" : "",
    );
    return (
        <div className="strip">
            <a href={props.href} title={props.text} className={classNames}>
                {props.icon}
                <span className="label hide-on-collapse">{props.text}</span>
            </a>
        </div>
    );
}

export interface Nav1Props {
    title: string;
    navItems: Nav1NavItemProps[];
    menuItems: MenuProps;
}

export function Nav1({ navItems, menuItems, title }: Nav1Props) {
    return (
        <div className="nav1-outer">
            <div className="nav1-inner">
                <div className="nav1-header">{title}</div>
                <div className="navitems">
                    {navItems.map((props, idx) => (
                        <NavItem key={idx} {...props} />
                    ))}
                </div>
                <div className="menuitems foot">
                    <Menu {...menuItems} />
                </div>
            </div>
        </div>
    );
}
