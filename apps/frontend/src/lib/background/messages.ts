import type ErrorInformation from "$lib/shared/errorLocation"


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
    message: string[][]
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

export type WorkerMessage = LogMessage | ErrorMessage | ResultMessage;
export type FrontendMessage =  CodeMessage | NextMessage | RunMessage;
