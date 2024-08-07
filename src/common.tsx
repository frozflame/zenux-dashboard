import React from "react";

interface IconProps {
    name?: string;
}

export function Icon({name}: IconProps) {
    if (!name) {
        return <i>&#x2708;</i>
    }
    if (name.startsWith('fa-')) {
        const className = `fa ${name}`;
        return <i className={className}></i>
    }
    return <i className={name}></i>
}

