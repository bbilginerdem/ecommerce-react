import { useState, createContext, useEffect, useContext } from "react";
import { fetchMe, fetchLogout } from "../api";

import { Flex, Spinner } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // first visited user is not logged in
  const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
      try {
        // using fetchMe API to get user information
				const me = await fetchMe();

				setLoggedIn(true);
				setUser(me);
				setLoading(false);
			} catch (e) {
				setLoading(false);
			}
		})();
	}, []);

	const login = (data) => {
		setLoggedIn(true);
		setUser(data.user);

		localStorage.setItem("access-token", data.accessToken);
		localStorage.setItem("refresh-token", data.refreshToken);
	};

	const logout = async (callback) => {
		setLoggedIn(false);
		setUser(null);

		await fetchLogout();

		localStorage.removeItem("access-token");
		localStorage.removeItem("refresh-token");

		callback();
	};

	const values = {
		loggedIn,
		user,
		login,
		logout,
	};

  // to do lazy loading, we need to wait for the loading to be finished before rendering the children. Since otherwise, signin/signup shows at first
	if (loading) {
		return (
			<Flex justifyContent="center" alignItems="center" height="100vh">
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.2000"
					size="xl"
					color="red"
				></Spinner>
			</Flex>
		);
	}

	return (
		<AuthContext.Provider value={values}>{children}</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
