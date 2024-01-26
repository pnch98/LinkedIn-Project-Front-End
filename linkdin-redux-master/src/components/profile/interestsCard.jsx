import React, { useState } from "react";
import { Card, Button, Image } from "react-bootstrap";
import { GoCheck } from "react-icons/go";
import { logoUrl } from "../Profile";

const InterestsCard = () => {
	const [activeTab, setActiveTab] = useState("aziende");

	const content = {
		aziende: (
			<Card.Body>
				<div className="d-flex">
					<div className="me-2 align-items-end me-3 justify-content-center">
						<Image src={logoUrl} style={{ width: "55px", height: "55px" }} roundedCircle />
					</div>
					<div className="ms-2">
						<Card.Title>EPICODE</Card.Title>
						<Card.Text>12.905 follower</Card.Text>
						<Button variant="outline-secondary border-2 rounded-pill">
							<GoCheck /> Già segui
						</Button>
					</div>
				</div>
			</Card.Body>
		),
		scuole: (
			// Contenuto della sezione Scuole o università
			<Card.Body>NO COMMENT</Card.Body>
		),
	};

	return (
		<Card className="shadow my-2">
			<Card.Header>
				<div className="tab-container">
					<div className={`tab ${activeTab === "aziende" ? "active" : ""}`} onClick={() => setActiveTab("aziende")}>
						Aziende
					</div>
					<div className={`tab ${activeTab === "scuole" ? "active" : ""}`} onClick={() => setActiveTab("scuole")}>
						Scuole o università
					</div>
				</div>
			</Card.Header>
			{content[activeTab]}
		</Card>
	);
};

export default InterestsCard;
