import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";

function App() {
	return (
		<Router>
			<div>
				<Navbar />
				<div id="content">
					<Switch>
						<Route path="/" exact component={Products} />
						<Route
							path="/product/:product_id"
							component={ProductDetail}
						/>
						<Route path="/signIn" component={SignIn} />
						<Route path="/signUp" component={SignUp} />
						<Route path="/profile" component={Profile} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
