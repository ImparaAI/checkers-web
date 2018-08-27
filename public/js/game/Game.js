import Board from "./Board"
import HumanPlayer from "./players/HumanPlayer"
import RandomPlayer from "./players/RandomPlayer"

class Game {

	constructor()
	{
		this.board = new Board();
		this.player1 = new HumanPlayer(1);
		this.player2 = new RandomPlayer(2);
		this.currentPlayer = this.player1;
	}

	progress(turnCallback)
	{
		if (this.gameIsOver())
			return this.endGame();

		this.currentPlayer.move(this.board).then((move) =>
		{
			this.board.applyMove(move);
			this.currentPlayer = this.getNextPlayer();

			if (turnCallback)
				turnCallback();

			this.progress(turnCallback);
		});
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

	move(piece, toSquare)
	{
		this.board.move(piece, toSquare);

		this.currentPlayer = this.currentPlayer.number == 1 ? this.player2 : this.player1;
	}

	getOwnerPlayer(piece)
	{
		return piece.belongsToPlayerNumber(1) ? this.player1 : this.player2;
	}

}

export default Game;