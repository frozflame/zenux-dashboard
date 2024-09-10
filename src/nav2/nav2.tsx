import React, { ReactNode } from "react";
import "./styles/main.scss";
import { Menu, MenuItemProps } from "./menu";

export interface Nav2Props {
    items: MenuItemProps[];
    head: ReactNode;
    foot: ReactNode;
}

export function Nav2({ items, head, foot }: Nav2Props) {
    return (
        <nav className="zenux-dashboard-nav2">
            <div className="head">{head}</div>
            <Menu items={items} />
            <div className="foot">{foot}</div>
        </nav>
    );
}

interface Nav2DemoHeadProps {
    title: string;
    version: string;
    homepage: string;
}

function Nav2DemoHead({ title, version, homepage }: Nav2DemoHeadProps) {
    return (
        <a href={homepage} className="site_title">
            <span className="name">{title}</span>
            <span className="version">{version}</span>
        </a>
    );
}

export interface Nav2DemoProps {
    head: Nav2DemoHeadProps;
    foot: MenuItemProps[];
    items: MenuItemProps[];
}

export function Nav2Demo(props: Nav2DemoProps) {
    const head = <Nav2DemoHead {...props.head} />;
    const foot = <Menu items={props.foot} />;
    return <Nav2 items={props.items} head={head} foot={foot} />;
}
