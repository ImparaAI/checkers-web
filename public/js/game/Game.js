import Board from "./Board"
import Player from "./Player"

class Game {

	constructor()
	{
		this.board = new Board();
		this.player1 = new Player(1);
		this.player2 = new Player(2);
		this.currentPlayer = this.player1;
	}

	start()
	{
		this.progress();
	}

	progress()
	{
		if (this.gameIsOver())
			return this.endGame();

		this.currentPlayer.move().then((result) =>
		{
			this.currentPlayer = this.getNextPlayer();

			this.progress();
		});
	}

	getNextPlayer()
	{
		let lastMove = this.board.getLastMove();

		if (!lastMove)
			return this.player1;

		if (self.playerShouldMoveAgain(lastMove))
		{
			return lastMove.player;
		}

		return lastMove.player.number == 1 ? this.player2 : this.player1;
	}

	playerShouldMoveAgain(lastMove)
	{
		if (lastMove.isCapture)
			return false;

		return lastMove.piece.getAvailableCaptures() > 1;
	}

	gameIsOver()
	{
		return !this.getAvailablesMoves(this.currentPlayer).length;
	}

	getAvailablesMoves(player)
	{

	}

	move(piece, toSquare)
	{
		this.board.move(piece, toSquare);

		this.currentPlayer = this.currentPlayer.number == 1 ? this.player2 : this.player1;
	}

}

export default Game;