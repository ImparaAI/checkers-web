import Player from "./Player";
import axios from 'axios'

class HttpPlayer extends Player {

	constructor(url)
	{
		super();

		this.url = url;
	}

	move(game)
	{
		let moves = JSON.stringify(this.getMoves(game));

		return axios.get(this.url, {params:{moves: moves}}).then(response => response.data.move);
	}

	getMoves(game)
	{
		return game.board.moveHistory.map((move) => [move.fromSquare.number, move.toSquare.number]);
	}

}

export default HttpPlayer;