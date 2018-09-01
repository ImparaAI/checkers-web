import Board from "./Board"
import Move from "./Move"
import NullPlayer from "./players/NullPlayer"

class Game {

	constructor(player1, player2)
	{
		this.board = new Board();
		this.player1 = player1 || new NullPlayer;
		this.player2 = player2 || new NullPlayer;
		this.currentPlayer = this.player1;
		this.player1.number = 1;
		this.player2.number = 2;
		this.gameOver = false;
		this.winner = null;
	}

	progress(turnCallback)
	{
		this.currentPlayer.move(this).then((move) =>
		{
			this.move(move);

			if (turnCallback)
			{
				turnCallback().then(() => this.progress(turnCallback));
			}

			else
				this.progress();
		});
	}

	move(move)
	{
		if (Array.isArray(move))
			move = this.buildMoveFromSquareNumbers(...move);

		this.board.applyMove(move);
		this.currentPlayer = this.getNextPlayer();

		if (this.gameIsOver())
			return this.endGame();
	}

	getNextPlayer()
	{
		let lastMove = this.board.getLastMove();

		if (!lastMove)
			return this.player1;

		if (this.playerShouldMoveAgain(lastMove))
		{
			return this.getOwnerPlayer(lastMove.piece);
		}

		return this.getOwnerPlayer(lastMove.piece).number == 1 ? this.player2 : this.player1;
	}

	playerShouldMoveAgain(lastMove)
	{
		if (!lastMove.isCapture)
			return false;

		return lastMove.piece.getCaptureMoves().length > 0;
	}

	gameIsOver()
	{
		return !this.board.getPlayerMoves(this.currentPlayer).length;
	}

	endGame()
	{
		this.gameOver = true;
		this.winner = this.currentPlayer.number == 1 ? this.player2 : this.player1;
	}

	getOwnerPlayer(piece)
	{
		return piece.belongsToPlayerNumber(1) ? this.player1 : this.player2;
	}

	buildMoveFromSquareNumbers(fromNumber, toNumber)
	{
		let fromSquare = this.board.getSquareByNumber(fromNumber),
			toSquare = this.board.getSquareByNumber(toNumber);

		return new Move(fromSquare.piece, fromSquare, toSquare);
	}

	getPossibleMoves()
	{
		return this.board.getPlayerMoves(this.currentPlayer);
	}

}

export default Game;