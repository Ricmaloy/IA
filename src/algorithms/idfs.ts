import { Neighbor } from "../commons/searchable";
import { Maze, MazeNode } from "./maze";

export class IterativeDepthFirstSearch {
  public maze: Maze;
  public initialNode: MazeNode;
  public stack: MazeNode[];
  public visitedNodes: MazeNode[];
  public readonly limit: number;

  constructor(maze: Maze, limit: number){
    this.maze = maze;
    this.initialNode = maze.initialNode;
    this.stack = [];
    this.visitedNodes = [];
    this.limit = limit;
  }

  showCurrentStack() {
    console.log(`stack -> ${this.stack.map((node) => ` (${node.column},${node.row})`).join(' ')}`);
  }

  showVisitedNodes() {
    console.log(`nos visitado -> ${this.visitedNodes.map(neighbor => `(${neighbor['column']},${neighbor['row']})`).join(' ')}`);
  }

  addNodeToStack(node: MazeNode) {
    if(this.stack.find(stackNode => stackNode.column === node.column && stackNode.row === node.row)) return;

    this.stack.push(node);
  }

  addNodeToVisited(node: MazeNode) {
    if(this.visitedNodes?.find(visitedNode => visitedNode.column === node.column && visitedNode.row === node.row)) return;

    this.visitedNodes.push(node);
  }

  validateNeighbors(neighbors: Neighbor[]) {
    const nodes = neighbors.map(neighbor => neighbor.node);
  
    const filteredNeighbors = nodes.filter((neighbor) => {
      return !this.visitedNodes.some((node) => {
        return (
          node.value === neighbor['value'] &&
          node.row === neighbor['row'] &&
          node.column === neighbor['column']
        );
      });
    });

    return filteredNeighbors;
  }

  exploreNode(currentNode: MazeNode, limit: number): Boolean {

    if(limit === 0) {
      return false;
    }

    this.addNodeToVisited(currentNode)
    
    // Caso base: Verificar se a posição atual é a saída
    if(currentNode.value === 3){
      return true; 
    }
    
    // Caso recursivo: Posição atual ainda não foi visitada 
    const neighbors = this.maze
        .getNeighbors(currentNode)
        .filter(neighbor => neighbor.node['value'] !== 1);
        
    const validNeighbors = this.validateNeighbors(neighbors as Neighbor[]);

    for(var i = 0; i < validNeighbors.length; i++) {
      const node = new MazeNode(
        validNeighbors[i]['value'], 
        validNeighbors[i]['row'], 
        validNeighbors[i]['column']
      );
 
      if(this.exploreNode(node, limit - 1)){
        this.addNodeToStack(node);
        
        return true;
      };
    }
    
    return false;
  }

  solveMaze(limit: number) {
    this.exploreNode(this.initialNode, limit);   

    this.addNodeToStack(this.initialNode);
    this.stack.reverse();

    console.log();
    this.showCurrentStack();
    this.showVisitedNodes();
  }

  start() {
    for(var i = 0; i <= this.limit; i++) {
      this.solveMaze(i);
    }
  }
}
