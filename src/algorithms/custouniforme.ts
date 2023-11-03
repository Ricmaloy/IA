import { Search } from "../commons/search";
import { Neighbor, Node, Searchable } from "../commons/searchable";

function ucs(searchable: Searchable): [Node[] | null, number] {
    const start = searchable.initialNode;
    const target = searchable.finalNode;
    const queue: Neighbor[] = [{ node: start, cost: 0 }];
    const visited: Set<string> = new Set();
    const previous: Map<string, Node> = new Map();
    let visitedNodes = 0;

    while (queue.length) {
        visitedNodes++;
        queue.sort((a, b) => a.cost - b.cost);
        const current = queue.shift()!;
        if (current.node.toString() === target.toString()) {
            return [reconstructPath(start, target, previous), visitedNodes];
        }

        visited.add(current.node.toString());

        for (const neighbor of searchable.getNeighbors(current.node)) {
            if (visited.has(neighbor.node.toString())) {
                continue;
            }

            queue.push(neighbor);
            previous.set(neighbor.node.toString(), current.node);
        }
    }

    return [null, 0];
}

function reconstructPath(start: Node, end: Node, previous: Map<string, Node>): Node[] {
    const path: Node[] = [];
    let current: Node = end;
    while (current && current.toString() !== start.toString()) {
        path.push(current);
        current = previous.get(current.toString());
    }
    path.push(start);
    return path.reverse();
}

export class UniformCostSearch implements Search {
    private _visitedNodesCount: number;
    get visitedNodesCount(): number {
        return this._visitedNodesCount;
    }

    constructor(
        private readonly searchable: Searchable,
    ) { }

    getPath(): Node[] {
        const [path, visitedNodesCount] = ucs(this.searchable);
        this._visitedNodesCount = visitedNodesCount;
        return path;
    }
}
