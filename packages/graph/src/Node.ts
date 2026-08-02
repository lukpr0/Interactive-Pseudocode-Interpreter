import type { Edge } from "./Edge.js"

export class Node {
    label: string;
    edges: Edge[];
    color: string | undefined;

    constructor(label: string, edges: Edge[] = []) {
        this.label = label;
        this.edges = edges;
    }

}