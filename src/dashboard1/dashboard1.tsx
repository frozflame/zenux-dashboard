import React, {ReactNode} from "react";
import ReactDOM from "react-dom/client";
import "./styles.scss";

export interface MenuItemProps {
    text: string,
    href: string,
    icon?: ReactNode,
}


export interface DashboardProps {
    title: string,
    menuItems: MenuItemProps[],
    children: ReactNode,
}


function MenuItem(props: MenuItemProps) {
    const icon = props.icon || <span>&#128736;</span>;
    return <a href={props.href} title={props.text}
              className={window.location.pathname === props.href ? "active" : ""}>
        {icon}
        <div className="label hide-on-collapse">{props.text}</div>
    </a>
}


export function Dashboard1(props: DashboardProps) {
    return <div className="zenux-dashboard dashboard1">
        <div className="sidebar">
            <div className="sidebar-header hide-on-collapse">{props.title}</div>
            <div className="navitems">
                {props.menuItems.map((props, idx) => <MenuItem key={idx} {...props}/>)}
            </div>
        </div>

        <div className="pagewrap">
            <div className="sidebarspace"></div>
            <div className="mainwrap">
                {props.children}
            </div>
        </div>
    </div>
}


function _App(props: {title: string, menuItems: MenuItemProps[]}) {
    return (
        <div className="app">
            <Dashboard1 {...props}>
                <div>dashboard</div>
            </Dashboard1>
        </div>
    );
}

export function renderDashboard1(title: string, menuItems: MenuItemProps[]) {
    const rootElement = document.getElementById("root")!;
    const reactRoot = ReactDOM.createRoot(rootElement);
    reactRoot.render(<_App title={title} menuItems={menuItems}/>);
}
