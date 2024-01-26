import React from "react";
import { Card, ListGroup, Button, Row, Col, ListGroupItem, CardText, CardBody } from "react-bootstrap";
import { FaHashtag, FaCalendarPlus } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getConnectedProfilesCount } from "../AllProfiles";

const ProfileCardHome = () => {
	const location = useLocation();
	const profile = useSelector((state) => state.fetchMyProfile.data);

	return (
		<>
			<Card className="">
				<Card.Header
					className="bg-primary text-white position-relative"
					style={{ height: "50px", borderRadius: "8px 8px 0 0" }}
				>
					<Link to="/profile/me" className="nav-link">
						<Card.Img
							variant="top"
							src={profile && profile.image}
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -20%)",
								width: "80px",
								height: "80px",
								border: "4px solid white",
								borderRadius: "50%",
								backgroundColor: "gray",
							}}
						/>
					</Link>
				</Card.Header>
				<Card.Body className="px-1">
					{location.pathname === "/profile/me" && (
						<div className="d-flex justify-content-end">
							<Button className="pencil px-2">
								<GoPencil className="fs-4" />
							</Button>
						</div>
					)}
					<Card.Title className="text-center fs-5 mt-4 mb-0">
						<Link to={"/profile/me"} style={{ textDecoration: "none", color: "black" }}>
							{profile && profile.name + " " + profile.surname}
						</Link>
					</Card.Title>
					<div className="text-center">
						<small className="mb-2 text-muted ">{profile && profile.title}</small>
					</div>
				</Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroup.Item>
						<Row>
							<Col>
								<div className="d-flex justify-content-between align-items-baseline">
									<Link to={"/connectedProfiles"} className="undecorated mb-0">
										Collegamenti
									</Link>
									<small className="text-muted">{getConnectedProfilesCount()}</small>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								<Link to={"/profile"} className="undecorated mb-0">
									Espandi la tua rete
								</Link>
							</Col>
						</Row>
					</ListGroup.Item>
					<ListGroup.Item>
						<Link className="undecorated mb-0">Dai una spinta alla tua carriera</Link>
					</ListGroup.Item>
					<ListGroup.Item></ListGroup.Item>
				</ListGroup>
			</Card>

			<Card className="my-3">
				<ListGroup className="list-group-flush">
					<ListGroup.Item>
						<Link className="undecorated mb-0">Gruppi</Link>
					</ListGroup.Item>
					<ListGroup.Item className="d-flex align-items-center">
						<FaHashtag className="text-muted me-2" />
						<Link className="undecorated mb-0">Hashtag seguiti</Link>
					</ListGroup.Item>
					<ListGroup.Item className="d-flex align-items-center">
						<FaCalendarPlus className="text-muted me-2" />
						<Link className="undecorated mb-0">Eventi</Link>
					</ListGroup.Item>
				</ListGroup>
				<Card.Footer>
					<Link className="undecorated mb-0">
						<small>Scopri di più</small>
					</Link>
				</Card.Footer>
			</Card>
		</>
	);
};

export default ProfileCardHome;
