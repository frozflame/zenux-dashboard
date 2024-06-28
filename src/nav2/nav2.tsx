import React, {ReactNode} from "react";
import {Icon} from "../common";
import "./styles/main.scss"

export interface MenuItemProps {
    text: string;
    href?: string;
    icon?: string;
    items?: MenuItemProps[];
}


export interface MenuProps {
    items?: MenuItemProps[];
}


export function MenuItem({text, href, icon, items}: MenuItemProps) {
    let name: string = text;
    if (text.length > 16) {
        name = text.slice(0, 16) + '...'
    }
    return <li>
        <a href={href} title={text}>
            <span>
                <Icon name={icon}/>
                {name}
            </span>
            <NonleafIndicator items={items}/></a>
        <Menu items={items}/>
    </li>
}

function NonleafIndicator({items}: MenuProps) {
    if (!items || items.length === 0) {
        return <></>
    }
    return <span className="nonleaf">{">"}</span>
}


export function Menu({items}: MenuProps) {
    if (!items || items.length === 0) {
        return <></>
    }
    const menuItems = items.map((item, idx) => {
        return <MenuItem {...item} key={idx}/>
    })
    return <ul>{menuItems}</ul>
}

export interface Nav2Props {
    items: MenuItemProps[],
    head: ReactNode;
    foot: ReactNode;
}


export function Nav2({items, head, foot}: Nav2Props) {
    return <nav className="zenux-dashboard-nav2">
        <div className="head">
            {head}
        </div>
        <Menu items={items}/>
        <div className="foot">
            {foot}
        </div>
    </nav>
}


interface Nav2DemoHeadProps {
    title: string;
    version: string;
    homepage: string;
}


function Nav2DemoHead({title, version, homepage}: Nav2DemoHeadProps) {
    return <a href={homepage} className="site_title">
        <span className="name">{title}</span>
        <span className="version">{version}</span>
    </a>
}

export interface Nav2DemoProps {
    head: Nav2DemoHeadProps;
    foot: MenuItemProps[];
    items: MenuItemProps[];
}


export function Nav2Demo(props: Nav2DemoProps) {
    const head = <Nav2DemoHead {...props.head}/>
    const foot = <Menu items={props.foot}/>
    return <Nav2 items={props.items} head={head} foot={foot}/>
}
