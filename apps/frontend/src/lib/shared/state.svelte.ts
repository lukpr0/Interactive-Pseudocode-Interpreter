import type { Slot } from "@interactive-pseudo/interpreter";
import type ErrorInformation from "./errorLocation";

export const shared: {
    code: string,
    vimMode: boolean,
    interpreterActive: boolean,
    interpreterFinished: boolean,
    debug: boolean,
    shareLink: string,
    displayedError: string,
    errorLocations: ErrorInformation[],
    variables: Map<string, Slot>,
    headers: boolean,
    markup: string,
    logs: string[],
    darkMode: boolean,
    stepDuration: number
} = $state({
    code: "",
    vimMode: false,
    interpreterActive: true,
    interpreterFinished: false,
    debug: false,
    shareLink: "",
    displayedError: "",
    errorLocations: [],
    variables: new Map<string, Slot>(),
    headers: true,
    markup: "",
    logs: [],
    darkMode: false,
    stepDuration: 0
})