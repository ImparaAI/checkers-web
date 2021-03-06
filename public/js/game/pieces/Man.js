import Piece from "./Piece"

class Man extends Piece {

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

			if (!middleSquare.piece || this.isOnSameTeam(middleSquare.piece))
				return false;

			if (this.isFirstPlayer && square.number < this.square.number)
				return false;

			if (!this.isFirstPlayer && square.number > this.square.number)
				return false;


			return true;
		});

		return this.buildMoves(distantNeighbors);
	}

}

export default Man;