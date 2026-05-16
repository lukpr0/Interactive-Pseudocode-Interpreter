import type { Graph } from "./Graph.js";
import type { Node } from "./Node.js";
import { Solver } from "./Solver.js";
import { Vector } from "./Vector.js";

export class SimulatedAnnealingSolver extends Solver {

    iterations = 1000;
    feather = 1;
    electric = 1;
    startTemp = 500;
    coolingRate = 0.99;
    stepSize = 1;

    constructor(graph: Graph) {
        super(graph);
        this.initCircle()
    }

    get(node: Node): Vector | undefined {
        return this.positions.get(node);
    }

    solve() {
        let approx = this.positions;
        let fa = this.energy(approx);
        let x = this.positions;
        //console.log("start energy", fa);
        let acceptWorseCounter = 0;
        let betterCounter = 0;
        for (let t = 0; t < this.iterations; t++) {
            let y = this.neighbour(x);
            const fx = this.energy(x);
            const fy = this.energy(y);
            let tmp = this.temp(fx, fy, t);
            let r = Math.random()
            if (t % 100 == 99) {
                //console.log("acceptance worse", acceptWorseCounter/t*100, "improve", betterCounter/t*100)
                acceptWorseCounter = 0;
                betterCounter = 0;
            }
            if (fy <= fx || tmp > r) {
                if (tmp > r) acceptWorseCounter++;
                x = y;
            }  
            if (fx < fa) {
                approx = x;
                fa = fx;
                betterCounter++;
            }
        }
        //console.log("end energy", fa);
        this.positions = approx;
    }

    neighbour(old: Map<Node, Vector>): Map<Node, Vector> {
        let newPositions = new Map();
        for (const entry of old) {
            let [node, position] = entry;
            let rx = (Math.random() - 1/2) * this.stepSize;
            let ry = (Math.random() - 1/2) * this.stepSize;
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
        return Wf * this.feather + We * this.electric;
    }

    temp(fx: number, fy: number, k: number): number {
        const T = this.startTemp * this.coolingRate ** k;
        return Math.E ** (-(fy-fx)/T)
    }
}