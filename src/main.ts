
import { IterativeDepthFirstSearch } from "./algorithms/idfs";
import { AStar } from "./algorithms/a-star";
import { MAZE1, Maze } from "./algorithms/maze";

const maze = new Maze(MAZE1);

const search = new AStar(maze);
const idfs = new IterativeDepthFirstSearch(maze, 3);
