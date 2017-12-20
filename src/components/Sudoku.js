import React from 'react'

class SudokuLocus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            index: props.index,
            locked: props.locked,
            isEditing : false
        };

        this.handleDbClick.bind(this);
    }

    handleKeyPress(evt) {
        console.log(evt.key);
        if(evt.key == 'Enter')
        {
            this.props.assignNewValue(this.state.index , this.state.value);        
            this.setState({isEditing:false});
        }
    }

    handleChange(evt, stillediting) {


        let newValue = parseInt(evt.target.value,10);

        if(newValue && newValue <= 9)
        {
            if(stillediting)        
            {
                this.props.assignNewValue(this.state.index , newValue);        
                this.setState({isEditing:false , value: newValue});
            }else{
                this.setState({value: newValue});
            }
        }

        
    }

    handleDbClick(evt){
            this.setState({isEditing:true});
    }

    render() {
        if (this.state.isEditing) 
            return (
                <div className="col-4"><input                
                style={{width:"50px"}}
                id={this.state.index}
                name={`locus_${this.state.index}`}
                value={this.state.value}
                autoFocus
                onBlur={(evt) => this.handleChange(evt, true)}
                onKeyPress={(evt) => this.handleKeyPress(evt)}
                onChange={(evt) => this.handleChange(evt, false)}/></div>);
        else 
            return (
            <div className="col-4" onDoubleClick={(evt)=>this.handleDbClick(evt)}>
                {this.state.value}                
            </div>);
        }
    }

class SudokuSquare extends React.Component {
    render() {
        return (

            <div className="col">
                <div className="card">
                    <div className="card-body ">
                        {[0, 1, 2].map((it, ix) => {
                            return (

                                <div className="row justify-content-between" key={it}>
                                    {this
                                        .props
                                        .board
                                        .map((item, index) => {
                                            return {originalIndex: index, value: item};
                                        })
                                        .slice(this.props.firstIndex + 9 * it, this.props.firstIndex + 9 * it + 3)
                                        .map((item, index) => <SudokuLocus
                                            locked = {this.props.locked.indexOf(item.originalIndex)>=0}
                                            assignNewValue={this.props.assignNewValue}
                                            key={item.originalIndex}
                                            index={item.originalIndex}
                                            value={item.value}/>)}
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
            board: Array(81).fill('_'),
            locked : [1,2,3]
        };        
    }

    assignNewValue = (index,value) =>
    {
        console.log("new value assigned", index, value)
        const board = this.state.board.slice(0);
        board[index] = value;
        this.setState({board});

        console.log(board);
    }  

    render() {     

        return (
            <div className="col-12">
                <div className="row">
                    <SudokuSquare board={this.state.board} locked={this.state.locked} assignNewValue={this.assignNewValue} firstIndex={0} key={1}/>
                    <SudokuSquare board={this.state.board} locked={this.state.locked} assignNewValue={this.assignNewValue} firstIndex={3} key={2}/>
                    <SudokuSquare board={this.state.board} locked={this.state.locked} assignNewValue={this.assignNewValue} firstIndex={9} key={3}/>
                </div>
                <div className="row">
                    <SudokuSquare board={this.state.board} locked={this.state.locked} assignNewValue={this.assignNewValue} firstIndex={27} key={4}/>
                    <SudokuSquare board={this.state.board} locked={this.state.locked} assignNewValue={this.assignNewValue} firstIndex={30} key={5}/>
                    <SudokuSquare board={this.state.board} locked={this.state.locked} assignNewValue={this.assignNewValue} firstIndex={33} key={6}/>
                </div>
                <div className="row">
                    <SudokuSquare board={this.state.board} locked={this.state.locked} assignNewValue={this.assignNewValue} firstIndex={54} key={7}/>
                    <SudokuSquare board={this.state.board} locked={this.state.locked} assignNewValue={this.assignNewValue} firstIndex={57} key={8}/>
                    <SudokuSquare board={this.state.board} locked={this.state.locked} assignNewValue={this.assignNewValue} firstIndex={60} key={9}/>
                </div>
            </div>
        );
    }
}

export default Sudoku;