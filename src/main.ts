import { IterativeDepthFirstSearch } from "./algorithms/idfs";
import { Maze } from "./algorithms/maze";
import { MAZE1 } from "./algorithms/maze";

const maze = new Maze(MAZE1);
const idfs = new IterativeDepthFirstSearch(maze, 7);

console.log(maze);
idfs.start()