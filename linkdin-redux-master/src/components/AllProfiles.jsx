import { useSelector } from "react-redux";
import { Button, Card, CardBody, Col, Row } from "react-bootstrap";
import { HiCheck, HiUserPlus } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export const getConnectedProfilesCount = () => {
	const connectedProfiles = JSON.parse(localStorage.getItem("connectedProfiles")) || [];
	return connectedProfiles.length;
};

const AllProfiles = () => {
	const profiles = useSelector((state) => state.fetchAllProfiles.data);
	const [connectedProfiles, setConnectedProfiles] = useState(
		JSON.parse(localStorage.getItem("connectedProfiles")) || []
	);

	useEffect(() => {
		setConnectedProfiles(JSON.parse(localStorage.getItem("connectedProfiles")) || []);
	}, [profiles]);

	const toggleConnection = (profileId) => {
		let updatedConnectedProfiles;
		if (connectedProfiles.includes(profileId)) {
			updatedConnectedProfiles = connectedProfiles.filter((id) => id !== profileId);
		} else {
			updatedConnectedProfiles = [...connectedProfiles, profileId];
		}
		localStorage.setItem("connectedProfiles", JSON.stringify(updatedConnectedProfiles));
		setConnectedProfiles(updatedConnectedProfiles);
	};

	return (
		<>
			<h2 className="mt-4 mb-3 fs-1">Profili consigliati</h2>
			<Row xs={1} sm={2} md={3} lg={4} className="my-3">
				{profiles &&
					profiles.map((profile) => (
						<Col key={"profile" + profile._id} className="my-2">
							<Card className="h-100 shadow">
								<CardBody className="d-flex flex-column">
									<div className="d-flex align-items-start mb-auto pt-2 pb-3">
										<NavLink to={`/profile/${profile._id}`}>
											<img
												src={profile && profile.image}
												className="rounded-circle me-2"
												style={{ width: "48px", height: "48px" }}
												alt="Profile"
											/>
										</NavLink>
										<div className="ms-1">
											<NavLink to={`/profile/${profile._id}`} className="undecorated">
												{profile && profile.name} {"  "}
												{profile && profile.surname}
											</NavLink>
											<div className="text-muted">{profile && profile.title}</div>
										</div>
									</div>
									<div className="d-flex align-items-center mx-auto">
										<Button
											variant={connectedProfiles.includes(profile._id) ? "outline-primary" : "outline-secondary"}
											onClick={() => toggleConnection(profile._id)}
											className={`rounded-pill ps-2 pe-3 mt-3 pb-2 py-1 text-center ${
												connectedProfiles.includes(profile._id) ? "btn btn-outline-primary" : ""
											}`}
										>
											{connectedProfiles.includes(profile._id) ? (
												<HiCheck className="mx-1" />
											) : (
												<HiUserPlus className="mx-1" />
											)}
											{connectedProfiles.includes(profile._id) ? "Collegato" : "Collegati"}
										</Button>
									</div>
								</CardBody>
							</Card>
						</Col>
					))}
			</Row>
		</>
	);
};

export default AllProfiles;
