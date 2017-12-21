import React from 'react'

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
                .assignNewValue(this.props.index, undefined);
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
                                            valid={this
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
        this.state = {
            board: Array(81).fill(undefined),
            locked: [],
            shouldInterrupt: false,
            solving: false
        };
    }

    validMove(x, i, V) {

        let line = (i - i % 9) / 9;
        let column = i % 9;

        for (let j = 0; j < 9; j++) {
            if (V[line * 9 + j] === x) 
                return false;
            if (V[column + 9 * j] === x) 
                return false;
            }
        
        if (line < 3) 
            line = 0;
        else if (line < 6) 
            line = 3;
        else 
            line = 6;
        
        if (column < 3) 
            column = 0;
        else if (column < 6) 
            column = 3;
        else 
            column = 6;
        
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                if (V[(line + j) * 9 + (column + k)] === x) 
                    return false;
                }
            }

        return true;
    }

    Backtrack = (i, board) => {

        if (this.state.shouldInterrupt) 
            return true;
        
        if (i > 81) {
            return true;
        }

        if (board[i]) {
            return this.Backtrack(i + 1, board);
        }

        for (let k = 1; k <= 9; k++) {
            if (this.validMove(k, i, board)) {
                board[i] = k;

                if (this.Backtrack(i + 1, board)) {
                    return true;
                }
            }
        }

        board[i] = 0;

        return false;

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

        let cluesIndexes = Array(17).fill(undefined);

        cluesIndexes.forEach((value, index, arr) => {
            let generatedIndex = Math.floor(Math.random() * 81);
            while (arr.indexOf(generatedIndex) >= 0) {
                generatedIndex = Math.floor(Math.random() * 81);
            }

            arr[index] = generatedIndex;
        });

        const board = Array(81).fill(undefined);

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

            setTimeout(() => {

                let newBoard = this
                    .state
                    .board
                    .slice(0);

                if (!this.Backtrack(0, newBoard)) {
                    alert('no solution was found')
                }

                this.setState({board: newBoard, shouldInterrupt: false, solving: false});

            }, 600);

        }

    }

    render() {

        return (
            <div className="col-12">
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
                {[0, 1, 2].map((v) => <div className="row" key={v}>
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
                </div>)}
            </div>
        );
    }
}

export default Sudoku;