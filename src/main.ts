import { IterativeDepthFirstSearch } from "./algorithms/maze/idfs";
import { Maze } from "./algorithms/maze/maze";
import { MAZE1, MAZE2, MAZE3 } from "./algorithms/maze/utils";

const maze = new Maze(MAZE2);
const idfs = new IterativeDepthFirstSearch(maze, 3);

console.log(maze);
idfs.start()