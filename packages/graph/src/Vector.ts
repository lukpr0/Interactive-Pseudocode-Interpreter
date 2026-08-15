
export class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(other: Vector): Vector {
        return new Vector(this.x+other.x, this.y+other.y);
    }
    
    diff(other: Vector): Vector {
        return new Vector(this.x-other.x, this.y-other.y);
    }

    mult(factor: number): Vector {
        return new Vector(this.x*factor, this.y*factor);
    }

    abs(): number {
        return Math.sqrt(this.x**2 + this.y ** 2);
    }

    dir(): Vector {
        return this.mult(1/this.abs())
    }
}