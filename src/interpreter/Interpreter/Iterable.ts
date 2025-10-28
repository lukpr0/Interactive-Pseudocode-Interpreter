
export interface Iterable<T> {
    hasNext(): boolean;
    next(): T;
}