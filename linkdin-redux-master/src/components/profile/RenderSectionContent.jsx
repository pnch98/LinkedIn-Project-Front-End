import { useState } from "react";
import { Alert, Button, Card, Form, FormControl, Image, Modal, ProgressBar } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { deletePost, editPost } from "../../redux/slice/fetchPostReducer";
import { uploadFile } from "../../redux/slice/fileUploadReducer";
import { FaHeart, FaRegCommentDots, FaShareSquare } from "react-icons/fa";

const RenderSectionContent = ({ myPosts, myProfile, activeSection }) => {
  const location = useLocation();
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const status = useSelector((state) => state.fetchPost.status);
  const error = useSelector((state) => state.fetchPost.error);
  const errorUpload = useSelector((state) => state.fileUpload.error);
  const loading = useSelector((state) => state.fileUpload.loading);
  const [showAlert, setShowAlert] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [modalText, setModalText] = useState("");
  const [postId, setPostId] = useState("");
  const dispatch = useDispatch();

  const handleCloseEdit = () => setShowEditPostModal(false);
  const handleShowEdit = () => setShowEditPostModal(true);

  const handleCloseDelete = () => setShowDeletePostModal(false);
  const handleShowDelete = () => setShowDeletePostModal(true);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleEditPost = (post) => {
    setModalText(post.text);
    setPostId(post._id);

    handleShowEdit();
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const dataToPost = {
      text: modalText,
    };

    dispatch(editPost({ dataToPost, postId }));

    if (selectedFile) {
      dispatch(uploadFile({ file: selectedFile, type: "post", id: postId }));
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      handleCloseEdit();
    }, 1500);
  };

  const handelDeletePost = (post) => {
    setPostId(post._id);

    handleShowDelete();
  };

  switch (activeSection) {
    case "post":
      return location.pathname === "/profile/me"
        ? myPosts && (
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              <>
                {[...myPosts].reverse().map((post) => (
                  <Card className="mb-3">
                    <Card.Body className="d-flex align-items-center justify-content-between">
                      <div className="d-flex flex-column w-100">
                        <div className="d-flex justify-content-between align-items-center">
                          <small>
                            {myProfile && myProfile.name + " " + myProfile.surname} ha pubblicato un post •{" "}
                          </small>
                          <div className="d-flex align-items-center">
                            <Button variant="transparent" onClick={() => handleEditPost(post)}>
                              <GoPencil className="fs-6" />
                            </Button>
                            <Button variant="transparent" onClick={() => handelDeletePost(post)}>
                              <FaTrashCan className="fs-6" />
                            </Button>
                          </div>
                        </div>

                        <Card.Text>{post.text}</Card.Text>
                        {post.image && <Image src={post.image} width={"400px"} height={"auto"} />}
                      </div>
                    </Card.Body>
                    <Card.Footer className="d-flex align-items-center">
                      <Button variant="link" className="d-flex align-items-center text-decoration-none ps-0">
                        <FaHeart className="me-1 mb-0" /> {Math.floor(Math.random() * 160 + 1)}
                      </Button>
                      <Button variant="link" className="d-flex align-items-center text-decoration-none">
                        <FaRegCommentDots className="me-1 mb-0" /> {Math.floor(Math.random() * 13 + 1)} commenti
                      </Button>
                      <Button variant="link" className="d-flex align-items-center text-decoration-none">
                        <FaShareSquare className="me-1 mb-0" /> Condividi
                      </Button>
                    </Card.Footer>
                  </Card>
                ))}
                <Modal
                  show={showEditPostModal}
                  onHide={handleCloseEdit}
                  dialogClassName="editPostModal"
                  className="modal-index"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Modifica post</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {showAlert && error && <Alert variant="danger">Error: {error}</Alert>}
                    {showAlert && status === "succeeded" && (
                      <Alert variant="success">Post aggiornato con successo!</Alert>
                    )}
                    <Form className="mx-2" onSubmit={(event) => handleEditSubmit(event)}>
                      {/* {" "}
                        {showAlert === true && statusPut === "success" ? (
                            <Alert variant="success">Modifica avvenuta con successo</Alert>
                            ) : (
                                ""
                                )}
                                {showAlert === true && statusPut === "failed" ? (
                                    <Alert variant="warning">Errore nella modifica dei dati</Alert>
                                    ) : (
                                        ""
                                    )} */}
                      <Form.Group className="mb-3" controlId="editForm.ControlInput1">
                        <Form.Label className="fw-semibold w-100">
                          Contenuto del post
                          <FormControl
                            value={modalText}
                            placeholder="Cambia contenuto post"
                            onChange={(e) => setModalText(e.target.value)}
                          />
                        </Form.Label>
                      </Form.Group>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Choose a file</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                      </Form.Group>
                      <div className="d-flex justify-content-end">
                        <Button type="submit">Save</Button>
                      </div>
                    </Form>
                    {loading && <ProgressBar animated now={100} label="Uploading..." />}

                    {errorUpload && <Alert variant="danger">Error: {errorUpload}</Alert>}
                  </Modal.Body>
                </Modal>

                <Modal
                  show={showDeletePostModal}
                  onHide={handleCloseDelete}
                  dialogClassName="delPostModal"
                  className="mt-5 modal-index"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Post</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <p className="text-center fs-3 fw-semibold">Are you sure?</p>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary">Discard</Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setTimeout(() => {
                          handleCloseDelete();
                        }, 1500);
                        dispatch(deletePost({ postId }));
                      }}
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            </div>
          )
        : "";
    case "commenti":
      return (
        // Contenuto della sezione Commenti
        "NO COMMENT"
      );
    case "immagini":
      return (
        // Contenuto della sezione Immagini
        "NO IMAGE"
      );
    default:
      return null;
  }
};
export default RenderSectionContent;
