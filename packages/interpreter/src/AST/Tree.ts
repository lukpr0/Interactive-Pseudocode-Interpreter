import type Visitor from "./Visitor.js";

export default interface Tree {
    accept<T>(visitor: Visitor<T>): T 
}