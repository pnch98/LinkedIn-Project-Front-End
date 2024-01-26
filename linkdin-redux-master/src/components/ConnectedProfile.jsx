import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const ConnectedProfile = () => {
	const profiles = useSelector((state) => state.fetchAllProfiles.data);
	const [connectedProfileIds, setConnectedProfileIds] = useState(
		JSON.parse(localStorage.getItem("connectedProfiles")) || []
	);

	useEffect(() => {
		setConnectedProfileIds(JSON.parse(localStorage.getItem("connectedProfiles")) || []);
	}, [profiles]);

	const toggleConnection = (profileId) => {
		let updatedConnectedProfiles;
		if (connectedProfileIds.includes(profileId)) {
			updatedConnectedProfiles = connectedProfileIds.filter((id) => id !== profileId);
		} else {
			updatedConnectedProfiles = [...connectedProfileIds, profileId];
		}
		localStorage.setItem("connectedProfiles", JSON.stringify(updatedConnectedProfiles));
		setConnectedProfileIds(updatedConnectedProfiles);
	};

	const connectedProfiles = profiles?.filter((profile) => connectedProfileIds.includes(profile._id));
	return (
		<Container>
			<Row className="my-4" xs={4}>
				{connectedProfiles.length > 0 ? (
					connectedProfiles.map((profile) => (
						<ProfileCard
							key={profile._id}
							profile={profile}
							isConnected={connectedProfileIds.includes(profile._id)}
							toggleConnection={toggleConnection}
						/>
					))
				) : (
					<Alert variant="primary" className="mt-3">
						<h3>Non sei ancora collegato a nessun profilo.</h3>
						<Link to={"/profile"} className="undecorated">
							Collegati
						</Link>
					</Alert>
				)}
			</Row>
		</Container>
	);
};

export default ConnectedProfile;
