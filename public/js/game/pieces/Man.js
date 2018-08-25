import Move from "../Move"

class Man {

	constructor(id, isFirstPlayer, square, board)
	{
		this.id = id;
		this.isFirstPlayer = isFirstPlayer;
		this.square = square;
		this.board = board;
	}

	belongsToPlayerNumber(playerNumber)
	{
		return this.isFirstPlayer ? playerNumber === 1 : playerNumber === 2;
	}

	getMoves()
	{
		let captureMoves = this.getCaptureMoves();

		if (captureMoves.length)
			return captureMoves;

		return this.getSimpleMoves();
	}

	getSimpleMoves()
	{
		let neighbors = this.board.getNeighboringSquares(this.square);

		neighbors = neighbors.filter((square) =>
		{
			if (square.piece)
				return false;

			if (this.isFirstPlayer && square.number < this.square.number)
				return false;

			if (!this.isFirstPlayer && square.number > this.square.number)
				return false;

			return true;
		});

		return this.buildMoves(neighbors);
	}

	getCaptureMoves()
	{
		let distantNeighbors = this.board.getNeighboringSquares(this.square, 2);

		distantNeighbors = distantNeighbors.filter((square) =>
		{
			let middleSquare = this.board.getMiddleSquare(square, this.square);

			if (square.piece)
				return false;

			if (!middleSquare.piece || middleSquare.piece.isFirstPlayer == this.isFirstPlayer)
				return false;

			if (this.isFirstPlayer && square.number < this.square.number)
				return false;

			if (!this.isFirstPlayer && square.number > this.square.number)
				return false;


			return true;
		});

		return this.buildMoves(distantNeighbors);
	}

	buildMoves(toSquares)
	{
		return toSquares.map((toSquare) => {
			return new Move(this, this.square, toSquare);
		});
	}

	canMoveTo(square)
	{
		if (square.piece)
			return false;

		return this.getMoves().filter((move) => move.toSquare.number == square.number).length;
	}

}

export default Man;