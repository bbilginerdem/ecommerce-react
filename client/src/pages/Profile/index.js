import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import { Text, Button } from "@chakra-ui/react";

function Profile() {
	const { user, logout } = useAuth();
	let history = useHistory();

	const handleLogout = async () => {
		logout(() => {
			history.push("/");
		});
	};

	return (
		<div>
			<Text fontSize="22">Profile</Text>
			<code>{JSON.stringify(user)}</code>

			<br />
			<br />
			<Button colorScheme="pink" variant="solid" onClick={handleLogout}>
				Logout
			</Button>
		</div>
	);
}

export default Profile;
