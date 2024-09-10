import React from "react";
import { Nav1 } from "./nav1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { MenuProps } from "../nav2/menu";

const demoIcon = <FontAwesomeIcon icon={faScrewdriverWrench} />;

const navItems = [
    {
        href: "/nav1/project",
        text: "Projects",
        icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
    },
    {
        href: "/nav1/user",
        text: "Users",
        icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
    },
];

const menuProps: MenuProps = {
    items: [
        {
            icon: demoIcon,
            text: "Alice",
            items: [
                {
                    icon: demoIcon,
                    text: "Reset Password",
                    href: "#",
                },
                {
                    icon: demoIcon,
                    text: "Logout",
                    href: "#",
                },
            ],
        },
    ],
};

export function Nav1Demo() {
    return (
        <div className="app">
            <Nav1 title="ZD" navItems={navItems} menuItems={menuProps} />
            <div>content</div>
        </div>
    );
}
