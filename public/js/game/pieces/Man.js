class Man {

	constructor(id, isFirstPlayer, square, board)
	{
		this.id = id;
		this.isFirstPlayer = isFirstPlayer;
		this.square = square;
		this.board = board;
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

		return neighbors.filter((square) =>
		{
			if (square.piece)
				return false;

			if (this.isFirstPlayer && square.number < this.square.number)
				return false;

			if (!this.isFirstPlayer && square.number > this.square.number)
				return false;

			return true;
		});
	}

	getCaptureMoves()
	{
		let distantNeighbors = this.board.getNeighboringSquares(this.square, 2);

		return distantNeighbors.filter((square) =>
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
	}

	canMoveTo(square)
	{
		if (square.piece)
			return false;

		return this.getMoves().filter((move) => move.number == square.number).length;
	}

}

export default Man;