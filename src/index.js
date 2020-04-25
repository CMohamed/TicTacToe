import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    const isHighLight = (props.isHighLight) ? 'highLight' : 'normal';
    return (
        <button className={"square " + isHighLight} onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {

    renderSquere(i) {
        return (
            <Square
                isHighLight={this.props.winningLine && this.props.winningLine.indexOf(i) !== -1}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)} />
                );
    }

    renderLine(i) {
        return (
            <div className="board-row">
                {this.renderSquere(i*3)}
                {this.renderSquere(i*3 + 1)}
                {this.renderSquere(i*3 + 2)}
            </div>
        )
    }

    renderBoard() {

    }

    render() {
        return (
            <div>
                {this.renderLine(0)}
                {this.renderLine(1)}
                {this.renderLine(2)}
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                location: {col: null, raw: null}
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        console.log('omar elmansouri ' + (new Date()).toLocaleString);
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const location = {
            col: 1 + i%3,
            row: Math.floor(i/3) + 1,
        };
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                location: location
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
           const desc = move ? 'Go to move #' + move : 'Go to game start';
           const cl = (this.state.stepNumber === move) ? 'bold' : 'normal';
           return (
               <li key={move} className={cl}>
                   <button className={cl} onClick={()=> this.jumpTo(move)}>
                       {desc}
                   </button>
               </li>
           )
        });
        let status;
        if (winner) {
            status = 'Winner: ' + winner[0];
        } else if (this.state.stepNumber === 9) {
            status = 'DRAW';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <h2>Omar ELMANSOURI</h2>
                <br/>
                <div className="game-board">
                    <Board
                        winningLine={winner}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>{'col: ' + (current.location.col || '')} <br/> {'raw: ' + (current.location.row||'')}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }
    return null;
}