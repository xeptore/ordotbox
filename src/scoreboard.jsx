import React from 'react';
import PropTypes from 'prop-types';

import './styles/scoreboard.scss';

export default class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
    }
    winner() {
        if (this.props.total === this.props.cpu + this.props.player) {
            if (this.props.cpu > this.props.player) {
                return 'cpu';
            } else if (this.props.player > this.props.cpu) {
                return 'player';
            }
        }
        return false;
    }
    render() {
        return (
            <div className="scoreboard-container">
                <div className="scores-container">
                    <div className={`score-container player-score ${this.winner() === 'player' ? 'winner' : ''}`}>
                        <p className="score-title d-inline-block">Player:</p>
                        <p className="score player d-inline-block">
                            {this.props.player}
                        </p>
                    </div>
                    <div className={`score-container cpu-score ${this.winner() === 'cpu' ? 'winner' : ''}`}>
                        <p className="score-title d-inline-block">CPU:</p>
                        <p className="score cpu d-inline-block">
                            {this.props.cpu}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

ScoreBoard.propTypes = {
    player: PropTypes.number,
    cpu: PropTypes.number,
    total: PropTypes.number
};
