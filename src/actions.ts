import {createContext} from "react";
import {Action} from "./types";

async function _performAction(action: Action) {
    console.log('_performAction: do nothing with', action);
}

export const ActionContext = createContext(_performAction);
