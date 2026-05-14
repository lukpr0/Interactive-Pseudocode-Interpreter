import type { Node } from "./Node.js";

export class Edge {
    from: Node;
    to: Node;
    distance: number

    constructor(from: Node, to: Node, distance: number = 1) {
        this.from = from;
        this.to = to;
        this.distance = distance;
    }
}