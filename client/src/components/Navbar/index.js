import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";

import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
	const { loggedIn, user } = useAuth();
	const { items } = useBasket();

	return (
		<nav className={styles.nav}>
			<div className={styles.left}>
				<div className={styles.logo}>
					<Link to="/">eCommerce</Link>
				</div>

				<ul className={styles.menu}>
					<li>
						<Link to="/">Products</Link>
					</li>
				</ul>
			</div>

			<div className={styles.right}>
				{/* For users that are not logged in */}
				{!loggedIn && (
					<>
						<Link to="/signIn">
							<Button colorScheme="pink">Login</Button>
						</Link>
						<Link to="/signUp">
							<Button colorScheme="pink">Register</Button>
						</Link>
					</>
				)}

				{/* For users that are logged in */}
				{loggedIn && (
					<>
						{items.length > 0 && (
							<Link to="/basket">
								<Button colorScheme="pink" variant="outline">
									Basket ({items.length})
								</Button>
							</Link>
						)}

            {/* For admins showing admin console */}
						{user?.role === "admin" && (
							<Link to="/admin">
								<Button colorScheme="pink" variant="ghost">
									Admin
								</Button>
							</Link>
						)}

						<Link to="/profile">
							<Button colorScheme="pink">Profile</Button>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
