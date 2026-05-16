import type { Graph } from "./Graph.js";
import type { Node } from "./Node.js";
import { Solver } from "./Solver.js";
import { Vector } from "./Vector.js";

export class PhysicalSolver extends Solver {
    velocities: Map<Node, Vector>;
    accelerations: Map<Node, Vector>;

    electric = 1;
    feather = 1;
    deltaTime = 0.01;
    iterations = 1000;
    
    constructor(graph: Graph) {
        super(graph)
        this.velocities = new Map();
        this.accelerations = new Map();

        this.initCircle()
        for (const node of graph.nodes) {
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
            let acceleration = new Vector(0, 0);
            this.accelerations.set(node, acceleration)
        }
        //console.log("acc-new", this.accelerations.values().toArray());
        for (const [node, position] of this.positions) {
            for (const edge of node.edges) {
                let from = this.positions.get(edge.from)!;
                let to = this.positions.get(edge.to)!;
                let diff = to.diff(from);
                let direction = diff.dir();
                let displacement = diff.abs() - edge.distance;
                let accelerationFrom = this.accelerations.get(node)!.add(direction.mult(displacement));
                let accelerationTo = this.accelerations.get(edge.to)!.add(direction.mult(-displacement));
                this.accelerations.set(node, accelerationFrom);
                this.accelerations.set(edge.to, accelerationTo);
            }
        }
        //console.log("acc-feathers", this.accelerations.values().toArray());
        for (const [nodeX, positionX] of this.positions) {
            for (const [nodeY, positionY] of this.positions) {
                if (nodeX == nodeY) continue;
                let direction = positionX.diff(positionY);
                let length = direction.abs();
                let newDirection = direction.mult(this.electric/length**2)
                let oldAcceleration = this.accelerations.get(nodeX)!
                //console.log(direction, length, newDirection)
                this.accelerations.set(nodeX, oldAcceleration.add(newDirection));
            }
        }
        //console.log("acc-electric", this.accelerations.values().toArray());
        for (const [node, acceleration] of this.accelerations) {
            let oldVelocity = this.velocities.get(node)!;
            let velocityUpdate = acceleration.mult(this.deltaTime).mult(0.97);
            this.velocities.set(node, oldVelocity.add(velocityUpdate));
        }
        for (const [node, velocity] of this.velocities) {
            let oldPosition = this.positions.get(node)!;
            let positionUpdate = velocity.mult(this.deltaTime).mult(0.97);
            this.positions.set(node, oldPosition.add(positionUpdate));
        }
    }

    solve() {
        for (let i = 0; i < this.iterations; i++) {
            //console.log("pos", this.positions.values().toArray())
            //console.log("vel", this.velocities.values().toArray())
            //console.log("acc", this.accelerations.values().toArray())
            this.iteration()
        }
    }
    
}