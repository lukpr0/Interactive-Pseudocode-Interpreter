import type { Edge } from "./Edge.js";
import type { Node } from "./Node.js";

export class Graph {
    nodes: Set<Node>;

    constructor() {
        this.nodes = new Set();
    }

    *allEdges(): Generator<Edge> {
        for (const node of this.nodes) {
            yield* node.edges;
        }
    }
}
