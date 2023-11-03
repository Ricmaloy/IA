import { Node } from "./searchable";

export interface Search {
    readonly visitedNodesCount: number;
    getPath(): Node[];
}
