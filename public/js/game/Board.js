import Man from "./pieces/Man"

class Board {

	constructor()
	{
		this.numRows = 8;
		this.numCols = 8;
		this.squares = [];
		this.moves = [];

		this.buildSquares();
		this.buildPieces();
	}

	buildSquares()
	{
		this.squares = [];
		let id = 0,
			darkSquareCount = 1;

		for (let rowIndex = 0; rowIndex < this.numRows; rowIndex++)
		{
			let row = [];

			for (let colIndex = 0; colIndex < this.numCols; colIndex++)
			{
				row.push({
					id: id++,
					row: rowIndex,
					column: colIndex,
					number: this.isDarkSquare(rowIndex, colIndex) ? darkSquareCount++ : null,
					piece: null,
				});
			}

			this.squares.push(row);
		}
	}

	buildPieces()
	{
		let pieceId = 1,
			firstPlayerPositions = [[0, 1], [0, 3], [0, 5], [0, 7], [1, 0], [1, 2], [1, 4], [1, 6], [2, 1], [2, 3], [2, 5], [2, 7]],
			secondPlayerPositions = [[5, 0], [5, 2], [5, 4], [5, 6], [6, 1], [6, 3], [6, 5], [6, 7], [7, 0], [7, 2], [7, 4], [7, 6]];

		for (let i = 0; i < firstPlayerPositions.length; i++)
		{
			let isFirstPlayer = true,
				square = this.squares[firstPlayerPositions[i][0]][firstPlayerPositions[i][1]];

			square.piece = new Man(pieceId++, isFirstPlayer, square, this);
		}

		for (let i = 0; i < secondPlayerPositions.length; i++)
		{
			let isFirstPlayer = false,
				square = this.squares[secondPlayerPositions[i][0]][secondPlayerPositions[i][1]];

			square.piece = new Man(pieceId++, isFirstPlayer, square, this);
		}
	}

	getLastMove()
	{
		if (this.moves.length)
		{
			return this.moves[this.moves.length -1];
		}
	}

	move(piece, toSquare)
	{
		//maybe check if it is a valid move

		let fromSquare = piece.square;

		piece.square = toSquare;
		toSquare.piece = piece;
		fromSquare.piece = null;

		if (Math.abs(toSquare.row - fromSquare.row) > 1)
			this.getMiddleSquare(toSquare, fromSquare).piece = null;
	}

	isDarkSquare(row, column)
	{
		if (row % 2 == 0)
		{
			//even numbered row and odd column number == dark
			return column % 2 != 0;
		}

		//odd numbered row and even column number == dark
		return column % 2 == 0;
	}

	getNeighboringSquares(square, offset = 1)
	{
		let neighbors = [],
			relativePositions = [[-offset, -offset], [-offset, offset], [offset, offset], [offset, -offset]];

		for (var i = 0; i < relativePositions.length; i++)
		{
			let row = square.row + relativePositions[i][0],
			    column = square.column + relativePositions[i][1];

			if (this.isValidCoordinate(row, column))
			{
				neighbors.push(this.squares[row][column]);
			}
		}

		return neighbors;
	}

	getMiddleSquare(squareA, squareB)
	{
		let row = (squareA.row + squareB.row) / 2,
			column = (squareA.column + squareB.column) / 2;

		return this.squares[row][column];
	}

	isValidCoordinate(row, column)
	{
		let rowValid = row >= 0 && row < this.numRows,
			colValid = column >= 0 && column < this.numCols;

		return rowValid && colValid;
	}

}

export default Board;