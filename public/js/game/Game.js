import Board from "./Board"

class Game {

	constructor()
	{
		this.board = new Board();
	}

	getBoard()
	{
		return this.board;
	}
}

export default Game;