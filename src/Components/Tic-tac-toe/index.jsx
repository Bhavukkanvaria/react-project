import { useState } from "react"
import './style.css'

const Square = ({ value, onClickHandle }) => {
    return (
        <button className="square" onClick={onClickHandle}>{value}</button>
    )
}

const calculateWinner = (values) => {
    const winnerArray = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < winnerArray.length; i++) {
        let a = winnerArray[i][0]
        let b = winnerArray[i][1]
        let c = winnerArray[i][2];
        if (values[a] === values[b] && values[b] === values[c]) {
            return values[a];
        }
    }
    return false;

}

const TicTacToe = () => {

    // const [values, setValues] = useState(Array.from({ length: 9 }))
    const [values, setValues] = useState(Array(9).fill(null))
    const [xIsNext, setXisNext] = useState(true);

    const onClickHandle = (index) => {
        let newValue = values.slice();
        if(values[index] || calculateWinner(values)){
            return 
        }
        newValue[index] = xIsNext ? 'X':'O'
        setValues(newValue);
        setXisNext(!xIsNext);
    }

    const resetGame = () => {
        setXisNext(true);
        setValues(Array(9).fill(null))
    }

    let winner = calculateWinner(values)

    return (
        <div className="tic-tac-toe-container">
            <h3>Tic tac toe game</h3>
            <div className="tic-tac-toe-wrapper">
                {!winner && <div className="next-player">Next player is {xIsNext ? 'X' : 'O'}</div>}
                {winner && <div className="winner">Winner is {winner}</div>}
                <div className="row">
                    <Square value={values[0]} onClickHandle={() => onClickHandle(0)}>{values[0]}</Square>
                    <Square value={values[1]} onClickHandle={() => onClickHandle(1)}>{values[1]}</Square>
                    <Square value={values[2]} onClickHandle={() => onClickHandle(2)}>{values[2]}</Square>
                </div>
                <div className="row">
                    <Square value={values[3]} onClickHandle={() => onClickHandle(3)}>{values[3]}</Square>
                    <Square value={values[4]} onClickHandle={() => onClickHandle(4)}>{values[4]}</Square>
                    <Square value={values[5]} onClickHandle={() => onClickHandle(5)}>{values[5]}</Square>
                </div>
                <div className="row">
                    <Square value={values[6]} onClickHandle={() => onClickHandle(6)}>{values[6]}</Square>
                    <Square value={values[7]} onClickHandle={() => onClickHandle(7)}>{values[7]}</Square>
                    <Square value={values[8]} onClickHandle={() => onClickHandle(8)}>{values[8]}</Square>
                </div>
                <br></br>
                <button onClick={() => resetGame()}>Reset game</button>
            </div>
        </div>)
}

export default TicTacToe