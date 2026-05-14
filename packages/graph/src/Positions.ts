import type { Graph } from "./Graph.js";
import type { Node } from "./Node.js";
import { Vector } from "./Vector.js";

export class Positions {
    graph: Graph;
    positions: Map<Node, Vector>;

    constructor(graph: Graph) {
        this.graph = graph;
        this.positions = new Map();

        let i = 0;
        const N = graph.nodes.size;
        for (const node of graph.nodes) {
            const z = i/N * 2 * Math.PI;
            const position = new Vector(Math.sin(z), Math.cos(z));
            this.positions.set(node, position);
            i++;
        }
    }

    anneal() {
        let approx = this.positions;
        let fa = this.energy(approx);
        let x = this.positions;
        for (let t = 0; t < 1000; t++) {
            let y = this.neighbour(x)
            const fx = this.energy(x);
            const fy = this.energy(y);
            if (fy <= fx || this.temp(fx, fy, t) > Math.random()) {
                x = y;
            }  
            if (fx < fa) {
                approx = x;
                fa = fx;
            }
        }
    }

    neighbour(old: Map<Node, Vector>): Map<Node, Vector> {
        let newPositions = new Map();
        for (const entry of old) {
            let [node, position] = entry;
            let rx = Math.random()
            let ry = Math.random()
            let v = new Vector(rx, ry)
            newPositions.set(node, position.add(v))
        }
        return newPositions;
    }

    energy(nodes: Map<Node, Vector>): number {
        let Wf = 0;
        for (const edge of this.graph.allEdges()) {
            let fromPostion = nodes.get(edge.from)!;
            let toPosition = nodes.get(edge.to)!;
            Wf += (edge.distance - fromPostion.diff(toPosition).abs())**2;
        }
        let We = 0;
        for (const x of this.graph.nodes) {
            for (const y of this.graph.nodes) {
                if (x == y) continue;
                let fromPostion = nodes.get(x)!;
                let toPosition = nodes.get(y)!;
                We += 1/fromPostion.diff(toPosition).abs();
            }
        }
        return Wf + We;
    }

    temp(fx: number, fy: number, k: number): number {
        const T = 1000 - k;
        return Math.E ** (-(fx-fy)/T)
    }
}