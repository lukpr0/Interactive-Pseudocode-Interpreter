import { Edge } from "./Edge.js";
import type { GraphConfig } from "./GraphConfig.js";
import { Node } from "./Node.js";

export class Graph {
    nodes: Map<string, Node>;

    constructor(nodes: Node[]) {
        this.nodes = new Map();
        for (const node of nodes) {
            const key = node.label;
            this.nodes.set(key, node);
        }
    }

    *allEdges(): Generator<Edge> {
        for (const node of this.nodes.values()) {
            yield* node.edges;
        }
    }

    addEdges(edges: Edge[]) {
        for (const edge of edges) {
            edge.from.edges.push(edge);
        }
    }

    findByLabel(label: string): Node | undefined {
        return this.nodes.values().find(node => node.label == label);
    }

    update(config: GraphConfig) {
        let newNodes = new Set(config.nodes);

        //add new nodes
        for (const node of config.nodes) {
            if (!this.nodes.has(node)) {
                const newNode = new Node(node);
                this.nodes.set(node, newNode)
                console.log("added node: ", node)
            }
        }
        
        //remove old nodes
        for (const node of this.nodes.keys()) {
            if (!config.nodes.find(configNode => configNode == node)) {
                console.log("removed node", node);
                this.nodes.delete(node);
            } else {
                console.log("kept node: ", node);
            } 
        }

        for (const node of this.nodes.values()) {
            node.edges = [];
        }

        for (const edge of config.edges) {
            const fromNode = this.nodes.get(edge.from)!;
            const toNode = this.nodes.get(edge.to)!;
            const newEdge = new Edge(fromNode, toNode, edge.distance);
            fromNode.edges.push(newEdge);
        }

    }

}
