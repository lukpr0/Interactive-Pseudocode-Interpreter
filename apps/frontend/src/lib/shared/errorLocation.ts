import type { PseudoRuntimeError } from "@interactive-pseudo/interpreter";

export default interface ErrorInformation {
    line: number;
    start: number;
    stop: number;
    text: string;
    name: string;
}

export function tokenToErrorInformation(error: PseudoRuntimeError): ErrorInformation {
    return {
    line: error.location.line,
    start: error.location.from,
    stop: error.location.to,
    text: error.message,
    name: error.name,
}
}
