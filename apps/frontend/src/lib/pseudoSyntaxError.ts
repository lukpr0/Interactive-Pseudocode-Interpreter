import type { NodeLocation } from "@interactive-pseudo/interpreter";

export class PseudoSyntaxError extends Error {
    location: NodeLocation;

    constructor(message: string, location: NodeLocation) {
        super(message);
        this.name = 'PseudoSyntaxError';
        Object.setPrototypeOf(this, new.target.prototype);
        this.location = location;
    }
}