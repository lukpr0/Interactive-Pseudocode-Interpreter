import type { Edge } from "./Edge.js"

export class Node {
    edges: Edge[];

    constructor(edges: Edge[] = []) {
        this.edges = edges;
    }

}