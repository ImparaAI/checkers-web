import Man from "./pieces/Man"

class Board {

	constructor()
	{
		this.squares = [
			this.buildMan('top'), this.buildMan('top'), this.buildMan('top'), this.buildMan('top'),
			this.buildMan('top'), this.buildMan('top'), this.buildMan('top'), this.buildMan('top'),
			this.buildMan('top'), this.buildMan('top'), this.buildMan('top'), this.buildMan('top'),
			null,                 null,                 null,                 null,
			null,                 null,                 null,                 null,
			this.buildMan('bottom'), this.buildMan('bottom'), this.buildMan('bottom'), this.buildMan('bottom'),
			this.buildMan('bottom'), this.buildMan('bottom'), this.buildMan('bottom'), this.buildMan('bottom'),
			this.buildMan('bottom'), this.buildMan('bottom'), this.buildMan('bottom'), this.buildMan('bottom'),
		];
	}

	buildMan(position)
	{
		return new Man(this, position);
	}

	getVisualState()
	{
		let rows = [],
			count = 0,
			darkSquareCount = 0;

		for (var row = 0; row < 8; row++)
		{
			let columns = [];

			for (var column = 0; column < 8; column++)
			{
				let isDarkSquare = count % 2 == 1;

				columns.push(
				{
					uniqueId: count,
					isDarkSquare: this.isDarkSquare(row, column),
					number: this.isDarkSquare(row, column) ? ++darkSquareCount : null,
					piece: this.squares[count],
				})

				count++;
			}

			rows.push(columns);
		}

		return rows;
	}

	isDarkSquare(row, column)
	{
		if (row % 2 == 0)
		{
			//even numbered row and odd column number == dark
			return column % 2 != 0;
		}

		//odd numbered row and even column number == dark
		return column % 2 == 0;
	}
}

export default Board;