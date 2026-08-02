type edge = {
    from: string,
    to: string,
    distance: number | undefined
}

export class GraphConfig {
    nodes: string[];
    edges: edge[];
    nodeColors: Map<string, string>;
    edgeColors: Map<string, string>;

    constructor() {
        this.nodes = [];
        this.edges = [];
        this.nodeColors = new Map();
        this.edgeColors = new Map();
    }

    addNode(node: string) {
        this.nodes.push(node);
    }

    addEdge(from: string, to: string, distance?: number) {
        this.edges.push({from, to, distance});
    }

    setNodeColor(node: string, color: string) {
        this.nodeColors.set(node, color);
    }

    setEdgeColor(from: string, to: string, color: string) {
        this.edgeColors.set(`${from}-${to}`, color);
    }
}