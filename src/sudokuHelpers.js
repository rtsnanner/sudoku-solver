/**
 * Checks if a value is valid if used in position indicated by index param
 * A value is valid in a locus if it doesn`t appeared in same column, line or inner square of sudoku
 * @param {number} value value to be checked
 * @param {number} index index of position
 * @param {number[]} board entire board with all filled values
 * @param {boolean} log flag used to show or not reasons that value is invalid to position on console log
 */
export const validMove = (value, index, board, log = false) => {

	let moveIsValid = true;
	let whyNotValid = '';

    let line = (index-index%9)/9;
	let column = index%9;	

	for(let j = 0; j<9;j++){		

		if(board[line*9+j] && line*9+j === index) continue;

		if(board[line*9+j]===value) {
			moveIsValid = false;
			whyNotValid = `position ${line*9+j} already has value *lineconstraint*` 
			break;
		}
	}
	for(let j = 0; j<9;j++){		

		if(board[column+9*j] && column+9*j === index) continue;

		if(board[column+9*j]===value) {
			moveIsValid = false;
			whyNotValid = `position ${column+9*j} already has value *columnconstraint*`
			break;
		}
	}

	if(line<3) line = 0;
	else if(line<6) line = 3;
	else line = 6;
	
	if(column<3) column = 0;
	else if(column<6) column = 3;
	else column = 6;

	for(let j = 0; j<3;j++){
		for(let k = 0; k<3;k++){

            if(board[(line+j)*9 + (column+k)] && ((line+j)*9 + (column+k)) === index) continue;

			if(board[(line+j)*9 + (column+k)]===value){ 
				moveIsValid =  false;
				whyNotValid = `position ${(line+j)*9 + (column+k)} already has value *squareconstraint*`
			}
		}			
	}

	if(log && !moveIsValid)
	console.log( value, index, whyNotValid);

	return moveIsValid;
}

/**
 * Performs backtrack algorithm in order to solve a sudoku board with predefined values 
 * @param {number} i starter position
 * @param {number[]} board sudoku board with some values already filled
 */
export const backtrack = (i, board) => {            
    
    if (i > 81) return true;    

    if (board[i] !== 0) return backtrack(i + 1, board);    

    for (let k = 1; k <= 9; k++) {
        if (validMove(k, i, board)) {
            
            board[i] = k;

            if (backtrack(i + 1, board)) return true;            
        }
    }

    board[i] = 0;

    return false;

}