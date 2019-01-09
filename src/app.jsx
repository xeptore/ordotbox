import './styles/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

const n = 3;
const uids = {
    row: 0,
    col: 0
};

class App extends React.Component {
    constructor() {
        super();
        this.rows = [];
        for (let i = 0; i < 2 * n + 1; i++) {
            this.rows.push(i % 2 === 0 ? <tr key={uids.row}>{this.evencols()}</tr> : <tr key={uids.row}>{this.oddcols()}</tr>);
            uids.row++;
        }
    }
    evencols() {
        const tds = [];
        for (let i = 0; i < 2 * n + 1; i++) {
            let td = <td key={uids.col} className='unselectable'></td>;
            if (i % 2 === 1) {
                td = <td key={uids.col} className='row selectable'><a></a></td>;
            }
            tds.push(td);
            uids.col++;
        }
        return tds;
    }
    oddcols() {
        const tds = [];
        for (let i = 0; i < 2 * n + 1; i++) {
            let td = <td key={uids.col} className='box'><a></a></td>;
            if (i % 2 === 0) {
                td = <td key={uids.col} className='col selectable'><a></a></td>;
            }
            tds.push(td);
            uids.col++;
        }
        return tds;
    }
    render() {
        return (
            <table>
                <tbody>
                    {this.rows}
                </tbody>
            </table>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
