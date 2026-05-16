import type { Edge } from "./Edge.js";
import type { Node } from "./Node.js";

export class Graph {
    nodes: Set<Node>;

    constructor(nodes: Node[]) {
        this.nodes = new Set(nodes);
    }

    *allEdges(): Generator<Edge> {
        for (const node of this.nodes) {
            yield* node.edges;
        }
    }

    addEdges(edges: Edge[]) {
        for (const edge of edges) {
            edge.from.edges.push(edge);
        }
    }
}
