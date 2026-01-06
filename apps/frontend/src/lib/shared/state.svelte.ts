import type { Slot } from "@interactive-pseudo/interpreter";
import type ErrorInformation from "./errorLocation";

export const shared: {
    code: string,
    vimMode: boolean,
    interpreterActive: boolean,
    debug: boolean,
    shareLink: string,
    displayedError: string,
    errorLocations: ErrorInformation[],
    variables: Map<string, Slot>,
    headers: boolean,
    markup: string,
    logs: string[],
    darkMode: boolean,

} = $state({
    code: "",
    vimMode: false,
    interpreterActive: true,
    debug: false,
    shareLink: "",
    displayedError: "",
    errorLocations: [],
    variables: new Map<string, Slot>(),
    headers: true,
    markup: "",
    logs: [],
    darkMode: false
})