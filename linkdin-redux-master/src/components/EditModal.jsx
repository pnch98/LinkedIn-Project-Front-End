import { Alert, Button, Form, FormControl, Modal } from "react-bootstrap";

const EditModal = ({
  showSecond,
  handleCloseSecond,
  showAlert,
  setDataToEdit,
  dataToEdit,
  handleSubmit,
  statusPut,
}) => {
  return (
    <Modal show={showSecond} onHide={handleCloseSecond} dialogClassName="editProfileModal" className="modal-index">
      <Modal.Header closeButton>
        <Modal.Title>Modifica di presentazione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mx-2" onSubmit={(event) => handleSubmit(event)}>
          {" "}
          {showAlert === true && statusPut === "success" ? (
            <Alert variant="success">Modifica avvenuta con successo</Alert>
          ) : (
            ""
          )}
          {showAlert === true && statusPut === "failed" ? (
            <Alert variant="warning">Errore nella modifica dei dati</Alert>
          ) : (
            ""
          )}
          <Form.Group className="mb-3" controlId="editForm.ControlInput1">
            <Form.Label className="fw-semibold w-100">
              Nome
              <FormControl
                value={dataToEdit.name}
                placeholder="Inserisci il tuo nome"
                onChange={(e) => setDataToEdit({ ...dataToEdit, name: e.target.value })}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-start w-100" controlId="editForm.ControlInput2">
            <Form.Label className="fw-semibold w-100">
              Cognome
              <FormControl
                value={dataToEdit.surname}
                placeholder="Inserisci il tuo cognome"
                onChange={(e) => setDataToEdit({ ...dataToEdit, surname: e.target.value })}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-start w-100" controlId="editForm.ControlInput3">
            <Form.Label className="fw-semibold w-100">
              Email
              <FormControl
                value={dataToEdit.email}
                placeholder="mariorossi@gmail.com"
                onChange={(e) => setDataToEdit({ ...dataToEdit, email: e.target.value })}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-start w-100" controlId="editForm.ControlInput4">
            <Form.Label className="fw-semibold w-100">
              Username
              <FormControl
                value={dataToEdit.username}
                placeholder="mario_rossi"
                onChange={(e) => setDataToEdit({ ...dataToEdit, usernam: e.target.value })}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-start w-100" controlId="editForm.ControlInput5">
            <Form.Label className="fw-semibold w-100">
              Titolo
              <FormControl
                value={dataToEdit.title}
                placeholder="Attore"
                onChange={(e) => setDataToEdit({ ...dataToEdit, title: e.target.value })}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-start w-100" controlId="editForm.ControlInput6">
            <Form.Label className="fw-semibold w-100">
              Bio
              <FormControl
                value={dataToEdit.bio}
                placeholder="Biografia"
                onChange={(e) => setDataToEdit({ ...dataToEdit, bio: e.target.value })}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-start w-100" controlId="editForm.ControlInput7">
            <Form.Label className="fw-semibold w-100">
              Località
              <FormControl
                value={dataToEdit.area}
                placeholder="Località"
                onChange={(e) => setDataToEdit({ ...dataToEdit, area: e.target.value })}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 d-flex align-items-start w-100" controlId="editForm.ControlInput8">
            <Form.Label className="fw-semibold w-100">
              Immagine
              <FormControl
                value={dataToEdit.image}
                placeholder="Immagine"
                onChange={(e) => setDataToEdit({ ...dataToEdit, image: e.target.value })}
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
export default EditModal;
