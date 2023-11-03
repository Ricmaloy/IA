
import { IterativeDepthFirstSearch } from "./algorithms/idfs";
import { AStar } from "./algorithms/a-star";
import { MAZE1, Maze, MazeNode } from "./algorithms/maze";
import { UniformCostSearch } from "./algorithms/custouniforme";

const maze = new Maze(MAZE1);

const astar = new AStar(maze);
const idfs = new IterativeDepthFirstSearch(maze, 100);
const ucs = new UniformCostSearch(maze);

[astar, idfs, ucs].forEach(search => {
    console.log(`Solução ${search.constructor.name}:`);
    const path = search.getPath();
    console.log(path.map(n => n.toString()).join('; '));
    maze.printSolution(path as MazeNode[]);
});
