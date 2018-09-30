import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./style.scss"

class Header extends Component {
	render() {
		return (
			<div className="cmp-body-header">
				<div className="cmp-body-header__title">AI Checkers</div>
				<div className="cmp-body-header__subtitle">by <a className="c-link c-link--undecorated" href="https://github.com/ImparaAI" target="_blank">ImparaAI</a></div>

				<div className="cmp-body-header__menu c-flex c-flex--space-between">
					<div><Link to="/play" className="c-link c-link--undecorated">Play</Link></div>
					<div><Link to="/training/sessions" className="c-link c-link--undecorated">Training Sessions</Link></div>
					<div><Link to="/training/session/restart" className="c-link c-link--undecorated">Retrain</Link></div>
				</div>
			</div>
		);
	}
}

export default Header;