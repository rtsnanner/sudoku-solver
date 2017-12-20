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
        console.log(evt.key);
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
        this.setState({isEditing: true});
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
        else 
            return (
                <div className="col-4" onDoubleClick={(evt) => this.handleDbClick(evt)}>
                   {this.props.value
                        ? this.props.value
                        : '_'}
                </div>
            );
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
            board: Array(81).fill(undefined)
        };
    }

    validmove(x, i, V) {
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

    SDK(i, board, seamless = true) {
        if (i > 81) {            
            return true;
        }
        if (board[i]) 
            return this.SDK(i + 1, board, seamless);
        for (var k = 1; k <= 9; k++) {
            if (this.validmove(k, i, board)) {
                board[i] = k;
                if (this.SDK(i + 1, board, seamless)) 
                    return true;
                }
            }
        board[i] = undefined;
        

        if (!seamless) {
            this.setState({
                board: board.slice(0)
            })
        }

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

    newPuzzle = () => {
        let board = Array(81).fill(undefined);

        this.setState({board: board});
    }

    solvePuzzle = () => {
        console.log('solve puzzle');

        let newBoard = this.state.board.slice(0);

        this.SDK(0, newBoard , false );

        this.setState({board:newBoard});
    }

    render() {

        return (
            <div className="col-12">
                <div className="row">
                    <div className="col-2">
                        <button onClick={this.newPuzzle} className="btn btn-default btn-lg">New Puzzle</button>
                    </div>
                    <div className="col-2">
                        <button onClick={this.solvePuzzle} className="btn btn-success btn-lg">Solve!</button>
                    </div>
                </div>

                <div className="row">
                    <SudokuSquare
                        board={this.state.board}
                        assignNewValue={this.assignNewValue}
                        firstIndex={0}
                        key={1}/>
                    <SudokuSquare
                        board={this.state.board}
                        assignNewValue={this.assignNewValue}
                        firstIndex={3}
                        key={2}/>
                    <SudokuSquare
                        board={this.state.board}
                        assignNewValue={this.assignNewValue}
                        firstIndex={6}
                        key={3}/>
                </div>
                <div className="row">
                    <SudokuSquare
                        board={this.state.board}
                        assignNewValue={this.assignNewValue}
                        firstIndex={27}
                        key={4}/>
                    <SudokuSquare
                        board={this.state.board}
                        assignNewValue={this.assignNewValue}
                        firstIndex={30}
                        key={5}/>
                    <SudokuSquare
                        board={this.state.board}
                        assignNewValue={this.assignNewValue}
                        firstIndex={33}
                        key={6}/>
                </div>
                <div className="row">
                    <SudokuSquare
                        board={this.state.board}
                        assignNewValue={this.assignNewValue}
                        firstIndex={54}
                        key={7}/>
                    <SudokuSquare
                        board={this.state.board}
                        assignNewValue={this.assignNewValue}
                        firstIndex={57}
                        key={8}/>
                    <SudokuSquare
                        board={this.state.board}
                        assignNewValue={this.assignNewValue}
                        firstIndex={60}
                        key={9}/>
                </div>
            </div>
        );
    }
}

export default Sudoku;