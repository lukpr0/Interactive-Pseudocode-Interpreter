import { ErrorListener, RecognitionException, Recognizer, Token } from "antlr4";
import { PseudoSyntaxError } from "./pseudoSyntaxError";

export class PseudoParserErrorListener extends ErrorListener<Token> {
    constructor() {
        super()
        this.syntaxError = (recognizer: Recognizer<Token>, offendingSymbol: Token, line: number, column: number, msg: string, e: RecognitionException | undefined): void => {
            const location = {
                line,
                column,
                from: offendingSymbol.start,
                to: offendingSymbol.stop
            }
            throw new PseudoSyntaxError(`Syntax error: ${msg} at ${line}:${column}`, location)
        }
    }
}

export class PseudoLexerErrorListener extends ErrorListener<number> {
    constructor() {
        super()
        this.syntaxError = (recognizer: Recognizer<number>, offendingSymbol: number, line: number, column: number, msg: string, e: RecognitionException | undefined): void  => {
            const location = {
                line,
                column,
                from: offendingSymbol,
                to: offendingSymbol
            }
            throw new PseudoSyntaxError(`Unknown Token: ${msg} at ${line}:${column}`, location)
        }
    }
}