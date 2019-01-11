import { times } from 'lodash';

export default class Box {
    constructor(id, element, edgesID) {
        this.ID = id;
        this.Edges = times(4, i => edgesID[i]);
        this.Element = element;
        this.SelectedEdges = [];
        this.RemainingEdges = 4;
    }
}
