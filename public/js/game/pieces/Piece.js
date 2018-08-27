import Move from "../Move"

class Piece {

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
		if (!this.isEligibleToMove())
			return [];

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

	isEligibleToMove()
	{
		let lastMove = this.board.getLastMove();

		if (!lastMove)
			return true;

		if (lastMove.isCapture && lastMove.piece.isOnSameTeam(this) && lastMove.piece.id !== this.id)
		{
			return false
		}

		if (!this.getCaptureMoves().length && this.teamPieceCanCapture())
			return false;

		return true;
	}

	canMoveTo(square)
	{
		if (square.piece)
			return false;

		return this.getMoves().filter((move) => move.toSquare.number == square.number).length;
	}

	teamPieceCanCapture()
	{
		let playerNumber = this.belongsToPlayerNumber(1) ?  1 : 2,
			canCapture = false;

		this.board.iteratePieces(playerNumber, (piece) =>
		{
			if (piece.getCaptureMoves().length)
			{
				canCapture = true;

				return false;
			}
		});

		return canCapture;
	}

	isOnSameTeam(piece)
	{
		return this.isFirstPlayer === piece.isFirstPlayer;
	}

	buildMoves(toSquares)
	{
		return toSquares.map((toSquare) => {
			return new Move(this, this.square, toSquare);
		});
	}

}

export default Piece;