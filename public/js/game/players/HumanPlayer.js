import Player from "./Player";

class HumanPlayer extends Player {

	constructor()
	{
		super();

		this.promise = null;
		this.resolvePromise = null;
	}

	move()
	{
		this.promise = new Promise((resolve) => {
			this.resolvePromise = resolve;
		});

		return this.promise;
	}

	handleMoveRequest(move)
	{
		return this.resolvePromise(move);
	}

}

export default HumanPlayer;