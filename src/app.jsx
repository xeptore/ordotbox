import './styles/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { times, range, chunk, head, pull } from 'lodash';

import Box from './box';

const n = 3;
const MaxEdges = (n * (n + 1)) * 2;
const uids = {
    row: 0,
    cell: -1,
    edges: 0
};

const SelectedBoxes = [times(9), ...times(3, () => [])];

class App extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            Boxes: this.buildBoxes()
        };
    }
    buildBoxes() {
        const headsTop = chunk(range(MaxEdges - n), 2 * n + 1).map(head);
        const boxes = [];
        chunk(range(9), 3).forEach((row, i) => {
            row.forEach((box, j) => {
                const top = headsTop[i] + j;
                const left = top + n;
                const right = left + 1;
                const bottom = right + n;
                boxes.push(new Box(box, [top, right, bottom, left]));
            });
        });
        return boxes;
    }
    handleClick(e) {
        if (e.target.getAttribute('clicked')) {
            return;
        }
        e.target.parentNode.classList.add('clicked');
        e.target.classList.add('clicked');
        e.target.setAttribute('clicked', true);
        const uid = parseInt(e.target.parentNode.getAttribute('data-uid'));
        const selectedEdgeBoxes = this.state.Boxes.filter(box => {
            const index = box.Edges.indexOf(uid);
            if (index !== -1) {
                box.SelectedEdges.push(index);
                return true;
            }
            return false;
        });
        selectedEdgeBoxes.forEach(box => {
            SelectedBoxes.map(sb => pull(sb, box.ID));
            SelectedBoxes[box.SelectedEdges.length].push(box.ID);
        });
    }
    render() {
        return (
            <div className="wrapper">
                {
                    times(2 * n + 1, i => {
                        return (
                            <div className="row" key={uids.row++}>
                                {
                                    times(2 * n + 1, j => {
                                        if (i % 2 === 0 && j % 2 === 0) {
                                            return <div className="cell vertex" key={uids.cell++}></div>;
                                        } else if (i % 2 === 1 && j % 2 === 0) {
                                            return (
                                                <div className="cell edge vedge" key={uids.cell++} data-uid={uids.edges++}>
                                                    <a className="hoverable" onClick={this.handleClick}></a>
                                                </div>
                                            );
                                        } else if (i % 2 === 0 && j % 2 === 1) {
                                            return (
                                                <div className="cell edge hedge" key={uids.cell++} data-uid={uids.edges++}>
                                                    <a className="hoverable" onClick={this.handleClick}></a>
                                                </div>
                                            );
                                        } else {
                                            return <div className="cell box" key={uids.cell++}></div>;
                                        }
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
