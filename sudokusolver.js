/**
Testa a inserção de um valor na lacuna.
O movimento é valido se o numero a ser inserido não se repetir na linha, coluna ou quadrante
caso contrario retorna false
*/
function validmove(x,i,V){
	var line = (i-i%9)/9;
	var column = i%9;
	for(var j = 0; j<9;j++){
		if(V[line*9+j]==x) return false;
		if(V[column+9*j]==x) return false;
	}

	if(line<3) line = 0;
	else if(line<6) line = 3;
	else line = 6;
	
	if(column<3) column = 0;
	else if(column<6) column = 3;
	else column = 6;

	for(var j = 0; j<3;j++){
		for(var k = 0; k<3;k++){
			if(V[(line+j)*9 + (column+k)]==x) return false;
		}			
	}

	return true;
}	


/**

Escreve o vetor/matriz resultado, utilizando linhas de uma table html
*/
function print(V){
	
		var table = "<table style='float:left;' >";
		table+="<tr>"
		for (var i = 0; i < V.length; i++) {
			if(i%9==0) table += "</tr><tr>";

			if(i%27==0) table += "<tr><td  colspan='9'>&nbsp;</td></tr>";

			if(i%3==0) table += "<td >&nbsp;</td>";

			table +="<td style='border: solid 1px;margin=0;padding:1em;'>"+(V[i]==0?"&nbsp;":V[i])+"<td>";
		};			
		table+="</tr>"
		table += "<table>";

		AsyncWrite(table);			
		//document.getElementById("sudokutable").innerHTML  = table;	
}


/**
Escreve uma string no documento de maneira assincrona, sem bloquear o navegador duarante a execucao
*/
function AsyncWrite(table){
	setTimeout(function(params){
			if(!writing){
				writing = true;
				document.getElementById("sudokutable").innerHTML  = params[0];	
				setTimeout(function(){writing  = false;},10);				
			}else{
				AsyncWrite(table);
			}
	},10,[table]);
}

var writing = false;


/**
Resolve um problema do tipo sudoku, a partir de uma matriz "V" e uma posicao inicial "i"
*/
function SDK(i,V){
	if(i>81) {
		print(V);
		return true;	
	}
	if(V[i] != 0 ) return SDK(i+1,V);			
	for(var k = 1;k<=9;k++){
		if(validmove(k,i,V)){
			V[i] = k;
			print(V);
			if(SDK(i+1,V)) return true;			
		}
	}
	V[i] = 0;
	return false;
}

		