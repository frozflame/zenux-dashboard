import {Action, Nav4, Nav4Props} from "../nav4/nav4";
import React, {CSSProperties} from "react";

export const nav4Props: Nav4Props = {
    exit: {
        href: "/",
        text: "Exit",
    },
    menu: {
        text: "MENU",
        actions: [
            {
                name: "Confirm",
                type: "",
                verb: "confirm",
            },
            {
                name: "Reject",
                type: "",
                verb: "reject",
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
    ],
    handleNav4Action: (a: Action) => {
        console.log("handleAction", a);
    },
}

interface nav4PageProps {
    nav4Props: Nav4Props;
    children: React.ReactNode;
}


export function Nav4Page(props: nav4PageProps) {
    const style: CSSProperties = {
        position: 'absolute',
        bottom: '0',
        left: '0'
    };
    return <div>
        <Nav4 {...props.nav4Props}/>
        <div style={style}>{props.children}</div>
    </div>
}