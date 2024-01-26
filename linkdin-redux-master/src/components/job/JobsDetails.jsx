import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaRegBuilding, FaRegClock, FaRegListAlt, FaRegUser } from "react-icons/fa";
import { formatDate } from "../Experiences";
const JobDetails = (job) => {
  console.log(job);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{job.job.company_name && job.job.company_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{formatDate(job.job.publication_date)}</Card.Subtitle>
        <p className="mb-0" dangerouslySetInnerHTML={{ __html: job.job.description }}></p>
        <Button variant="primary">Candidatura semplice</Button>
      </Card.Body>
    </Card>
  );
};

export default JobDetails;
