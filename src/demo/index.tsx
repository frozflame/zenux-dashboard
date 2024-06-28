import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import {Nav4Page, nav4Props} from "./_nav4";
import {Dashboard1Demo} from "./_dashboard1";
import {Nav2Demo, Nav2DemoProps} from "../nav2/nav2";
import nav2DemoProps from "./data_nav2.json";
import "./demo.css";

const _nav2DemoProps = nav2DemoProps as Nav2DemoProps;


function DemoList() {
    return <nav>
        <ul>
            <li>
                <Link to="/dashboard1">Dashboard1</Link>
            </li>
            <li>
                <Link to="/nav2">Nav2</Link>
            </li>
            <li>
                <Link to="/nav4/north">Nav4</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    </nav>
}


const router = createBrowserRouter([
    {
        path: "/",
        element: <DemoList/>,
    },
    {
        path: "/dashboard1",
        element: <Dashboard1Demo></Dashboard1Demo>,
        children: [
            {
                path: "/dashboard1/tasks",
                element: <p>tasks</p>,
            },
            {
                path: "/dashboard1/analyses",
                element: <p>analyses</p>,
            },
            {
                path: "/dashboard1/reports",
                element: <p>reports</p>,
            },
            {
                path: "/dashboard1/statistics",
                element: <p>statistics</p>,
            },
            {
                path: "/dashboard1/settings",
                element: <p>settings</p>,
            },
        ]
    },
    {
        path: "/nav2",
        element: <Nav2Demo {..._nav2DemoProps}/>
    },
    {
        path: "/nav4/north",
        element: <Nav4Page nav4Props={nav4Props}>North</Nav4Page>
    },
    {
        path: "/nav4/south",
        element: <Nav4Page nav4Props={nav4Props}>South</Nav4Page>
    },
    {
        path: "/nav4/east",
        element: <Nav4Page nav4Props={nav4Props}>East</Nav4Page>
    },
    {
        path: "/nav4/west",
        element: <Nav4Page nav4Props={nav4Props}>West</Nav4Page>
    },
]);


// const rootElement = document.getElementById("root");
// const reactRoot = ReactDOM.createRoot(rootElement);
export default function App() {
    return <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
}


const rootElement = document.getElementById("root")!;
const reactRoot = ReactDOM.createRoot(rootElement);
reactRoot.render(<App/>);