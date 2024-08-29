import "./demo.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {Nav4Page, nav4Props} from "./_nav4";
import {Dashboard1Demo} from "./_dashboard1";
import {Board} from "./app";


function DemoList() {
    return <nav>
        <ul>
            <li>
                <a href="/dashboard1">Dashboard1</a>
            </li>
            <li>
                <a href="/nav2">Nav2</a>
            </li>
            <li>
                <a href="/nav4/north">Nav4</a>
            </li>
            <li>
                <a href="/login">Login</a>
            </li>
        </ul>
    </nav>
}


export default function App() {
    switch (window.location.pathname) {
        case  "/":
            return <DemoList/>
        case "/board":
            return <Board/>
        case "/dashboard1":
            return <Dashboard1Demo/>
        case  "/dashboard1/tasks":
            return <p>tasks</p>
        case  "/dashboard1/analyses":
            return <p>analyses</p>
        case  "/dashboard1/reports":
            return <p>reports</p>
        case  "/dashboard1/statistics":
            return <p>statistics</p>
        case  "/dashboard1/settings":
            return <p>settings</p>
        case "/nav4/north":
            return <Nav4Page nav4Props={nav4Props}>North</Nav4Page>
        case "/nav4/south":
            return <Nav4Page nav4Props={nav4Props}>South</Nav4Page>
        case "/nav4/east":
            return <Nav4Page nav4Props={nav4Props}>East</Nav4Page>
        case "/nav4/west":
            return <Nav4Page nav4Props={nav4Props}>West</Nav4Page>
        default:
            return <div>wrong url</div>
    }
}


const rootElement = document.getElementById("root")!;
const reactRoot = ReactDOM.createRoot(rootElement);
reactRoot.render(<App/>);