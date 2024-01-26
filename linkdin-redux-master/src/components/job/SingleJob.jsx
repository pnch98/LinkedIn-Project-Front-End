import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const SingleJob = ({ job, selectJob }) => {
	const [isClosed, setisClosed] = useState(false);

	const handleClose = () => {
		setisClosed(true);
	};
	return (
		!isClosed && (
			<Card className="mb-3">
				<Card.Body>
					<Card.Link style={{ textDecoration: "none", cursor: "pointer" }} onClick={() => selectJob(job)}>
						{job.title}
					</Card.Link>
					<Card.Subtitle className="mb-2 text-muted">{job.company_name}</Card.Subtitle>
					<Card.Text>{job.category}</Card.Text>
					<Card.Text className="text-muted">
						{job.candidate_required_location && job.candidate_required_location}
					</Card.Text>
				</Card.Body>
				<Button
					variant="outline-secondary"
					className="position-absolute top-0 end-0 mt-3 me-2 btn-sm p-1 py-0 shad"
					onClick={() => handleClose()}
				>
					<FaTimes className="m-0 pb-1" />
				</Button>
			</Card>
		)
	);
};

export default SingleJob;
