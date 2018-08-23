import React, { Component } from "react"
import classNames from 'classnames';
import Game from "../Game"
import "./style.scss"

class GameUI extends Component {

	constructor(props)
	{
		super(props);
		this.state = {
			game: new Game()
		};
	}

	render()
	{
		return (
			<div className="cmp-game-ui">
				<div className="cmp-game-ui__board">
					{this.buildRows()}
				</div>
			</div>
		);
	}

	buildRows()
	{
		console.log(this.state.game.board.getVisualState());

		return this.state.game.board.getVisualState().map((row, index) =>
		(
			<div key={index} className="cmp-game-ui__board-row c-flex">
				{this.buildRowSquares(row)}
			</div>
		))
	}

	buildRowSquares(row)
	{
		return row.map((square) =>
		(
			<div key={square.uniqueId} className={classNames('cmp-game-ui__board-square ', {'cmp-game-ui__board-square--dark': square.isDarkSquare})}>
				{square.number}
			</div>
		));
	}

}

export default GameUI;