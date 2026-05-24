import type ErrorInformation from "$lib/shared/errorLocation"
import type { Graph } from "@interactive-pseudo/graph"


type LocatedError = {
    type: 'located',
} & ErrorInformation

type GeneralError = {
    type: 'error',
    text: string,
    name: string,
}

type OtherError = {
    type: 'other',
    text: any
}

type Error = GeneralError | OtherError | LocatedError;

type LogMessage = {
    type: "log",
    message: string
}

type ErrorMessage = {
    type: "error",
    message: Error
}

type ResultMessage = {
    type: "result",
    finished: boolean
    message: string[][][]
}

type CodeMessage = {
    type: "code",
    message: string
}

type NextMessage = {
    type: "next"
}

type RunMessage = {
    type: "run"
}

type GraphMessage = {
    type: "graph",
    message: Graph
}

export type WorkerMessage = LogMessage | ErrorMessage | ResultMessage | GraphMessage;
export type FrontendMessage =  CodeMessage | NextMessage | RunMessage;
