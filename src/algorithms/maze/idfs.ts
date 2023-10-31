import { Neighbor } from "../../commons/searchable";
import { Maze, MazeNode } from "./maze";

export class IterativeDepthFirstSearch {
  public maze: Maze;
  public currentNode: MazeNode;
  public stack: MazeNode[];
  public visitedNodes: MazeNode[];
  public readonly limit;

  constructor(maze: Maze, limit: number){
    this.maze = maze;
    this.currentNode = maze.initialNode;
    this.stack = [maze.initialNode];
    this.visitedNodes = [maze.initialNode];
    this.limit = limit;
  }

  showCurrentStack() {
    console.log(`stack -> ${this.stack.map((node) => `${node.column},${node.row}`).join(' ')}`)
  }

  showVisitedNodes() {
    console.log(`nos visitado -> ${this.visitedNodes.map(neighbor => `${neighbor['column']},${neighbor['row']}`).join(' ')}`);
  }

  addNodeToStack(node: MazeNode) {
    this.stack.push(node);
  }

  addNodeToVisited(node: MazeNode) {
    if(this.visitedNodes?.find(visitedNode => visitedNode.column === node.column && visitedNode.row === node.row)) return;

    this.visitedNodes.push(node);
  }

  updateCurrentNode(node: MazeNode) {
    this.currentNode = node;
  }

  validateNeighbors(neighbors: Neighbor[]) {
    const nodes = neighbors.map(neighbor => neighbor.node);
  
    const filteredNeighbors = nodes.filter((neighbor) => {
      return !this.stack.some((node) => {
        return (
          node.value === neighbor['value'] &&
          node.row === neighbor['row'] &&
          node.column === neighbor['column']
        );
      });
    });

    return filteredNeighbors;
  }

  exploreNode(currentNode: MazeNode) {
    if(currentNode.value === 3){ return; }

    console.log();
    console.log(`estou -> ${currentNode['column']},${currentNode['row']}`);
    this.showCurrentStack();
    this.showVisitedNodes();

    const neighbors = this.maze
        .getNeighbors(currentNode)
        .filter(neighbor => neighbor.node['value'] !== 1)
        
    const validNeighbors = this.validateNeighbors(neighbors as Neighbor[]);

    if(validNeighbors.length > 0) {
      console.log(`vizinhos gerais de ${currentNode.column},${currentNode.row} -> ${neighbors.map(neighbor => `${neighbor.node['column']},${neighbor.node['row']}`).join(' ')}`);
      console.log(`vizinhos possíveis de ${currentNode.column},${currentNode.row} -> ${validNeighbors.map(neighbor => `${neighbor['column']},${neighbor['row']}`).join(' ')}`);
    } else {
      console.log(`o no ${currentNode['column']},${currentNode['row']} nao possui vizinhos`);
    }

    
    if(validNeighbors.length !== 0) {
      this.updateCurrentNode(validNeighbors[0] as MazeNode)

      console.log(`vou para ${validNeighbors[0]['column']},${validNeighbors[0]['row']}`);
      this.addNodeToVisited(validNeighbors[0] as MazeNode);
      this.addNodeToStack(validNeighbors[0] as  MazeNode);

      // this.exploreNode(this.currentNode);

    } else {

      this.stack.pop()
      this.updateCurrentNode(this.stack[this.stack.length-1])
      // this.exploreNode(this.currentNode);
    }
  }

  start() {
    this.exploreNode(this.currentNode);
    console.log()

    this.exploreNode(this.currentNode);
    console.log()

    this.exploreNode(this.currentNode);
    console.log()

    this.exploreNode(this.currentNode);
    console.log()

    this.exploreNode(this.currentNode);
    console.log()

    // console.log("Encontramos o melhor caminho");
    // this.showCurrentStack()

  }
}