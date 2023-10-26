import { MAZE1, Maze } from "./algorithms/maze";

const maze = new Maze(MAZE1);
console.log(maze.getNeighbors(maze.initialNode));

console.log(maze.getGlobalCost(maze.initialNode, maze['getNode'](0, 0)));
