import { Node, Searchable } from "../commons/searchable";

export class AStar {
    private openNodes: Node[] = [];
    private closedNodes: Node[] = [];
    private cameFrom: Map<string, Node|null> = new Map();
    private gScore: Map<string, number> = new Map();
    private fScore: Map<string, number> = new Map();

    constructor(
        private readonly searchable: Searchable,
    ) { }

    getPath(): Node[] {
        const { initialNode, finalNode } = this.searchable;

        this.openNodes.push(initialNode);
        this.gScore.set(initialNode.toString(), 0);
        this.fScore.set(initialNode.toString(), this.searchable.getGlobalCost(initialNode, finalNode));

        while (this.openNodes.length > 0) {
            const current = this.getNodeWithLowestFScore();
            //// Descomente para ver o algoritmo explorando
            // this.searchable.printNode(current);
            // const start = new Date();
            // while (new Date().getTime() - start.getTime() < 500)
            //     ;
            if (current.toString() === finalNode.toString()) {
                return this.reconstructPath(current);
            }

            this.openNodes = this.openNodes.filter(node => node !== current);
            this.closedNodes.push(current);

            for (const neighbor of this.searchable.getNeighbors(current)) {
                if(this.closedNodes.find(n => n.toString() === neighbor.node.toString())) {
                    continue;
                }

                const tentativeGScore = this.gScore.get(current.toString()) + neighbor.cost;

                if (tentativeGScore < (this.gScore.get(neighbor.node.toString())) || Infinity) {
                    this.cameFrom.set(neighbor.node.toString(), current);
                    this.gScore.set(neighbor.node.toString(), tentativeGScore);
                    this.fScore.set(neighbor.node.toString(), tentativeGScore + this.searchable.getGlobalCost(neighbor.node, finalNode));

                    if(!this.openNodes.find(n => n.toString() === neighbor.node.toString())) {
                    // if(!this.openNodes.includes(neighbor.node)) {
                        this.openNodes.push(neighbor.node);
                    }
                }
            }
        }

        return [];
    }

    private getNodeWithLowestFScore(): Node {
        let lowestFScore = Infinity;
        let lowestNode: Node | null = null;

        for (const node of this.openNodes) {
            const fScore = this.fScore.get(node.toString()) || Infinity;
            if (fScore < lowestFScore) {
                lowestFScore = fScore;
                lowestNode = node;
            }
        }

        return lowestNode as Node;
    }

    private reconstructPath(current: Node): Node[] {
        const path: Node[] = [current];
        while (this.cameFrom.get(current.toString())) {
            current = this.cameFrom.get(current.toString()) as Node;
            path.unshift(current);
        }
        return path;
    }
}
