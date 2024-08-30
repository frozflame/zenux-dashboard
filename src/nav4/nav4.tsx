import React, {ReactNode, useContext} from "react";
import {NavLink} from "react-router-dom";
import {Action} from "../types";
import {ActionContext} from "../actions";
import "./nav4.scss";


interface Nav4ExitProps {
    icon?: ReactNode;
    text: string;
    href: string;
}

export const Nav4ActionContext = ActionContext;


interface Nav4MenuProps {
    icon?: ReactNode;
    text: string;
    actions: Action[];
}


export interface Nav4Props {
    exit: Nav4ExitProps;
    menu: Nav4MenuProps;
    title: string;
    trunk: Nav4TrunkItemProps[];
}


interface MenuItemProps {
    action: Action,
}

function MenuItem(props: MenuItemProps) {
    const {title, params, zone} = props.action;
    const performAction = useContext(ActionContext);

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        event.stopPropagation();
        performAction(props.action).catch(console.error);
    }

    if (zone === "link") {
        return <a href={params[0]} target={params[1]}>{title}</a>
    }
    return <a href="#" onClick={handleClick}>{title}</a>
}


interface Nav4TrunkItemProps {
    chapter: string;
    href: string;
    title: string;
    target?: string;
    clientSideRouting?: boolean;
}


function Nav4TrunkItem(props: Nav4TrunkItemProps) {
    if (props.clientSideRouting) {
        const className = ({isActive}: {isActive: boolean}) => isActive ? "active" : "";
        // return <NavLink to={props.href} target={props.target} className={className} preventScrollReset={true}>{props.title}</NavLink>;
        return <NavLink to={props.href} target={props.target} className={className}>{props.title}</NavLink>;
    } else {
        const targetUrl = new URL(props.href, window.location.origin);
        const className = targetUrl.pathname === window.location.pathname ? "active" : "";
        return <a href={props.href} target={props.target} className={className}>{props.title}</a>
    }
}


export function Nav4Trunk(props: Nav4Props) {
    let navElements = props.trunk.map(
        (itemProps, idx) => <Nav4TrunkItem key={idx} {...itemProps}></Nav4TrunkItem>
    );
    return <div className="nav4-trunk">
        <a className="title">{props.title}</a>
        {navElements}
    </div>
}

export function Nav4Menu(props: Nav4Props) {
    const {text, actions} = props.menu;
    let actionElements = actions.map(
        (action, idx) =>
            <MenuItem key={idx} action={action}/>
    );
    return <div className="dropdown">
        <a className="broad" href="#">{text}
            <span className="icon">{props.menu.icon}</span>
        </a>
        <div className="dropdown-content">
            {actionElements}
        </div>
    </div>
}


export function Nav4(props: Nav4Props) {
    return <div className="zenux-dashboard nav4">
        <div className="nav4-container">
            <div className="left side">
                <a className="broad" href={props.exit.href}>
                    <span className="icon">{props.exit.icon}</span>
                    {props.exit.text}
                </a>
            </div>
            <div className="middle">
                <Nav4Trunk {...props}/>
            </div>

            <div className="right side">
                <Nav4Menu {...props}/>
            </div>
        </div>
    </div>
}
