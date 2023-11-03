type Point = {
    x: number;
    y: number;
};

type No = {
    position: Point;
    cost: number;
};

const labirinto = [
    [2, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 3, 1, 1, 1, 1, 0, 0]
];

const labirinto2 = [
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 3, 1, 1, 0, 0]
];

const labirinto3 = [
    [0, 0, 0, 0, 3, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 1, 1, 0, 0]
]

const moves = [
    { x: 0, y: -1 },//baixo
    { x: -1, y: 0 },//esquerda
    { x: 1, y: 0 },//direita
    { x: 0, y: 1 }//cima
];

function ucs(start: Point, target: Point, grid: number[][]): Point[] | null {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue: No[] = [{ position: start, cost: 0 }];
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
    const previous: {[key: string]: Point | null} = {};

    while (queue.length) {
        queue.sort((a, b) => a.cost - b.cost);
        const current = queue.shift()!;
        if (current.position.x === target.x && current.position.y === target.y) {
            return reconstructPath(start, target, previous);
        }

        visited[current.position.y][current.position.x] = true;

        for (const move of moves) {
            const newX = current.position.x + move.x;
            const newY = current.position.y + move.y;

            if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && !visited[newY][newX] && grid[newY][newX] !== 0) {
                const cost = current.cost + 1; // Neste caso, o custo é 1 para cada movimento.
                queue.push({ position: { x: newX, y: newY }, cost: cost });
                previous[`${newX},${newY}`] = current.position;
            }
        }
    }

    return null;
}

function reconstructPath(start: Point, end: Point, previous: {[key: string]: Point | null}): Point[] {
    const path: Point[] = [];
    let current: Point | null = end;
    while (current !== start && current !== null) {
        path.push(current);
        current = previous[`${current.x},${current.y}`];
    }
    path.push(start);
    return path.reverse();
}

const start: Point = { x: 0, y: 0 };
const end: Point = { x: 3, y: 9 };
const path = ucs(start, end, labirinto);

if (path) {
    console.log('Path:', path);
} else {
    console.log('No path found');
}