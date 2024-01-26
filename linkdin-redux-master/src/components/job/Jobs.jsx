import { Col, Row } from "react-bootstrap";
import JobsMain from "./JobsMain";
import JobsAside from "./JobsAside";
import MiniFooter from "../home/MiniFooter";
import { useState } from "react";
import JobDetails from "./JobsDetails";
// import { useDispatch } from "react-redux";

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const selectJob = (job) => {
    setSelectedJob(job);
    console.log(job);
  };

  return (
    <Row className="my-4">
      {!selectedJob && (
        <Col xs={12} md={selectedJob ? 6 : 3}>
          <JobsAside />
        </Col>
      )}
      <Col xs={12} md={selectedJob ? 6 : 6} className="scroll">
        <JobsMain selectJob={setSelectedJob} selectedJob={selectedJob} />
      </Col>
      {!selectedJob && (
        <Col xs={12} md={3}>
          <MiniFooter />
        </Col>
      )}

      {selectedJob && (
        <Col xs={12} lg={6} className="scroll">
          <JobDetails job={selectedJob} closeDetails={() => setSelectedJob(null)} />
        </Col>
      )}
    </Row>
  );
};

export default Jobs;
