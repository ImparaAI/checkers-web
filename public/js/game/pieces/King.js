import Piece from "./Piece"

class King extends Piece {

	getSimpleMoves()
	{
		let neighbors = this.board.getNeighboringSquares(this.square);

		neighbors = neighbors.filter((square) =>
		{
			if (square.piece)
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

			return true;
		});

		return this.buildMoves(distantNeighbors);
	}

}

export default King;