import React, { Component } from "react"
import classNames from 'classnames';
import Game from "../Game"
import "./style.scss"

class GameUI extends Component {

	constructor(props)
	{
		super(props);
		this.squareSize = 100;
		this.state = {
			game: new Game(),
			selectedPiece: null,
			availableMoves: [],
		};
	}

	render()
	{
		return (
			<div className="cmp-game-ui">
				<div className="cmp-game-ui__board" style={{width: this.squareSize * 8}}>
					{this.buildRows()}
				</div>
			</div>
		);
	}

	buildRows()
	{
		return this.state.game.board.squares.map((row, index) =>
		(
			<div key={index} className="cmp-game-ui__board-row c-flex">
				{this.buildSquares(row)}
			</div>
		));
	}

	buildSquares(row)
	{
		return row.map((square) =>
		{
			let classes = {
				'cmp-game-ui__square': true,
				'cmp-game-ui__square--dark': !!square.number
			};

			return ( <div key={square.id} className={classNames(classes)} style={{width: this.squareSize, height: this.squareSize}}
					      onClick={this.squareClicked.bind(this, square)}>

					<span className="cmp-game-ui__square-number">{square.number}</span>

					{this.buildMoveHint(square)}

					{square.piece && this.buildPiece(square.piece)}
				</div>
			);
		});
	}

	buildPiece(piece)
	{
		let classes = [
			'cmp-game-ui__piece',
			'cmp-game-ui__piece--' + (piece.isFirstPlayer ? 'first-player' : 'second-player')
		];

		return (
			<div className="cmp-game-ui__piece-container">
				<div className={classNames(classes)}>
					{this.state.selectedPiece && this.state.selectedPiece.id === piece.id && <div className="cmp-game-ui__piece-selection"></div>}
				</div>
			</div>
		);
	}

	buildMoveHint(square)
	{
		// console.log('test', this.state.availableMoves);
		for (var i = this.state.availableMoves.length - 1; i >= 0; i--)
		{
			// console.log(this.state.availableMoves[i].number , square.number);
			if (this.state.availableMoves[i].number === square.number)
			{
				return (
					<div className="cmp-game-ui__move-hint-container">
						<div className="cmp-game-ui__move-hint"></div>
					</div>
				);

			}
		}
	}

	squareClicked(square)
	{
		if (square.piece)
		{
			let piecePlayerNumber = square.piece.isFirstPlayer ? 1 : 2;

			if (this.state.game.currentPlayer.number === piecePlayerNumber)
			{
				this.setState({
					selectedPiece: square.piece,
					availableMoves: square.piece.getMoves(),
				});
			}

			return;
		}

		if (this.state.selectedPiece && this.state.selectedPiece.canMoveTo(square))
		{
			this.state.game.move(this.state.selectedPiece, square);

			return this.setState({selectedPiece: null, availableMoves: []});
		}



return;
		this.forceUpdate();

		this.state.game.move(piece, square);

	}

}

export default GameUI;