import React, { Component } from "react"
import classNames from 'classnames';
import Game from "../Game"
import Move from "../Move"
import King from "../pieces/King"
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


		this.state.game.progress((this.updateOnMove).bind(this));
	}

	updateOnMove()
	{
		this.forceUpdate();
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
			'cmp-game-ui__piece--' + (piece.isFirstPlayer ? 'first-player' : 'second-player'),
			{'cmp-game-ui__piece--king': piece instanceof King }
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
		for (var i = this.state.availableMoves.length - 1; i >= 0; i--)
		{
			if (this.state.availableMoves[i].toSquare.number === square.number)
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
			if (square.piece.belongsToPlayerNumber(this.state.game.currentPlayer.number) && square.piece.getMoves().length)
			{
				this.setState({
					selectedPiece: square.piece,
					availableMoves: square.piece.getMoves(),
				});
			}
		}

		else if (this.state.selectedPiece && this.state.selectedPiece.canMoveTo(square))
		{
			let player = this.state.game.getOwnerPlayer(this.state.selectedPiece);

			player.promise.then((move) =>
			{
				if (move.isCapture && move.piece.getCaptureMoves().length)
				{
					this.setState({availableMoves: move.piece.getMoves()})
				}

				else
					this.setState({selectedPiece: null, availableMoves: []})
			});

			player.handleMoveRequest(new Move(this.state.selectedPiece, this.state.selectedPiece.square, square));
		}

	}

}

export default GameUI;