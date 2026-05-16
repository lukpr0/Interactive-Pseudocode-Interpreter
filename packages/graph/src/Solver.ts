import type { Graph } from "./Graph.js";
import type { Node } from "./Node.js";
import { Vector } from "./Vector.js";

export abstract class Solver {

    graph: Graph;
    positions: Map<Node, Vector>;

    constructor(graph: Graph) {
        this.graph = graph;
        this.positions = new Map();
    }

    abstract solve(): void;

    rescale(width: number, height: number): Map<Node, Vector> {
        let xMin = Infinity;
        let xMax = -Infinity;
        let yMin = Infinity;
        let yMax = -Infinity;
        for (const position of this.positions.values()) {
            if (position.x > xMax) xMax = position.x;
            if (position.x < xMin) xMin = position.x;
            if (position.y > yMax) yMax = position.y;
            if (position.y < yMin) yMin = position.y;
        }
        let deltaX = xMax - xMin;
        let deltaY = yMax - yMin;
        let rescaled = new Map();
        for (const [node, vector] of this.positions) {
            const newX = (vector.x - xMin) / deltaX * width * 0.8 + width * 0.1;
            const newY = (vector.y - yMin) / deltaY * height * 0.8 + height * 0.1;
            const position = new Vector(newX, newY);
            rescaled.set(node, position);
        }
        return rescaled;
    }

    initCircle() {
        let i = 0;
        const N = this.graph.nodes.size;
        for (const node of this.graph.nodes) {
            const z = i/N * 2 * Math.PI;
            const position = new Vector(Math.sin(z), Math.cos(z));
            this.positions.set(node, position);
            i++;
        }
    }

    initRandom() {
        for (const node of this.graph.nodes) {
            const x = 2 * (Math.random() - 1/2);
            const y = 2 * (Math.random() - 1/2);
            const position = new Vector(x, y);
            this.positions.set(node, position);
        }
    }
}