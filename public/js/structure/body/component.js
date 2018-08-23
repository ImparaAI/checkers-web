import React, { Component } from "react";
import GameUI from "../../game/ui/component"
import "./style.scss"

class Body extends Component {
  render() {
    return (
        <div className="cmp-body">
        	<GameUI />
        </div>
    );
  }
}

export default Body;