import React, { Component } from "react";
import Header from "./header/component"
import Home from "../../home/component"
import { Route } from "react-router-dom";
import GameUI from "../../game/ui/component"
import "./style.scss"

class Body extends Component {
	render() {
		return (
			<div className="cmp-body">
				<Header />

				<Route exact path="/" component={Home}/>
				<Route path="/play" component={GameUI}/>
			</div>
		);
	}
}

export default Body;