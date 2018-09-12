import Player from "./Player";
import axios from 'axios'

class HttpPlayer extends Player {

	constructor(url)
	{
		super();

		this.url = url;
	}

	move()
	{
		return axios.get(this.url).then(response => response.data.move)
	}

}

export default HttpPlayer;