class Player {

	constructor(number)
	{
		this.number = number;

		this.isTurn = false;
		this.promise = null;
		this.resolvePromise = null;
	}

	move()
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

export default Player;