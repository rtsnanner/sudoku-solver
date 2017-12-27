import React from 'react';

import SudokuLocus from './SudokuLocus';

/**
 * This class holds code in order to exhibit 9 sudoku locus belonging to a single square on a sudoku field
 */
export default class SudokuReadOnlySquare extends React.Component {
    render() {
        let board = this.props.board;

        return (
            <table className="sudoku-table">                
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
        );
    }
}