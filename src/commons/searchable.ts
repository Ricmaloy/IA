export interface Node {
    toString(): string;
}

export class Neighbor {
    private constructor(
        public readonly node: Node,
        public readonly cost: number,
    ) { }

    static of(node: Node, cost: number): Neighbor {
        return new Neighbor(node, cost);
    }
}

export interface Searchable {

    initialNode: Node;
    finalNode: Node;
    getNeighbors(src: Node): Neighbor[];
    getGlobalCost(src: Node, dst: Node): number;
    printNode(node: Node): void;
}
