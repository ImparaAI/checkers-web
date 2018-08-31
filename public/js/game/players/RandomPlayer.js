import Player from "./Player";

class RandomPlayer extends Player {

	move(game)
	{
		let moves = game.board.getPlayerMoves(this),
			move = moves[Math.floor(Math.random()*moves.length)];

		return Promise.resolve(move);
	}

}

export default RandomPlayer;