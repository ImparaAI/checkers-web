import Player from "./Player";

class HumanPlayer extends Player {

	constructor(number)
	{
		super(number);

		this.isTurn = false;
		this.promise = null;
		this.resolvePromise = null;
	}

	move(board)
	{
		this.isTurn = true;
		this.promise = new Promise((resolve) => {
			this.resolvePromise = resolve;
		});

		return this.promise;
	}

	handleMoveRequest(move)
	{
		this.isTurn = false;

		return this.resolvePromise(move);
	}

}

export default HumanPlayer;