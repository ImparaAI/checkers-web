import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import "./style.scss"

class Header extends Component {
	render() {
		return (
			<div className="cmp-body-header">
				<div className="cmp-body-header__title">AI Checkers</div>
				<div className="cmp-body-header__subtitle">by <a className="c-link c-link--undecorated" href="https://github.com/ImparaAI" target="_blank">ImparaAI</a></div>

				<div className="cmp-body-header__menu c-flex c-flex--space-between">
					<div>
						<NavLink to="/play"
						         className="c-link c-link--undecorated c-link--unselectable cmp-body-header__menu-link"
						         activeClassName="cmp-body-header__menu-link--active">Play</NavLink>
					</div>
					<div>
						<NavLink to="/training/sessions"
						         className="c-link c-link--undecorated c-link--unselectable cmp-body-header__menu-link"
						         activeClassName="cmp-body-header__menu-link--active">Training Sessions</NavLink>
					</div>
					<div>
						<NavLink to="/training/session/restart"
						         className="c-link c-link--undecorated c-link--unselectable cmp-body-header__menu-link"
						         activeClassName="cmp-body-header__menu-link--active">Retrain</NavLink>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;