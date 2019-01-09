import './styles/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { times } from 'lodash';

const n = 3;
const uids = {
    row: 0,
    cell: 0
};

class App extends React.Component {
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
                                        } else if (i % 2 === 0 && j % 2 === 1) {
                                            return (
                                                <div className="cell edge vedge" key={uids.cell++}>
                                                    <a className="hoverable"></a>
                                                </div>
                                            );
                                        } else if (i % 2 === 1 && j % 2 === 0) {
                                            return (
                                                <div className="cell edge hedge" key={uids.cell++}>
                                                    <a className="hoverable"></a>
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
