import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";

import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Products from "./pages/Products";

function App() {
	return (
		<Router>
			<div>
				<Navbar />
				<div id="content">
					<Switch>
						<Route path="/" exact component={Products} />
						<Route path="/signIn" component={SignIn} />
						<Route path="/signUp" component={SignUp} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

function Home() {
	return <h2>Home</h2>;
}

export default App;
