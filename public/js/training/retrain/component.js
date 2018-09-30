import "./style.scss"
import axios from 'axios'
import React, { Component } from "react"

class Retrain extends Component {
	render() {
		return (
			<div className="cmp-retrain">
				<button onClick={this.retrain} className="c-button c-button--big c-button--gray">Retrain the AI</button>
			</div>
		);
	}

	retrain = () => {
		return axios.post('/training/session', {secondsLimit: 700}).then(response => this.props.history.push('/sessions'));
	}
}

export default Retrain;