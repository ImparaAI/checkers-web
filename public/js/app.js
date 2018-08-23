import React from 'react'
import ReactDOM from "react-dom";
import Body from "./structure/body/component"
import Header from "./structure/header/component"
import Footer from "./structure/footer/component"
import "../sass/style.scss"

const element = (
	<div>
		<Header/>
		<Body/>
		<Footer/>
	</div>
);

ReactDOM.render(
  element,
  document.getElementById('app')
);