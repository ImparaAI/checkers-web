import React from 'react'
import ReactDOM from "react-dom";
import Header from "./structure/header/component"
import Footer from "./structure/footer/component"

const element = (
	<div>
		<Header/>
		<Footer/>
	</div>
);

ReactDOM.render(
  element,
  document.getElementById('app')
);