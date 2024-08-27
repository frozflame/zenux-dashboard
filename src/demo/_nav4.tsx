import React, {CSSProperties} from "react";
import {Action, Nav4, Nav4ActionContext, Nav4Props} from "../nav4/nav4";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleLeft, faScrewdriverWrench} from "@fortawesome/free-solid-svg-icons";


export const nav4Props: Nav4Props = {
    exit: {
        href: "/",
        icon: <FontAwesomeIcon icon={faCircleLeft}/>,
        text: "Exit",
    },
    menu: {
        text: "MENU",
        icon: <FontAwesomeIcon icon={faScrewdriverWrench}/>,
        actions: [
            {
                name: "confirm",
                params: [],
                title: "Confirm",
                zone: "api",
            },
            {
                name: "reject",
                params: [],
                title: "Reject",
                zone: "api",
            }
        ],
    },
    title: "Review",
    trunk: [
        {
            chapter: "north",
            href: "/nav4/north",
            title: "North",
        },
        {
            chapter: "south",
            href: "/nav4/south",
            title: "South",
        },
        {
            chapter: "east",
            href: "/nav4/east",
            title: "East",
        },
        {
            chapter: "west",
            href: "/nav4/west",
            title: "West",
        }
    ]
}

interface nav4PageProps {
    nav4Props: Nav4Props;
    children: React.ReactNode;
}

async function performAction(action: Action) {
    console.log('performAction', action);
}


export function Nav4Page(props: nav4PageProps) {
    const style: CSSProperties = {
        position: 'absolute',
        bottom: '0',
        left: '0'
    };
    return <div>
        <Nav4ActionContext.Provider value={performAction}>
            <Nav4 {...props.nav4Props}/>
        </Nav4ActionContext.Provider>
        <div style={style}>{props.children}</div>
    </div>
}
