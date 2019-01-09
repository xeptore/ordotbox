import { times } from 'lodash';

export default class Box {
    constructor(id, edgesID) {
        this.ID = id;
        this.Edges = times(4, i => edgesID[i]);
        this.SelectedEdges = [];
    }
}
