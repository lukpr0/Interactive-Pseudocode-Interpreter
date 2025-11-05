export default class Option<T> {
    private value: T | undefined

    private constructor(value: T | undefined) {
        this.value = value;
    }

    static from<T>(value: T): Option<T> {
        return new this(value);
    }

    static empty<T>(): Option<T> {
        return new this<T>(undefined);
    }

    unwrap(): T {
        if (this.value !== undefined) {
            return this.value
        } else throw new Error('Expected Option to have Value, but was empty')
    }

    map<N>(func: (val: T) => Option<N>): Option<N> {
        if (this.value !== undefined) {
            return func(this.value);
        } else {
            return Option.empty<N>();
        }
    }

    or(alternative: T): T {
        if (this.value !== undefined) {
            return this.value;
        } else {
            return alternative;
        }
    }
}

class MyNum {
    value: number;
    constructor(num: number) {
        this.value = num;
    }

    div(divisor: number): Option<number> {
        if (divisor != 0) {
            return Option.from(this.value/divisor);
        } else {
            return Option.empty()
        }
    }
}
