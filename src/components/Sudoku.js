import React from 'react'
import {backtrack,validMove} from '../sudokuHelpers'

class SudokuLocus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };

        this
            .handleDbClick
            .bind(this);
    }

    finishEditing(evt) {
        let newValue = parseInt(evt.target.value, 10);

        if (newValue && newValue <= 9) {
            this
                .props
                .assignNewValue(this.props.index, newValue);
        } else {
            this
                .props
                .assignNewValue(this.props.index, 0);
        }

        this.setState({isEditing: false});
    }

    handleKeyPress(evt) {
        if (evt.key === 'Enter') {

            this.finishEditing(evt);
        }
    }

    handleChange(evt, stillediting) {

        this
            .props
            .assignNewValue(this.props.index, evt.target.value);

    }

    handleDbClick(evt) {
        if (!this.props.locked) {
            this.setState({isEditing: true});
        }

    }

    render() {
        if (this.state.isEditing) 
            return (
                <div className="col-4"><input
                    type="text"
                    style={{
                    width: "50px"
                }}
                    id={this.props.index}
                    name={`locus_${this.props.index}`}
                    value={this.props.value
                    ? this.props.value
                    : ""}
                    autoFocus
                    onBlur={(evt) => this.finishEditing(evt)}
                    onKeyPress={(evt) => this.handleKeyPress(evt)}
                    onChange={(evt) => this.handleChange(evt, false)}/></div>
            );
        else {

            let getNumberDisplay = () => {
                if (this.props.locked) {
                    return (
                        <strong>
                            {this.props.value
                                ? this.props.value
                                : '_'}
                        </strong>
                    );
                } else {

                    let style = {};

                    if (this.props.value && !this.props.valid) 
                        style.color = "red";
                    
                    return (
                        <span style={style}>
                            {this.props.value
                                ? this.props.value
                                : '_'}
                        </span>
                    );
                }
            };

            return (
                <div className="col-4" onDoubleClick={(evt) => this.handleDbClick(evt)}>
                    {getNumberDisplay()}
                </div>
            );

        }
    }
}

class SudokuSquare extends React.Component {
    render() {
        let mappedBoard = this
            .props
            .board
            .map((item, index) => {
                return {originalIndex: index, value: item};
            });

        return (

            <div className="col">
                <div className="card">
                    <div className="card-body ">
                        {[0, 1, 2].map((it, ix) => {
                            return (
                                <div className="row justify-content-between" key={it}>
                                    {mappedBoard
                                        .slice(this.props.firstIndex + 9 * it, this.props.firstIndex + 9 * it + 3)
                                        .map((item, index) => <SudokuLocus
                                            assignNewValue={this.props.assignNewValue}
                                            key={item.originalIndex}
                                            index={item.originalIndex}
                                            valid={item.value && this
                                            .props
                                            .locked
                                            .indexOf(item.originalIndex) < 0 && this
                                            .props
                                            .validMove(item.value, item.originalIndex, this.props.board)}
                                            locked={this
                                            .props
                                            .locked
                                            .indexOf(item.originalIndex) >= 0}
                                            value={this.props.board[item.originalIndex]}/>)}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        );
    }
}

class Sudoku extends React.Component {

    constructor() {
        super();

        let initialBoard = [	
            0,0,1, 5,9,0, 0,0,7,
            0,0,5, 0,0,6, 0,9,0,
            0,0,2, 0,0,4, 0,1,0,
            0,9,0, 0,0,0, 0,4,0,
            0,0,6, 0,1,0, 3,0,0,
            0,5,0, 0,0,0, 0,2,0,
            0,3,0, 6,0,0, 1,0,0,
            0,2,0, 8,0,0, 5,0,0,
            4,0,0, 0,5,3, 9,0,0
        ];

        this.state = {            
            board: initialBoard,
            locked: initialBoard.map((val,ix) => val>0?ix:undefined),
            shouldInterrupt: false,
            solving: false
        };

        this.validMove = validMove.bind(this);
        this.backtrack =backtrack.bind(this);
    }   

    assignNewValue = (index, value) => {
        const board = this
            .state
            .board
            .slice(0);
        board[index] = value;
        this.setState({board});
    }

    interruptSolution = () => {
        this.setState({shouldInterrupt: true});
    }

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

    solvePuzzle = () => {

        if (this.state.solving) {
            this.setState({shouldInterrupt: true});
        } else {

            this.setState({solving: true});            

            setTimeout(()=>{

            let newBoard = this
                .state
                .board
                .slice(0);            

            if (!this.backtrack(0, newBoard)) {
                alert('no solution was found')
            }            

            this.setState({board: newBoard, shouldInterrupt: false, solving: false});           

        },300);

        }

    }

    render() {

        let style = {};

        if(this.state.solving)
            style.cursor = "wait";


        return (
            <div className="col-12" style={style}>
                <div className="row">
                    <div className="col-2">
                        <button onClick={this.newPuzzle} className="btn btn-default btn-lg">New</button>
                    </div>
                    <div className="col-2">
                        <button
                            onClick={this.solvePuzzle}
                            className={`btn btn-lg btn-${this.state.solving
                            ? "danger"
                            : "success"}`}>{this.state.solving
                                ? "Interrupt"
                                : "Solve"}</button>
                    </div>
                </div>
                <div className="clearfix">&nbsp;</div>
                {[0, 1, 2].map((v) => <div key={v}><div className="row">
                    {[
                        0 + 27 * v,
                        3 + 27 * v,
                        6 + 27 * v
                    ].map((item, index) =>< SudokuSquare board = {
                        this.state.board
                    }
                    locked = {
                        this.state.locked
                    }
                    assignNewValue = {
                        this.assignNewValue
                    }
                    validMove = {
                        this.validMove
                    }
                    firstIndex = {
                        item
                    }
                    key = {
                        index
                    } />)}
                    
                </div><div className="clearfix">&nbsp;</div></div>)}
            </div>
        );
    }
}

export default Sudoku;