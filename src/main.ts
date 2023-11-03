
import { IterativeDepthFirstSearch } from "./algorithms/idfs";
import { AStar } from "./algorithms/a-star";
import { Maze, MazeNode } from "./algorithms/maze";
import { UniformCostSearch } from "./algorithms/custouniforme";

const MAZE_1 = `
#@#######
# #     #
# # # ###
#   # # #
### # # #
#   #   #
##### # #
#     # #
##X######`;

const MAZE_2 = `
#############################@#
#     #  #     #        #  #  #
#  #  #  #  #  #######  ####  #
#  #  #     #     #        #  #
#  #  #######  ####  #######  #
#     #  #  #  #  #        #  #
####  #  #  #  #  #  ####  #  #
#     #     #        #        #
#  #  #  #  #############  #  #
#  #  #  #  #     #  #     #  #
#  #  #  ####  ####  #  #######
#  #  #  #  #  #              #
####  #  #  #  ##########  #  #
#        #  #  #     #  #  #  #
#  ####  #  #  ####  #  #  ####
#     #  #     #        #     #
#  ####  ####  ####  #######  #
#  #           #        #     #
#  ##########  #######  #  #  #
#        #                 #  #
#############################X#
`;

const MAZE_3 = `
#############################@#
#                    #        #
#  #  #  #######  ####  ####  #
#  #  #              #  #     #
#  #############  ####  #  ####
#        #     #     #  #     #
####  ####  #  ####  #######  #
#     #     #              #  #
#  ####  #######  ####  ####  #
#  #     #           #  #     #
#  ######################  ####
#     #           #           #
#  #  #######  ####  ####  ####
#  #     #  #     #     #  #  #
#  #  #  #  #  #  ####  ####  #
#  #  #  #     #     #        #
####  #  ####  ##########  ####
#     #     #  #     #     #  #
####  ####  #  #  #  ####  #  #
#        #  #     #           #
#############################X#
`;

const MAZE_4 = `
#@#############################
#        #     #        #     #
####  ####  ####  ####  #######
#     #  #              #     #
#  ####  ####  #######  #  ####
#     #     #  #     #        #
#  #  #  ####  #  #  ####  ####
#  #  #  #     #  #        #  #
#  #  #  #  #  #######  ####  #
#  #  #     #     #     #     #
#  ####  ####  #############  #
#  #     #     #              #
#  #  #############  ##########
#        #                    #
#######  #######  ##########  #
#           #     #     #     #
#  #  #######  #  #  #######  #
#  #           #           #  #
#  #  #  #  #  #############  #
#  #  #  #  #        #        #
#############################X#
`;

const MAZE_5 = `
#@#############################
#              #        #  #  #
#  #  #  #  #  #######  ####  #
#  #  #  #                 #  #
#  #  #  #  ################  #
#     #  #           #        #
#  #############  #######  ####
#        #     #        #  #  #
#  #  ####  ##########  #  #  #
#  #           #  #     #  #  #
####  ####  ####  #  ####  #  #
#  #  #     #                 #
#  ##########  #  # #####  #  #
#  #           #  #     #  #  #
#  #  #############  ##########
#           #  #           #  #
#  #######  #  #  #######  #  #
#  #           #  #        #  #
#  #######  #  #  #  #######  #
#  #        #     #           #
#############################X#
`;

const maze = new Maze(MAZE_5);

const astar = new AStar(maze);
const idfs = new IterativeDepthFirstSearch(maze, 100);
const ucs = new UniformCostSearch(maze);

[astar, idfs, ucs].forEach(search => {
    console.log(`Solução ${search.constructor.name}:`);
    const path = search.getPath();
    console.log(path.map(n => n.toString()).join('; '));
    console.log('Nós visitados:', search.visitedNodesCount);
    console.log('Custo da solução:', path.length);
    maze.printSolution(path as MazeNode[]);
});
