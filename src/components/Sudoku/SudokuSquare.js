import React from 'react';

import SudokuLocus from './SudokuLocus';

/**
 * This class holds code in order to exhibit 9 sudoku locus belonging to a single square on a sudoku field
 */
export default class SudokuSquare extends React.Component {
    render() {
        let mappedBoard = this
            .props
            .board
            .map((item, index) => {
                return {originalIndex: index, value: item};
            });

        return (

            <div className="col sudoku-square">
                {/* <div className="card"> */}
                    {/* <div className="card-body "> */}
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
                                            .validMove(item.value, item.originalIndex, this.props.board, true)}
                                            locked={this
                                            .props
                                            .locked
                                            .indexOf(item.originalIndex) >= 0}
                                            value={this.props.board[item.originalIndex]}/>)}
                                </div>
                            );
                        })}
                    {/* </div> */}
                {/* </div> */}
            </div>

        );
    }
}