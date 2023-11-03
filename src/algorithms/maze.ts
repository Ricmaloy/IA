import { Neighbor, Node, Searchable } from "../commons/searchable";

export class MazeNode implements Node {
    constructor(
        public readonly value: number,
        public readonly row: number,
        public readonly column: number,
    ) { }

    toString(): string {
        return `(${this.row}, ${this.column})`;
    }
}

export const MAZE1 = `
#@#######
# #     #
# # # ###
#   # # #
### # # #
#   #   #
##### # #
#     # #
##X######`;

const charMap = {
    ' ': 0,
    '#': 1,
    '@': 2,
    'X': 3,
};

export class Maze implements Searchable {
    private readonly matrix: number[][];
    private width: number;
    private height: number;
    public initialNode: MazeNode;
    public finalNode: MazeNode;

    constructor(data: string) {
        this.matrix = data
            .trim()
            .split('\n')
            .map(l => l.split('')
                       .map(v => charMap[v] ?? -1));

        this.height = this.matrix.length;
        this.width = this.matrix[0]?.length ?? 0;

        this.forEachCell((row: number, col: number, value: number) => {
            if(value === 2) {
                this.initialNode = this.getNode(row, col);
            }

            if(value === 3) {
                this.finalNode = this.getNode(row, col);
            }
        });
    }

    getNeighbors(src: MazeNode): Neighbor[] {
        return [
            this.getNode(src.row - 1, src.column),
            this.getNode(src.row + 1, src.column),
            this.getNode(src.row, src.column - 1),
            this.getNode(src.row, src.column + 1),
        ].filter(Boolean)
         .filter(n => this.matrix[n.row][n.column] !== 1)
         .map(n => Neighbor.of(n, 1));
    }

    getGlobalCost(src: MazeNode, dst: MazeNode): number {
        const deltaXSq = (src.column - dst.column)**2;
        const deltaYSq = (src.row - dst.row)**2;
        return Math.sqrt(deltaXSq + deltaYSq);
    }

    private getNode(row: number, col: number): MazeNode | null {
        if(row < 0 || col < 0) {
            return null;
        }

        if(row >= this.height || col >= this.width) {
            return null;
        }

        return new MazeNode(this.matrix[row][col], row, col);
    }

    private forEachCell(fn: (row: number, col: number, value: number) => void): void {
        for(const [rowNum, cols] of this.matrix.entries()) {
            for(const [colNum, value] of cols.entries()) {
                fn(rowNum, colNum, value);
            }
        }
    }

    printNode(node: MazeNode): void {
        let getChar = (row: number, col: number, value: number) => {
            if(row === node.row && col === node.column) {
                return 'X';
            }

            if(value === 1) {
                return '#';
            }

            return ' ';
        }
        const maze = this.matrix.map((l, i) =>
            l.map((c, j) => getChar(i, j, c)).join('')).join('\n');

        console.log(maze, '\n\n\n');
    }
}
