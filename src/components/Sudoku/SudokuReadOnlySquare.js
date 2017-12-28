import React from 'react';

/**
 * This class holds code in order to exhibit 9 sudoku locus belonging to a single square on a sudoku field
 */
export default class SudokuReadOnlySquare extends React.Component {
    render() {
        let board = this.props.board;

        return (
            <div className="col-4">
            <table className="sudoku-table" onClick={() =>  this.props.handleClick(this.props.board)}>
                <tbody>
                {Array.from(Array(9).keys()).map((row)=>{ return (                    
                    <tr key={row}>
                        {Array.from(Array(9).keys()).map((col)=>{ 
                              
                              let index = 9*row + col;
                              let displayItem =board[index];                              
                              

                              if(displayItem){
                                    return <td key={index}>{displayItem}</td>
                            }
                            else{
                                    return <td key={index}>&nbsp;</td>
                            }
                        })}                        
                    </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        );
    }
}