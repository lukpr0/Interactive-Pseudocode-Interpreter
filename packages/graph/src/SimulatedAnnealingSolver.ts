import type { Graph } from "./Graph.js";
import type { Node } from "./Node.js";
import { Solver } from "./Solver.js";
import { Vector } from "./Vector.js";

export type SimulatedAnnealingConfig = {
    iterations: number;
    feather?: number;
    electric?: number;
    startTemp?: number;
    coolingRate?: number;
    stepSize?: number;

}

export class SimulatedAnnealingSolver extends Solver {

    config = {
        iterations: 1000,
        feather: 1,
        electric: 1,
        startTemp: 500,
        coolingRate: 0.99,
        stepSize: 1,

    };

    constructor(graph: Graph, config: SimulatedAnnealingConfig) {
        super(graph);
        this.config = { ...this.config, ...config };
        this.initRandom();
    }

    get(node: Node): Vector | undefined {
        return this.positions.get(node);
    }

    solve() {
        const newNodes = this.detectNewNodes();
        this.makeRandomPositions(newNodes);
        let best = this.positions;
        let Ebest = this.energy(best);
        let x = this.positions;
        for (let t = 0; t < this.config.iterations; t++) {
            const y = this.neighbour(x);
            let Ex = this.energy(x);
            const Ey = this.energy(y);
            const P = this.temp(Ex, Ey, t);
            const r = Math.random()
            if (Ey <= Ex || r < P) {
                x = y;
                Ex = Ey
            } 
            if (Ex < Ebest) {
                best = x;
                Ebest = Ex;
            }
        }
        this.positions = best;
    }

    neighbour(old: Map<Node, Vector>): Map<Node, Vector> {
        let newPositions = new Map();
        for (const entry of old) {
            let [node, position] = entry;
            let rx = (Math.random() - 1/2) * this.config.stepSize;
            let ry = (Math.random() - 1/2) * this.config.stepSize;
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
        for (const x of this.graph.nodes.values()) {
            for (const y of this.graph.nodes.values()) {
                if (x == y) continue;
                let fromPostion = nodes.get(x)!;
                let toPosition = nodes.get(y)!;
                We += 1/fromPostion.diff(toPosition).abs();
            }
        }
        return Wf * this.config.feather + We * this.config.electric;
    }

    temp(Ex: number, Ey: number, k: number): number {
        const T = this.config.startTemp * this.config.coolingRate ** k;
        const deltaE = Ey-Ex;
        const P = Math.E ** (-deltaE/T);
        return P;
    }
}