import { Alert, Button, Form, FormControl, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  deleteExperience,
  editExperience,
  resetExperience,
  setExperienceArea,
  setExperienceCompany,
  setExperienceDescription,
  setExperienceEndDate,
  setExperienceRole,
  setExperienceStartDate,
} from "../redux/slice/ExperienceSlice";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ExpModal = ({ showExp, expId, handleCloseExp, userId }) => {
  const max = new Date().toISOString().split("T")[0];
  const experience = useSelector((state) => state.fetchExperiences.experience);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const status = useSelector((state) => state.fetchExperiences.status);
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();

    const experienceData = {
      role: experience.role,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
      area: experience.area,
    };

    setShowAlert(true);

    if (location.pathname === "/profile/me") {
      console.log("dentro profile");
      const payload = {
        userId: userId,
        experienceData: experienceData,
      };
      dispatch(addExperience(payload));
    } else {
      console.log("fuori profile");
      const payload = {
        userId: userId,
        expId: expId,
        experienceData: experienceData,
      };
      console.log(payload);
      dispatch(editExperience(payload));
    }
    setTimeout(() => {
      setShowAlert(false);
      handleCloseExp();
      dispatch(resetExperience());
    }, 3000);
  };

  return (
    <Modal show={showExp} onHide={handleCloseExp} dialogClassName="addExpModal" className="modal-index">
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi un'esperienza</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mx-2" onSubmit={(event) => handleSubmit(event)}>
          {showAlert === true && status === "succeeded" ? (
            <Alert variant="success">Esperienza aggiunta con successo</Alert>
          ) : (
            ""
          )}
          {showAlert === true && status === "failed" ? <Alert variant="warning">Errore nell'invio dei dati</Alert> : ""}
          <Form.Group className="mb-3" controlId="editForm.ControlInput1">
            <Form.Label className="fw-semibold w-100">
              Ruolo
              <FormControl
                required
                placeholder="Inserisci il tuo ruolo"
                value={experience.role}
                onChange={(e) => dispatch(setExperienceRole(e.target.value))}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-start w-100" controlId="editForm.ControlInput2">
            <Form.Label className="fw-semibold w-100">
              Azienda
              <FormControl
                required
                placeholder="Inserisci il tuo nome della azienda"
                value={experience.company}
                onChange={(e) => dispatch(setExperienceCompany(e.target.value))}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-start w-100" controlId="editForm.ControlInput3">
            <Form.Label className="fw-semibold w-100">
              Data di inizio
              <FormControl
                required
                type="date"
                max={max}
                value={experience.startDate}
                onChange={(e) => dispatch(setExperienceStartDate(e.target.value))}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-start w-100" controlId="editForm.ControlInput4">
            <Form.Label className="fw-semibold w-100">
              Data di fine
              <FormControl
                type="date"
                max={max}
                value={experience.endDate}
                onChange={(e) => dispatch(setExperienceEndDate(e.target.value))}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-start w-100" controlId="editForm.ControlInput5">
            <Form.Label className="fw-semibold w-100">
              Descrizione
              <FormControl
                required
                as="textarea"
                rows={3}
                placeholder="Inserisci la descrizione della tua esperienza"
                value={experience.description}
                onChange={(e) => dispatch(setExperienceDescription(e.target.value))}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-start w-100" controlId="editForm.ControlInput7">
            <Form.Label className="fw-semibold w-100">
              Località
              <FormControl
                required
                placeholder="Località"
                value={experience.area}
                onChange={(e) => dispatch(setExperienceArea(e.target.value))}
              />
            </Form.Label>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ExpModal;
