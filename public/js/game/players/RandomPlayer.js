import Player from "./Player";

class HumanPlayer extends Player {

	move(board)
	{
		let moves = board.getPlayerMoves(this),
			move = moves[Math.floor(Math.random()*moves.length)];

		return Promise.resolve(move);
	}

}

export default HumanPlayer;