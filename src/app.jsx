import './styles/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { times, range, chunk, head, pull, sample } from 'lodash';

import Box from './box';

const n = 3;
const MaxEdges = (n * (n + 1)) * 2;
const scores = {
    cpu: 0,
    player: 0
};

const uids = {
    row: 0,
    box: 0,
    cell: -1,
    edges: 0
};

const RemainingEdges = range(MaxEdges);

class App extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.Boxes = [];
    }
    componentDidMount() {
        uids.box = 0;
        const headsTop = chunk(range(MaxEdges - n), 2 * n + 1).map(head);
        const boxes = [];
        let idx = 0;
        chunk(range(9), 3).forEach((row, i) => {
            row.forEach((box, j) => {
                const top = headsTop[i] + j;
                const left = top + n;
                const right = left + 1;
                const bottom = right + n;
                boxes.push(new Box(box, document.getElementById(`b${idx++}`), [top, right, bottom, left]));
            });
        });
        this.Boxes = boxes;
    }
    handleClick(e) {
        if (e.target.getAttribute('clicked')) {
            return;
        }
        const edge = document.getElementById(e.target.parentNode.getAttribute('id'));
        const prevPlayerScore = scores.player;
        this.playerSelectedEdge(1, edge);
        if (scores.player === prevPlayerScore) {
            this.playcpu();
        }
    }
    playcpu() {
        const edge = this.selectRandomEdge();
        this.playerSelectedEdge(0, edge);
    }
    selectRandomEdge() {
        const edgeID = sample(RemainingEdges);
        return document.getElementById(edgeID);
    }
    playerSelectedEdge(player, edge) {
        edge.classList.add('clicked');
        edge.children[0].classList.add('clicked');
        edge.children[0].setAttribute('clicked', true);
        pull(RemainingEdges, parseInt(edge.id));
        const selectedEdgeBoxes = this.Boxes.filter(box => {
            const index = box.Edges.indexOf(parseInt(edge.id));
            if (index !== -1) {
                box.SelectedEdges.push(index);
                return true;
            }
            return false;
        });
        const prevCpuScore = player === 0 ? scores.cpu : -1;
        selectedEdgeBoxes.forEach(box => {
            if (--box.RemainingEdges === 0) {
                if (player === 1) {
                    box.Element.classList.add('box-user-selected');
                    scores.player++;
                } else {
                    box.Element.classList.add('box-cpu-selected');
                    scores.cpu++;
                }
            }
        });
        const currentCpuScore = player === 0 ? scores.cpu : -1;
        if (currentCpuScore > prevCpuScore && player === 0 && RemainingEdges.length !== 0) {
            this.playcpu();
            return;
        }
        if (scores.player + scores.cpu === n * n) {
            console.log('finished!');
            console.log('scores:');
            console.log('player:', scores.player);
            console.log('cpu:', scores.cpu);
        }
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
                                                <div className="cell edge vedge" key={uids.cell++} id={uids.edges++}>
                                                    <a className="hoverable" onClick={this.handleClick}></a>
                                                </div>
                                            );
                                        } else if (i % 2 === 0 && j % 2 === 1) {
                                            return (
                                                <div className="cell edge hedge" key={uids.cell++} id={uids.edges++}>
                                                    <a className="hoverable" onClick={this.handleClick}></a>
                                                </div>
                                            );
                                        } else {
                                            return <div className="cell box" key={uids.cell++} id={`b${uids.box++}`}></div>;
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
