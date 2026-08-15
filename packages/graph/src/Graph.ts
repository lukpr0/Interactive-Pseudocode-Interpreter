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

    update(config: GraphConfig): boolean {
        let hasChanges = false;
        //add new nodes
        for (const node of config.nodes) {
            if (!this.nodes.has(node)) {
                const newNode = new Node(node);
                this.nodes.set(node, newNode)
                hasChanges = true;
            }
        }
        
        //remove old nodes
        for (const node of this.nodes.keys()) {
            if (!config.nodes.find(configNode => configNode == node)) {
                this.nodes.delete(node);
                hasChanges = true;
            }  
       }

        const oldEdges = new Set();
        for (const node of this.nodes.values()) {
            for (const edge of node.edges) {
                oldEdges.add(`${edge.from.label}-${edge.to.label}`);
            }
            node.edges = [];
        }

        for (const edge of config.edges) {
            const fromNode = this.nodes.get(edge.from)!;
            const toNode = this.nodes.get(edge.to)!;
            const newEdge = new Edge(fromNode, toNode, edge.distance);
            if (oldEdges.has(`${edge.from}-${edge.to}`)) {
                oldEdges.delete(`${edge.from}-${edge.to}`);
            } else {
                hasChanges = true;
            }
            fromNode.edges.push(newEdge);
        }
        
        for (const node of this.nodes.values()) {
            node.color = undefined;
        }

        for (const edge of this.allEdges()) {
            edge.color = undefined; 
        }

        for (const [nodeLabel, color] of config.nodeColors) {
            const node = this.nodes.get(nodeLabel)!;
            node.color = color;
        }

        for (const edge of this.allEdges()) {
            edge.color = config.getEdgeColor(edge.from.label, edge.to.label);
        }

        return hasChanges;

    }

}
