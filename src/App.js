import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";

import Homepage from "./pages/homepage";
import Products from "./pages/products";
import ProductDetail from "./pages/productDetail";
import Games from "./pages/games";
import Village from "./pages/village";
import Play from "./pages/play";
import Projects from "./pages/projects";
import Contact from "./pages/contact";
import Notfound from "./pages/404";

import { TRACKING_ID } from "./data/tracking";
import "./site/site.css";

function App() {
	useEffect(() => {
		if (TRACKING_ID !== "") {
			ReactGA.initialize(TRACKING_ID);
		}
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/products" element={<Products />} />
				<Route path="/products/:slug" element={<ProductDetail />} />
				<Route path="/games" element={<Games />} />
				<Route path="/games/tiny-wars" element={<Village />} />
				<Route path="/games/tiny-wars/play" element={<Play />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<Notfound />} />
			</Routes>
		</div>
	);
}

export default App;
