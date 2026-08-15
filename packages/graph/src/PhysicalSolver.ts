import type { Graph } from "./Graph.js";
import type { Node } from "./Node.js";
import { Solver } from "./Solver.js";
import { Vector } from "./Vector.js";

export type PhysicalConfig = {
    electric?: number,
    feather?: number
    deltaTime?: number
    iterations?: number
}

export class PhysicalSolver extends Solver {
    velocities: Map<Node, Vector>;
    accelerations: Map<Node, Vector>;

    config = {
        electric: 1,
        feather: 1,
        deltaTime: 0.01,
        iterations: 1000,
    }
    
    constructor(graph: Graph, config: PhysicalConfig) {
        super(graph)
        this.velocities = new Map();
        this.accelerations = new Map();

        this.config = { ...this.config, ...config };

        this.initCircle()
        for (const node of graph.nodes.values()) {
            const position = this.positions.get(node)!;
            const velocity = new Vector(0, 0);
            const acceleration = new Vector(0, 0);
            this.positions.set(node, position);
            this.velocities.set(node, velocity)
            this.accelerations.set(node, acceleration)
        }
    }

    iteration() {
        for (const node of this.accelerations.keys()) {
            const acceleration = new Vector(0, 0);
            this.accelerations.set(node, acceleration)
        }
        //console.log("acc-new", this.accelerations.values().toArray());
        for (const [node, _] of this.positions) {
            for (const edge of node.edges) {
                const from = this.positions.get(edge.from)!;
                const to = this.positions.get(edge.to)!;
                const diff = to.diff(from);
                const direction = diff.dir();
                const displacement = diff.abs() - edge.distance;
                const accelerationFrom = this.accelerations.get(node)!.add(direction.mult(displacement));
                const accelerationTo = this.accelerations.get(edge.to)!.add(direction.mult(-displacement));
                this.accelerations.set(node, accelerationFrom);
                this.accelerations.set(edge.to, accelerationTo);
            }
        }
        //console.log("acc-feathers", this.accelerations.values().toArray());
        for (const [nodeX, positionX] of this.positions) {
            for (const [nodeY, positionY] of this.positions) {
                if (nodeX == nodeY) continue;
                const direction = positionX.diff(positionY);
                const length = direction.abs();
                const newDirection = direction.mult(this.config.electric/length**2)
                const oldAcceleration = this.accelerations.get(nodeX)!
                //console.log(direction, length, newDirection)
                this.accelerations.set(nodeX, oldAcceleration.add(newDirection));
            }
        }
        //console.log("acc-electric", this.accelerations.values().toArray());
        for (const [node, acceleration] of this.accelerations) {
            const oldVelocity = this.velocities.get(node)!;
            const velocityUpdate = acceleration.mult(this.config.deltaTime).mult(0.97);
            this.velocities.set(node, oldVelocity.add(velocityUpdate));
        }
        for (const [node, velocity] of this.velocities) {
            const oldPosition = this.positions.get(node)!;
            const positionUpdate = velocity.mult(this.config.deltaTime).mult(0.97);
            this.positions.set(node, oldPosition.add(positionUpdate));
        }
    }
    solve() {
        const newNodes = this.detectNewNodes();
        this.makeRandomPositions(newNodes);
        for (const node of newNodes) {
            const position = this.positions.get(node)!;
            const velocity = new Vector(0, 0);
            const acceleration = new Vector(0, 0);
            this.positions.set(node, position);
            this.velocities.set(node, velocity)
            this.accelerations.set(node, acceleration)
        }

        for (let i = 0; i < this.config.iterations; i++) {
            //console.log("pos", this.positions.values().toArray())
            //console.log("vel", this.velocities.values().toArray())
            //console.log("acc", this.accelerations.values().toArray())
            this.iteration()
        }
    }
    
}