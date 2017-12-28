import React from 'react';
import SudokuReadOnlySquare from '../../components/Sudoku/SudokuReadOnlySquare';

class CommunityPuzzles extends React.Component
{
    state = {
        boards : []
    }
    

    render(){
        return (
        <div className="card">
                <div className="card-header">
                    Community Puzzles
                </div>
                <div className="card-body">
                <div className="row">
                {Object.keys(this.state.boards).map( (item, index) => {
                    return  <SudokuReadOnlySquare key={index} board={this.state.boards[item]} handleClick={this.props.updateBoard}/>
                })}
                </div>
                </div>
        </div>);
    }

    componentWillMount(){
        let _this = this;
        let boardRef = this.props.firebase.database().ref('boards');
        boardRef.limitToLast(6).on('value', function(snapshot){            
            _this.setState({boards: snapshot.val()})
        });
    }
}

export default CommunityPuzzles;