
export default interface Iterable<T> {
    hasNext(): boolean;
    next(): T;
}