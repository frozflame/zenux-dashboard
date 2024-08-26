import React, {ReactNode} from "react";
import "./nav4.scss";


interface Nav4ExitProps {
    icon?: ReactNode;
    text: string;
    href: string;
}


export interface Action {
    name: string;
    params: any;
    title: string;
    zone: string;
}

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
    handleNav4Action?: (action: Action) => void;
}


interface MenuItemProps {
    action: Action,
    handleNav4Action?: (action: Action) => void;
}

declare global {
    interface Window {
        handleNav4Action?: (action: Action) => void;
    }
}

function _handleNav4Action(action: Action) {
    console.log('_handleNav4Action:', action);
}

function MenuItem(props: MenuItemProps) {
    function handleClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        event.stopPropagation();
        let handleNav4Action;
        if (props.handleNav4Action) {
            handleNav4Action = props.handleNav4Action;
        } else if (window.handleNav4Action) {
            handleNav4Action = window.handleNav4Action;
        } else {
            handleNav4Action = _handleNav4Action;
        }
        handleNav4Action(props.action);
    }

    return <a href="#" onClick={handleClick}>{props.action.title}</a>
}


interface Nav4TrunkItemProps {
    chapter: string;
    href: string;
    title: string;
    target?: string;
}


function Nav4TrunkItem(props: Nav4TrunkItemProps) {
    const targetUrl = new URL(props.href, window.location.origin);
    const className = targetUrl.pathname === window.location.pathname ? "active" : "";
    return <a href={props.href} target={props.target} className={className}>{props.title}</a>
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
            <MenuItem key={idx} action={action} handleNav4Action={props.handleNav4Action}/>
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
