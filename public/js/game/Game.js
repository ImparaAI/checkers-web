import Board from "./Board"
import HumanPlayer from "./players/HumanPlayer"
import AlphaBetaPlayer from "./players/AlphaBetaPlayer"

class Game {

	constructor()
	{
		this.board = new Board();
		this.player1 = new HumanPlayer(1);
		this.player2 = new AlphaBetaPlayer(2);
		this.currentPlayer = this.player1;
		this.gameOver = false;
		this.winner = null;
	}

	progress(turnCallback)
	{
		if (this.gameIsOver())
			return this.endGame();

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
		this.board.applyMove(move);
		this.currentPlayer = this.getNextPlayer();
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

}

export default Game;