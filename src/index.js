import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squers = this.state.squares.slice();
        squers[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squers,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquere(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)} />
                );
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquere(0)}
                    {this.renderSquere(1)}
                    {this.renderSquere(2)}
                </div>
                <div className="board-row">
                    {this.renderSquere(3)}
                    {this.renderSquere(4)}
                    {this.renderSquere(5)}
                </div>
                <div className="board-row">
                    {this.renderSquere(6)}
                    {this.renderSquere(7)}
                    {this.renderSquere(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{}</div>
                    <div>{}</div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);