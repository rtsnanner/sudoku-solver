const validMove = (x, i, V) => {

    let line = (i - i % 9) / 9;
    let column = i % 9;

    for (let j = 0; j < 9; j++) {

        if (line * 9 + j === i || column + 9 * j === i) 
            continue;
        
        if (V[line * 9 + j] === x) {
            return false;
        }
        if (V[column + 9 * j] === x) {
            return false;
        }

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

            if ((line + j) * 9 + (column + k) === i) 
                continue;
            
            if (V[(line + j) * 9 + (column + k)] === x) {
                return false;
            }
        }
    }

    return true;
}


const SDK = (i,V ) =>{
	if(i>81) {		
		return true;	
	}
	if(V[i] !== 0 ) return SDK(i+1,V);			
	for(var k = 1;k<=9;k++){
		if(validMove(k,i,V)){
			V[i] = k;			
			if(SDK(i+1,V)) return true;			
		}
	}
	V[i] = 0;
	return false;
}

const backtrack = (i, board) => {            
    
    if (i > 81) {
        return true;
    }

    if (board[i]) {
        return backtrack(i + 1, board);
    }

    for (let k = 1; k <= 9; k++) {
        if (validMove(k, i, board)) {
            board[i] = k;

            if (backtrack(i + 1, board)) {
                return true;
            }
        }
    }

    board[i] = undefined;

    return false;

}

export {backtrack , validMove, SDK}