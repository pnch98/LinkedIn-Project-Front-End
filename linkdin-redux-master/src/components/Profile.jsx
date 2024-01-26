import React, { useEffect, useState } from "react";
import {
  CardBody,
  CardText,
  Carousel,
  CarouselItem,
  Col,
  Container,
  Form,
  FormText,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { fetchProfile, setData } from "../redux/slice/fetchProfileReducer";
import { useDispatch, useSelector } from "react-redux";
import BannerCard from "./home/BannerCard";
import ProfileCard from "./ProfileCard";
import { GoPencil, GoPlus } from "react-icons/go";
import { FaHeart, FaPhoneAlt, FaRegCommentDots, FaShareSquare } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { ImCalendar } from "react-icons/im";
import { ArrowRight, Linkedin } from "react-bootstrap-icons";
import { editProfile, setEditProfile } from "../redux/slice/editProfileReducer";
import { useNavigate } from "react-router-dom";
import ExpModal from "./ExpModal";
import EditModal from "./EditModal";
import FileUploadComponent from "./FileUploadComponent";
import { fetchExperiences } from "../redux/slice/ExperienceSlice";
import { formatDate } from "./Experiences";
import { addMyPost } from "../redux/slice/fetchPostReducer";
import { FaTrashCan } from "react-icons/fa6";
import RenderSectionContent from "./profile/RenderSectionContent";
import { fetchAllComments } from "../redux/slice/fetchCommentsReducer";
export const logoUrl =
  "https://media.licdn.com/dms/image/C4E0BAQHYgix-Ynux1A/company-logo_100_100/0/1646830188798/epicodeschool_logo?e=1714003200&v=beta&t=02cZOkAFfrcsqE3vMctwQcElNrMnInX4NwQFmaTF1M8";

function Profile() {
  const profile = useSelector((state) => state.fetchProfile.data);
  const myProfile = useSelector((state) => state.fetchMyProfile.data);
  const myPosts = useSelector((state) => state.fetchPost.myPosts);
  const allPosts = useSelector((state) => state.fetchPost.postList);
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const allProfiles = useSelector((state) => state.fetchAllProfiles.data);
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showExp, setShowExp] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const statusPut = useSelector((state) => state.editProfile.status);
  const [showAlert, setShowAlert] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({ ...profile });
  const [activeSection, setActiveSection] = useState("post");
  const navigate = useNavigate();

  const experiences = useSelector((state) => state.fetchExperiences.items);

  const handleShowExpDetails = () => {
    const userId = profile._id;
    navigate(`/profile/${userId}/experiences`);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseSecond = () => setShowSecond(false);
  const handleShowSecond = () => setShowSecond(true);

  const handleCloseExp = () => setShowExp(false);
  const handleShowExp = () => setShowExp(true);

  const handleCloseUpload = () => setShowUpload(false);
  const handleShowUpload = () => setShowUpload(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editProfile(dataToEdit));
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      handleCloseSecond();
      dispatch(setData(dataToEdit));
    }, 1500);
  };

  useEffect(() => {
    setDataToEdit({ ...profile });
    if (location.pathname === "/profile/me") {
      dispatch(setEditProfile(profile));
    }
    profile && dispatch(fetchExperiences(profile._id));
  }, [dispatch, location.pathname, profile]);

  useEffect(() => {
    if (allPosts && myProfile && profile) {
      setDataToEdit({ ...profile });
      const profileId = profile._id;
      const myPostIds = new Set(myPosts.map((post) => post._id));
      const userPosts = allPosts.filter((post) => post.user._id === profileId);
      allPosts.forEach((post) => {
        if (post.user._id === myProfile._id && !myPostIds.has(post._id)) {
          dispatch(addMyPost(post));
        }
      });
    }
  }, [allPosts, myProfile, dispatch, profile, myPosts]);

  useEffect(() => {
    let queryParam;
    if (location.pathname === "/profile/me") {
      queryParam = "me";
    } else {
      queryParam = params.userId;
    }

    dispatch(fetchProfile(queryParam));
  }, [dispatch, location.pathname, params.userId]);

  return (
    <>
      <Row className="my-4">
        <Col>
          <Card className="mb-2 shadow">
            <Card.Header className="bg-primary text-white position-relative" style={{ height: "200px" }}>
              <Link onClick={handleShowUpload}>
                <Card.Img
                  variant="top"
                  src={profile && profile.image}
                  className="position-absolute"
                  style={{
                    width: "150px",
                    height: "150px",
                    border: "4px solid white",
                    borderRadius: "50%",
                    margin: "0 auto",
                    bottom: "-15%",
                    zIndex: "1000",
                    backgroundColor: "gray",
                  }}
                />
              </Link>
            </Card.Header>
            <Card.Body>
              {location.pathname === "/profile/me" && (
                <div className="d-flex justify-content-end">
                  <Button className="pencil px-2" onClick={handleShowSecond}>
                    <GoPencil className="fs-4" />
                  </Button>
                </div>
              )}
              <Card.Title className="mt-2 me-auto fs-2">{profile && profile.name + " " + profile.surname}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{profile && profile.title}</Card.Subtitle>
              <Card.Text>{profile && profile.bio}</Card.Text>
              <div className="d-flex align-items-start justify-content-start gap-2 fs-6">
                <Card.Text className="text-muted">{profile && profile.area} ·</Card.Text>
                <Card.Text className="fw-semibold">
                  <Link onClick={handleShow}>informazioni di contatto</Link>
                </Card.Text>
              </div>
              <Card.Text className="text-primary fw-semibold">29 collegamenti</Card.Text>

              <div className="d-flex align-items-center justify-content-start gap-2">
                <Button variant="primary rounded-pill" className="fw-semibold">
                  Disponibile per
                </Button>
                <Button variant="outline-primary rounded-pill" className="fw-semibold">
                  Aggiungi sezione del profilo
                </Button>
                <Button variant="outline-secondary rounded-pill" className="fw-semibold">
                  altro
                </Button>
              </div>

              <div className="">
                <Carousel className="">
                  {/* Ogni Carousel.Item corrisponde a un li.splide__slide */}
                  <Carousel.Item>
                    <div className="">
                      <div className="">
                        {/* <Card className="">
													<div className="">
														<div className="">
															<div className="img-wrapper">
																<Card.Img
																	variant="top"
																	src="https://via.placeholder.com/480x360/ebebeb/808080/?text=Immagine1"
																/>
															</div>
														</div>
													</div>
												</Card> */}
                        <Card className="">
                          <Card.Body>
                            <Card.Title>Disponibile a lavorare</Card.Title>
                            <Card.Text>Ruoli di React Developer.</Card.Text>
                            <Button as={Link} to={"#"} variant="primary">
                              Mostra dettagli
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Card className="">
                      <Card.Body>
                        <Card.Title>Fai sapere che stai facendo selezione</Card.Title>
                        <Card.Text>e attrai candidati qualificati.</Card.Text>
                        <Button as={Link} to={"#"} variant="primary">
                          Inizia
                        </Button>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                  <CarouselItem>
                    <Card className="">
                      <Card.Body>
                        <Card.Title>Metti in risalto i servizi</Card.Title>
                        <Card.Text>che la tua azienda potrebbe apportare.</Card.Text>
                        <Button as={Link} to={"#"} variant="primary">
                          Inizia
                        </Button>
                      </Card.Body>
                    </Card>
                  </CarouselItem>
                  {/* Ripeti per ogni slide */}
                </Carousel>
              </div>
            </Card.Body>
          </Card>
          <Card className="mb-2 shadow">
            <Card.Body>
              <Card.Title className="mb-0">Analisi</Card.Title>
              <Card.Text className="mb-2 text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  data-supported-dps="16x16"
                  fill="currentColor"
                  className="mercado-match __web-inspector-hide-shortcut__"
                  width="16"
                  height="16"
                  focusable="false"
                >
                  <path d="M8 3a8.59 8.59 0 00-8 5 8.54 8.54 0 008 5 8.55 8.55 0 008-5 8.55 8.55 0 00-8-5zm0 8a3 3 0 113-3 3 3 0 01-3 3zm2-3a2 2 0 11-2-2 2 2 0 012 2z"></path>
                </svg>{" "}
                Solo per te
              </Card.Text>
              <div className="d-flex  py-3">
                <div className="me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    data-supported-dps="24x24"
                    fill="currentColor"
                    className="mercado-match"
                    width="24"
                    height="24"
                    focusable="false"
                  >
                    <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
                  </svg>
                  <Link className="undecorated"> 2 visualizzazioni del profilo</Link>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    data-supported-dps="24x24"
                    fill="currentColor"
                    className="mercado-match"
                    width="24"
                    height="24"
                    focusable="false"
                  >
                    <path d="M21.41 18.59l-5.27-5.28A6.83 6.83 0 0017 10a7 7 0 10-7 7 6.83 6.83 0 003.31-.86l5.28 5.27a2 2 0 002.82-2.82zM5 10a5 5 0 115 5 5 5 0 01-5-5z"></path>
                  </svg>
                  <Link className="undecorated"> 2 comparse nei motori di ricerca</Link>
                </div>
              </div>
            </Card.Body>
            <Button className="nav-link my-link border border-1 border-secondary border-start-0 border-bottom-0 border-end-0 d-flex align-items-center justify-content-center fw-semibold">
              <NavLink to={"/risorse"} className="nav-link undecorated my-3">
                Mostra tutte le risorse
                <ArrowRight className="fs-6 ms-1" />
              </NavLink>
            </Button>
          </Card>
          <Card className="mb-2 shadow">
            <Card.Body>
              <Card.Title className="mb-0">Risorse</Card.Title>
              <div className="mb-2 text-muted ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  data-supported-dps="16x16"
                  fill="currentColor"
                  className="mercado-match __web-inspector-hide-shortcut__"
                  width="16"
                  height="16"
                  focusable="false"
                >
                  <path d="M8 3a8.59 8.59 0 00-8 5 8.54 8.54 0 008 5 8.55 8.55 0 008-5 8.55 8.55 0 00-8-5zm0 8a3 3 0 113-3 3 3 0 01-3 3zm2-3a2 2 0 11-2-2 2 2 0 012 2z"></path>
                </svg>{" "}
                Solo per te
              </div>
              <div className="mb-2 border border-1 border-secondary border-start-0 border-top-0 border-end-0 py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  className="mercado-match"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M21 12h-1a9 9 0 00-9-9V2a10 10 0 0110 10zM11 5v1a6 6 0 016 6h1a7 7 0 00-7-7zm3 7h1a4 4 0 00-4-4v1a3 3 0 013 3zm-2 0a1 1 0 00-1.82-.54L5.32 6.6a8 8 0 00-.24 8.4 2.33 2.33 0 014.16.68l.88 3.08A8.57 8.57 0 0012 19a8 8 0 004.4-1.32l-4.86-4.86A1 1 0 0012 12zm-5 3a1.32 1.32 0 00-1.27 1L4 22h6l-1.73-6A1.32 1.32 0 007 15z"></path>
                </svg>
                <Link className="undecorated"> Modalità creazione contenuti</Link>
                <p className="ms-4 mb-0">
                  <small className="ms-1 text-muted">
                    Fatti scoprire, metti in risalto i contenuti sul tuo profilo e accedi agli strumenti di creazione
                  </small>
                </p>
              </div>

              <div className="mb-2 py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  className="mercado-match"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
                </svg>
                <Link className="undecorated"> La mia rete</Link>
                <p className="ms-4 mb-0">
                  <small className="ms-1 text-muted">Salva e gestisci i tuoi collegamenti e interessi.</small>
                </p>
              </div>
            </Card.Body>
            <Button className="nav-link my-link border border-1 border-secondary border-start-0 border-bottom-0 border-end-0 d-flex align-items-center justify-content-center fw-semibold">
              <NavLink to={"/risorse"} className="nav-link undecorated my-3">
                Mostra tutte le risorse(5)
                <ArrowRight className="fs-6 ms-1" />
              </NavLink>
            </Button>
          </Card>
          <Card className="mb-2 shadow">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between m-1">
                <Card.Title className="mb-0">Informazioni</Card.Title>
                {location.pathname === "/profile/me" && (
                  <Button className="pencil px-2">
                    <GoPencil className="fs-4" />
                  </Button>
                )}
              </div>
              <Card.Text className="mt-3 mb-4 text-muted">{profile && profile.bio}</Card.Text>
              <div className="d-flex py-1 border rounded-2">
                <Row className="p-1">
                  <Col xs={2} className="d-flex justify-content-start">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        role="none"
                        data-supported-dps="24x24"
                        fill="currentColor"
                        className="mercado-match"
                        width="24"
                        height="24"
                        focusable="false"
                      >
                        <path d="M18.36 3H5.64L2 9.5 12 22 22 9.5 18.36 3zm-10.7 7l2.45 6.43L4.96 10h2.7zm1.07 0h6.54L12 18.59 8.73 10zm7.61 0h2.7l-5.15 6.43L16.34 10zm3.09-1h-3.07L14.9 5h2.3l2.24 4zm-5.6-4l1.46 4H8.71l1.46-4h3.66zM6.81 5h2.3L7.65 9H4.58l2.24-4z"></path>
                      </svg>
                    </div>
                  </Col>
                  <Col xs={10}>
                    <p className="mb-0 text-muted">Competenze principali</p>
                    <span className="mb-0 text-muted">{profile && profile.title}</span>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
          <Card className="p-3 mb-2 shadow">
            <div className="d-flex align-items-center justify-content-between m-1">
              <div className="d-flex flex-column justify-content-between align-items-start mb-3">
                <h2>Attività</h2>
                <p>29 follower</p>
              </div>
              {location.pathname === "/profile/me" && (
                <Button variant="outline-primary" className="btn rounded-pill">
                  Crea un post
                </Button>
              )}
            </div>
            <div className="d-flex justify-content-start mb-3">
              <Button
                variant={activeSection === "post" ? "success" : "outline-secondary"}
                onClick={() => setActiveSection("post")}
                className="me-2 rounded-pill"
              >
                Post
              </Button>
              <Button
                variant={activeSection === "commenti" ? "success" : "outline-secondary"}
                onClick={() => setActiveSection("commenti")}
                className="me-2 rounded-pill"
              >
                Commenti
              </Button>
              <Button
                variant={activeSection === "immagini" ? "success" : "outline-secondary"}
                onClick={() => setActiveSection("immagini")}
                className=" rounded-pill"
              >
                Immagini
              </Button>
            </div>
            {}
            <RenderSectionContent myPosts={myPosts} myProfile={myProfile} activeSection={activeSection} />
          </Card>
          <Card className="mb-2 shadow">
            <Card.Title className="fs-4 d-flex justify-content-between align-items-center p-2 mx-2 my-1">
              Esperienza
              {location.pathname === "/profile/me" && (
                <div className="d-flex align-items-baseline justify-content-start gap-2">
                  <Button className="pencil px-2" onClick={handleShowExp}>
                    <GoPlus className="fs-3" />
                  </Button>
                  <Button className="pencil px-2" onClick={handleShowExpDetails}>
                    <GoPencil className="fs-4" />
                  </Button>
                </div>
              )}
            </Card.Title>
            <CardBody>
              {experiences.length > 0 ? (
                experiences.map((exp, index) => (
                  <ListGroup.Item
                    key={index}
                    className="border border-1 border-secondary border-end-0 border-start-0 border-bottom-0 py-2"
                  >
                    <Card.Title className="fs-5">{exp.role}</Card.Title>
                    <div className="mb-0">
                      <strong>{exp.company}</strong> · {formatDate(exp.startDate)} / {formatDate(exp.endDate)}
                    </div>
                    <small className="m-0">{exp.area}</small>
                    <Card.Text className="mb-3">Descrizione: {exp.description}</Card.Text>
                  </ListGroup.Item>
                ))
              ) : (
                <p className="text-muted">Non ci sono ancora esperienze da visualizzare.</p>
              )}
            </CardBody>
          </Card>
          <Card className="mb-2 shadow p-2">
            <Card.Title className="fs-4 d-flex justify-content-between align-items-center mx-2 my-1">
              Formazione
              {location.pathname === "/profile/me" && (
                <div className="d-flex align-items-baseline justify-content-start gap-2">
                  <Button className=" pencil px-2">
                    <GoPlus className="fs-3" />
                  </Button>
                  <Button className="pencil px-2">
                    <GoPencil className="fs-4" />
                  </Button>
                </div>
              )}
            </Card.Title>
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="education-logo me-2">
                  <Image src={logoUrl} style={{ width80: "80px", height: "80px" }}></Image>
                </div>
                <div>
                  <Card.Title>EPICODE</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">ott 2023 - mag 2024</Card.Subtitle>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="education-logo me-2"></div>
              </div>
              <Card.Text>EPICODE SCHOOL</Card.Text>
              <Card.Text>Lorem Lorem ipsum dolor, sit amet consectetur </Card.Text>
              <Card.Text>set 2010 - lug 2016</Card.Text>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptatum quis totam cumque nemo, eius
                non blanditiis deleniti recusandae accusantium ipsum laborum, obcaecati dolore molestias eaque
                temporibus, excepturi dolorem eum.
              </Card.Text>
            </CardBody>
          </Card>
        </Col>
        {/* SIDE BAR */}
        <Col md={3} className="d-none d-md-block ">
          <Card className="mb-1 shadow">
            <Card.Body>
              <Card.Title>Lingua del profilo</Card.Title>
              <Card.Text>Italiano</Card.Text>
              <hr />
              <CardText>Public profile & URL</CardText>
              <Card.Link href="https://www.linkedin.com/in/salvatore-alessandro-d-amico-4a1551267"></Card.Link>
            </Card.Body>
          </Card>
          <BannerCard />
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Altri profili consultati</Card.Title>
              {allProfiles &&
                allProfiles.map(
                  (profile, index) => index < 5 && <ProfileCard key={profile.name + profile.id} profile={profile} />
                )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* MODALE */}
      <Modal show={show} onHide={handleClose} dialogClassName="my-custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{profile && profile.name + " " + profile.surname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mx-2">
            <div className="d-flex align-items-center justify-content-between">
              <FormText className="fs-5 text-black">Informazioni di contatto</FormText>

              {location.pathname === "/profile/me" && (
                <Button
                  className="pencil px-2"
                  onClick={() => {
                    handleClose();
                    handleShowSecond();
                  }}
                >
                  <GoPencil className="fs-4" />
                </Button>
              )}
            </div>
            <Form.Group className="my-3 d-flex align-items-start" controlId="exampleForm.ControlInput1">
              <Linkedin className="ms-1 me-3 mt-1 fs-5" />
              <Form.Label className="fw-semibold">
                Il tuo profilo
                {profile ? (
                  <NavLink className="nav-link text-primary" to={"/profile/me"}>
                    linkedi.com/in/{profile && profile.name}-{profile.surname && profile.surname}-45fde57321
                  </NavLink>
                ) : (
                  "Registrati per visualizzare le informazioni di contatto"
                )}
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 d-flex align-items-start" controlId="exampleForm.ControlInput2">
              <FaPhoneAlt className="ms-1 me-3 mt-1 fs-5" />
              <Form.Label className="fw-semibold">
                Telefono
                <FormText className="d-block fw-semibold text-black">
                  {/* {profile.phone ? profile.phone : `3456789017`} */}
                  <span className="ms-1  fw-light">(Cellulare)</span>
                </FormText>
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 d-flex align-items-start" controlId="exampleForm.ControlInput3">
              <MdOutlineEmail className="ms-1 me-3 mt-1 fs-5" />
              <Form.Label className="fw-semibold">
                Email
                <FormText className="d-block text-primary fw-semibold">
                  {/* {profile.email ? profile.email : "Registra la tua email"} */}
                </FormText>
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 d-flex align-items-start" controlId="exampleForm.ControlInput4">
              <ImCalendar className="ms-1 me-3 mt-1 fs-5" />
              <Form.Label className="fw-semibold">
                Compleanno
                <FormText className="d-block fw-semibold">
                  {/* {profile.birth ? profile.birth : "Inserisci il tuo compleanno"} */}
                </FormText>
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      <EditModal
        dataToEdit={dataToEdit}
        statusPut={statusPut}
        showSecond={showSecond}
        handleSubmit={handleSubmit}
        handleCloseSecond={handleCloseSecond}
        showAlert={showAlert}
        setDataToEdit={setDataToEdit}
      />

      {/* MODALE EXPERIENCE */}
      {profile && (
        <ExpModal
          showAlert={showAlert}
          showExp={showExp}
          handleCloseExp={handleCloseExp}
          statusPut={statusPut}
          userId={profile._id}
        />
      )}

      {/* MODALE PER L'UPLOAD DELL'IMMAGINE DI PROFILO */}
      {profile && (
        <FileUploadComponent showUpload={showUpload} handleCloseUpload={handleCloseUpload} userId={profile._id} />
      )}
    </>
  );
}

export default Profile;
