import React, { useEffect, useState } from "react";
import {
    defaultCellComponentMap,
    Grid,
    GridOptions,
    QueryParams,
} from "zenux-grid";
import nav2DemoProps from "./nav2.json";

import { APIKit, Notificator } from "../api";
import { Action } from "../types";
import "zenux-grid/dist/esm/styles.css";
import { Nav2Demo } from "../nav2/nav2";

interface BreadcrumbProps {
    actions: Action[];
}

function getCurrentChapter() {
    return "analysis";
}

function Breadcrumb({ actions }: BreadcrumbProps) {
    const chapter = getCurrentChapter();
    if (!chapter) {
        return <></>;
    }
    return (
        <div className="breadcrumb">
            <div>analysis</div>
            {/*<div>{chapter.text}</div>*/}
            <div>
                {
                    // actions.map((action, idx) => {
                    //     return <Button action={action} key={idx}/>
                    // })
                }
            </div>
        </div>
    );
}

interface GridBoardProps {
    subject: string;
}

const api = new APIKit(new Notificator());
const gridOptions: GridOptions = {
    withPageWidgets: true,
    withSearchForm: true,
    withSelectionButtons: true,
    withStickyEndColumns: false,
};

const cellComponentMap = {
    ...defaultCellComponentMap,
    // actions: ButtonGroup,
    // status: Status,
    // yesno: YesNo,
};

export function GridBoard({ subject }: GridBoardProps) {
    const [columns, setColumns] = useState([]);
    const [actions, setActions] = useState([]);
    useEffect(() => {
        api.loadData(`/api/meta/${subject}`).then((data) => {
            setColumns(data.columns);
            setActions(data.actions);
        });
    }, []);
    if (!columns) {
        return <div>no columns</div>;
    }

    function _queryPageData(_queryParams: QueryParams) {
        return api.queryPageData(subject, _queryParams);
    }

    return (
        <>
            <Breadcrumb actions={actions} />
            <Grid
                ccm={cellComponentMap}
                columns={columns}
                options={gridOptions}
                queryPageData={_queryPageData}
            />
        </>
    );
}

export function Sidebar() {
    return <Nav2Demo {...nav2DemoProps} />;
}

export function Board() {
    return (
        <div className="body-content">
            <div className="left"></div>
            <div className="right" id="web-container">
                <div className="app">
                    <Sidebar />
                    <div className="pagewrap">
                        <div className="mainwrap">
                            <GridBoard subject="analysis" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
