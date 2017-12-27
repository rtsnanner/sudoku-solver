import React from 'react'
import {backtrack,validMove} from '../../utils/sudokuHelpers'

import SudokuSquare from '../../components/Sudoku/SudokuSquare'

export default class Sudoku extends React.Component {

    constructor() {
        super();

        let initialBoard = [
            9, 4, 0,  0, 0, 0,  0, 0, 0,
            0, 0, 8,  0, 0, 0,  0, 1, 2,
            1, 0, 0,  0, 0, 0,  0, 0, 0, 
            
            0, 0, 0,  0, 0, 0,  0, 0, 0, 
            0, 0, 0,  6, 0, 0,  9, 0, 4,
            0, 0, 0,  0, 0, 0,  0, 5, 0, 
            
            0, 8, 6,  2, 0, 0,  0, 0, 7,
            0, 0, 0,  0, 0, 0,  5, 4, 0, 
            0, 0, 0,  4, 0, 0,  0, 8, 0
            ];       

        this.state = {            
            board: initialBoard,
            locked: initialBoard.map((val,ix) => val>0?ix:undefined),
            isEditing: false,
            isSolving: false
        };

        this.validMove = validMove.bind(this);
        this.backtrack =backtrack.bind(this);
    }   

    /**
     * This callback is used by sudoku locus to fill a value inside board field in state
     */
    assignNewValue = (index, value) => {
        const board = this
            .state
            .board
            .slice(0);
        board[index] = value;
        this.setState({board});
    }    

    /**
     * Clears all filled values and let only the first clues filled
     */
    clearPuzzle = () => {
        const board = this.state.board.map((val,ix)=>{
            return this.state.locked.indexOf(ix)>=0?val : 0;
        })

        this.setState({board, isEditing:false});
    }

    createYourOwnPuzzle = () => {
        if(!this.state.isEditing)
        {
            const board = Array(81).fill(0);
            this.setState({board: board, locked: [], isEditing: true});
        }else{
            this.setState({locked: this.state.board.map((val,ix)=> val?ix:undefined), isEditing: false});
        }
    }

    /**
     * Creates a new puzzle with 18 clues in board
     */
    newPuzzle = () => {

        let cluesIndexes = Array(18).fill(undefined);

        cluesIndexes.forEach((value, index, arr) => {
            let generatedIndex = Math.floor(Math.random() * 81);
            while (arr.indexOf(generatedIndex) >= 0) {
                generatedIndex = Math.floor(Math.random() * 81);
            }

            arr[index] = generatedIndex;
        });

        const board = Array(81).fill(0);

        cluesIndexes.forEach((ix, donotusethisindex) => {
            let clue = Math.ceil(Math.random() * 9);
            while (!this.validMove(clue, ix, board)) {
                clue = Math.ceil(Math.random() * 9);
            }

            board[ix] = clue;
        });

        this.setState({board: board, locked: cluesIndexes});
    }

    /**
     * Solves a puzzle using the funcions defined in sudokuHelper file
     */
    solvePuzzle = () => {        
        if(!this.state.isSolving)
        {
            this.setState({solving: true});            

            setTimeout(()=>{

                let newBoard = this
                    .state
                    .board
                    .slice(0);            

                if (!this.backtrack(0, newBoard)) {
                    alert('no solution was found')
                }            

                this.setState({board: newBoard, solving: false});           

            },300);        
        }
    }

    render() {

        let style = {};
        let btnStyle = {}

        if(this.state.isEditing)
            btnStyle.display = "none";

        if(this.state.isSolving)
            style.cursor = "wait";

        return (            
            <div className="card" style={style}>
                <div className="card-header">  
                    <div className="row">              

                        <div className="col-2">
                            <button onClick={this.newPuzzle} className="btn btn-default" style={btnStyle} >New</button>
                        </div>

                        <div className="col-2">
                            <button onClick={this.createYourOwnPuzzle} className={`btn btn-${this.state.isEditing?"primary":"default"}`}>{this.state.isEditing?"Save":"Create"}</button>
                        </div>

                        <div className="col-2">
                            <button onClick={this.clearPuzzle} className={`btn btn-${this.state.isEditing?"danger":"default"}`}>{this.state.isEditing?"Cancel":"Clear"}</button>
                        </div>

                        <div className="col-2">
                            <button
                                onClick={this.solvePuzzle}
                                style={btnStyle}
                                className={`btn btn-${this.state.isSolving
                                ? "danger"
                                : "success"}`}>{this.state.isSolving
                                    ? "Processing"
                                    : "Solve"}</button>
                        </div>
                    </div>
                </div>                
                <div className="card-body">
                {[0, 1, 2].map((v) =>
                    <div className="row row justify-content-between" key={v}>
                        {[
                            0 + 27 * v,
                            3 + 27 * v,
                            6 + 27 * v
                        ].map((item, index) =><SudokuSquare 
                        board = {this.state.board}
                        locked = {this.state.locked}
                        assignNewValue = {this.assignNewValue}
                        validMove = {this.validMove}
                        firstIndex = {item}
                        key = {index} />)}
                    </div>)}
                </div>
            </div>            
        );
    }
}