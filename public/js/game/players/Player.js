class Player {

	constructor(number)
	{
		this.number = number;

		this.isTurn = false;
		this.promise = null;
		this.resolvePromise = null;
	}

}

export default Player;