import axios from 'axios'
import Player from './Player'

class HttpPlayer extends Player {

	constructor(url)
	{
		super();

		this.url = url;
	}

	move(game)
	{
		let moves = JSON.stringify(this.getMoves(game));

		return axios.get(this.url, {params:{moves: moves}}).then(response => game.buildMoveFromSquareNumbers(...response.data.move));
	}

	getMoves(game)
	{
		return game.board.moveHistory.map((move) => [move.fromSquare.number, move.toSquare.number]);
	}

}

export default HttpPlayer;