import { useContext } from "react";
import TheContext from "../TheContext";

export default function Profile() {
	const { user } = useContext(TheContext);
	return <>
		Profile
		<p>{user.name}</p>
		<p>{user.email}</p>
		<img src={user?.picture} referrerPolicy="no-referrer" />
	</>
}