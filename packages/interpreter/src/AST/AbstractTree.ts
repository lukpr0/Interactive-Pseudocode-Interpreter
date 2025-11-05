import { RuleNode, TerminalNode } from "antlr4";
import { PseudoParser } from "@interactive-pseudo/parser";


export default class AbstractSyntaxTree {
    token: RuleNode | TerminalNode;
    children: AbstractSyntaxTree[];

    constructor(token: RuleNode | TerminalNode) {
        this.token = token;
        this.children = [];
    }

    public addChild(ast: AbstractSyntaxTree): AbstractSyntaxTree {
        this.children.push(ast);
        return this;
    }

    public toString(): string {
        let token;
        if (this.token instanceof RuleNode) {
            const rule = (this.token as any).ruleContext.ruleIndex;
            token = PseudoParser.ruleNames[rule];
        } else if (this.token instanceof TerminalNode) {
            token = this.token.symbol.text;
        } else throw new Error()

        if (this.children.length > 0) {
            const children = this.children
                .map(child => child.toString())
                .join(' ')
            const treeString = `(${token} ${children})`;
            return treeString;
        } else {
            const treeString = `${token}`
            return treeString
        }

    }

}



export enum Rules {
    Program,
    Stat,
}