import React, { useState } from 'react'

const Square = ({ value, onSquareClick, winningSquare }) => {
    return (
        <button className='square' onClick={onSquareClick} style={{backgroundColor: winningSquare ? 'lightgreen' : '#fff'}}>
            {value}
        </button>
    )
}

function Board({ xIsNext, squares, onPlay, move, onReset }) {
    const handleClick = (i) => {
        if (squares[i] || calculateWinner(squares)) {
            return
        }

        const nextSquares = squares.slice()
        nextSquares[i] = xIsNext ? 'X' : 'O'
        onPlay(nextSquares)
    }

    const calculateWinner = (squares) => {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < winningLines.length; i++) {
            const [a, b, c] = winningLines[i]

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {
                    winner: squares[a],
                    winningSquares: [a, b, c]
                }
            }
        }

        return null
    }

    const winner = calculateWinner(squares)
    let status
    let winningSquare = []

    if (winner) {
        status = `Winner:  ${winner.winner}!`
        winningSquare = winner.winningSquares
    } else if (!winner & move === squares.length) {
        status = "It's a draw!"
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }

    const isWinningSquare = (i) => {
        if (winningSquare[0] === i || winningSquare[1] === i || winningSquare[2] === i) {
            return true
        }

        return false;
    }

    return (
        <div>
            <div className='status'>{status}</div>
            <div className='board-row'>
                <Square winningSquare={isWinningSquare(0)} value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square winningSquare={isWinningSquare(1)} value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square winningSquare={isWinningSquare(2)} value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className='board-row'>
                <Square winningSquare={isWinningSquare(3)} value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square winningSquare={isWinningSquare(4)} value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square winningSquare={isWinningSquare(5)} value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className='board-row'>
                <Square winningSquare={isWinningSquare(6)} value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square winningSquare={isWinningSquare(7)} value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square winningSquare={isWinningSquare(8)} value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <div className='move'>You are at move: {move}</div>
            <button onClick={onReset}>Reset</button>
        </div>
    )
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const xIsNext = currentMove % 2 === 0
    const currentSquares = history[currentMove]

    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
    }

    const handleReset = () => {
        setCurrentMove(0)
        setHistory([Array(9).fill('')])
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove)
    }

    const moves = history.map((squares, move) => {
        let description

        if (move > 0) {
            description = 'Go to move #' + move
        } else {
            description = 'Go to game start'
        }

        return (
            <li key={move}> 
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board 
                    xIsNext={xIsNext} 
                    squares={currentSquares} 
                    onPlay={handlePlay} 
                    onReset={handleReset}
                    move={currentMove}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}
