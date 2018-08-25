class Move {

	constructor(piece, fromSquare, toSquare)
	{
		this.piece = piece;
		this.fromSquare = fromSquare;
		this.toSquare = toSquare;
		this.isCapture = Math.abs(fromSquare.row - toSquare.row) > 1;
	}

}

export default Move;