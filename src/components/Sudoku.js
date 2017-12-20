import React from 'react'

class SudokuLocus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            index: props.index,
            locked: props.locked
        };
    }

    handleChange(evt) {
        this.setState({value: evt.target.value});
    }

    render() {
        if (!this.state.locked) 
            return (<input
                className="col"
                id={this.state.index}
                name={`locus_${this.state.index}`}
                value={this.state.value}
                onChange={(evt) => this.handleChange(evt)}/>);
        else 
            return <span className="badge">{this.state.value}</span>;
        }
    }

class SudokuSquare extends React.Component {
    render() {
        return (

            <div className="col">
                <div className="card">
                    <div className="card-body">
                        {[0,1,2].map((it,ix) => {
                            return (

                                <div className="row" key={it}>
                            {this
                                .props
                                .board
                                .map((item, index) => {
                                    return {originalIndex: index, value: item};
                                })
                                .slice(this.props.firstIndex + 9*it, this.props.firstIndex + 9*it + 3)
                                .map((item, index) => <SudokuLocus
                                    key={item.originalIndex}
                                    index={item.originalIndex}
                                    value={item.originalIndex}/>)}
                        </div>

                            ) ;                           

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
            board: Array(81).fill(1)
        };
    }

    handleChange(evt) {
        const board = this
            .state
            .board
            .slice(0);

        let value = parseInt(evt.target.value, 10);

        if (value) {

            board[parseInt(evt.target.id, 10)] = value;

        } else {
            board[parseInt(evt.target.id, 10)] = undefined;
        }

        this.setState({board});
    }

    render() {

        // breack the board into small tables (locus) 1st table     2nd table 3rdtable 0
        // - 1 - 2     3 - 4 - 5      6 - 7 - 8  9 - 0 - 1     2   3   4   5 - 6   7 8 9
        //   0     1   2   3       4   5   6

        return (
            <div className="col-12">
                <div className="row">
                    <SudokuSquare board={this.state.board} firstIndex={0} key={1}/>
                    <SudokuSquare board={this.state.board} firstIndex={3} key={2}/>
                    <SudokuSquare board={this.state.board} firstIndex={9} key={3}/>
                </div>
                <div className="row">
                    <SudokuSquare board={this.state.board} firstIndex={27} key={4}/>
                    <SudokuSquare board={this.state.board} firstIndex={30} key={5}/>
                    <SudokuSquare board={this.state.board} firstIndex={33} key={6}/>
                </div>
                <div className="row">
                    <SudokuSquare board={this.state.board} firstIndex={54} key={7}/>
                    <SudokuSquare board={this.state.board} firstIndex={57} key={8}/>
                    <SudokuSquare board={this.state.board} firstIndex={60} key={9}/>
                </div>
            </div>
        );
    }
}

export default Sudoku;