import type { Graph } from "@interactive-pseudo/graph";
import type ErrorInformation from "./errorLocation";
import { InterpreterState } from "./interpreterState";

export const shared: {
    code: string,
    vimMode: boolean,
    autorun: boolean,
    interpreterState: InterpreterState,
    debug: boolean,
    shareLink: string,
    displayedError: string,
    errorLocations: ErrorInformation[],
    variables: string[][][],
    headers: boolean,
    markup: string,
    logs: string[],
    darkMode: boolean,
    stepDuration: number,
    graph: Graph | undefined,
    updateGraph: () => void;
} = $state({
    code: "",
    vimMode: false,
    autorun: true,
    interpreterState: InterpreterState.READY,
    debug: false,
    shareLink: "",
    displayedError: "",
    errorLocations: [],
    variables: [],
    headers: true,
    markup: "",
    logs: [],
    darkMode: false,
    stepDuration: 0,
    graph: undefined,
    updateGraph: () => {}
})