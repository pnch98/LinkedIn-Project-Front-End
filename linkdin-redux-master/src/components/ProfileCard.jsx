import { NavLink } from "react-router-dom";
import { PiPaperPlaneTiltDuotone } from "react-icons/pi";
import { Button, Card, CardBody, Col } from "react-bootstrap";
import { HiCheck, HiUserPlus } from "react-icons/hi2";

const ProfileCard = ({ profile, isConnected, toggleConnection }) => {
	return (
		<Col className="my-1">
			<Card className="d-flex align-items-start pointer">
				<CardBody>
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
						<NavLink to="/messages" className="btn btn-outline-secondary rounded-pill px-2 py-1 my-1 me-2">
							<PiPaperPlaneTiltDuotone className="mx-1" />
							Messaggio
						</NavLink>
						<Button
							variant={isConnected ? "outline-primary" : "outline-secondary"}
							className="rounded-pill px-2 py-1 my-1"
							onClick={() => toggleConnection(profile._id)}
						>
							{isConnected ? (
								<>
									<HiCheck className="mx-1" />
									Già seguito
								</>
							) : (
								<>
									<HiUserPlus className="mx-1" />
									Segui
								</>
							)}
						</Button>
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

export default ProfileCard;
