import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
	BellFill,
	BriefcaseFill,
	ChatDotsFill,
	HouseDoorFill,
	Linkedin,
	PeopleFill,
	Search,
} from "react-bootstrap-icons";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector } from "react-redux";
import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import { GoGraph, GoOrganization, GoBroadcast } from "react-icons/go";
import { CgMenuGridR } from "react-icons/cg";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { CgInsights } from "react-icons/cg";
import { MdOutlineWork } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { FaRegCompass } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

function NavBar() {
	const [showSubNavbar, setShowSubNavbar] = useState(false);
	const location = useLocation();
	const profile = useSelector((state) => state.fetchMyProfile.data);
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		event.preventDefault();
		navigate(`/jobs/${searchValue}`);
		setSearchValue("");
	};

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setShowSubNavbar(currentScrollY > 100 && location.pathname === "/profile/me");
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, [location]);

	return (
		<>
			<Navbar
				expand="lg"
				className="bg-white py-0 justify-content-center sticky-top shadow-sm"
				style={{ backgroundColor: "white", border: "gainsboro 1px solid" }}
				data-bs-theme="light"
			>
				<Container className="py-0">
					<div className="d-flex align-items-center">
						<NavLink className="undecorated" to={"/"}>
							<Navbar.Brand href="#" className="p-0 d-flex align-items-center">
								<Linkedin className="fs-2" style={{ color: "#0077b5" }} />
							</Navbar.Brand>
						</NavLink>
						{/* */}
						<Form className="d-flex me-4" onSubmit={handleSubmit}>
							<InputGroup>
								<InputGroup.Text
									id="basic-addon1"
									style={{ backgroundColor: "rgba(220, 220, 220, 0.4)", border: "none" }}
									className="input"
								>
									<Search />
								</InputGroup.Text>
								<Form.Control
									placeholder="Cerca"
									aria-label="Username"
									aria-describedby="basic-addon1"
									className="border-0 outline-0 shadow-none"
									style={{ border: "none", backgroundColor: "rgba(220, 220, 220, 0.4)" }}
									onChange={(e) => setSearchValue(e.target.value)}
								/>
							</InputGroup>
						</Form>
					</div>
					{/* */}
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll" className="justify-content-end">
						<Nav className="d-flex align-items-center" style={{ maxHeight: "100px" }} navbarScroll>
							<NavLink className="undecorated" to={"/"}>
								<div className="py-1 mx-3 text-center">
									<HouseDoorFill className="mx-2" style={{ fontSize: "1.3rem" }} />
									<p className="mb-0" style={{ fontSize: "0.75rem" }}>
										Home
									</p>
								</div>
							</NavLink>

							<NavLink to={"/profile"} className="undecorated">
								<div className="py-1 mx-3 text-center">
									<PeopleFill className="mx-2" style={{ fontSize: "1.3rem" }} />
									<p className="mb-0" style={{ fontSize: "0.75rem" }}>
										Rete
									</p>
								</div>
							</NavLink>

							<NavLink to={"/jobs"} className="undecorated">
								<div className="my-1 mx-3 text-center">
									<BriefcaseFill className="mx-2" style={{ fontSize: "1.3rem" }} />
									<p className="mb-0" style={{ fontSize: "0.75rem" }}>
										Lavoro
									</p>
								</div>
							</NavLink>

							<NavLink className="undecorated">
								<div className="py-1 mx-3 text-center">
									<ChatDotsFill className="mx-2" style={{ fontSize: "1.3rem" }} />
									<p className="mb-0" style={{ fontSize: "0.75rem" }}>
										Messaggi
									</p>
								</div>
							</NavLink>
							<NavLink className="undecorated">
								<div className="py-1 mx-3 text-center">
									<BellFill className="mx-2" style={{ fontSize: "1.3rem" }} />
									<p className="mb-0" style={{ fontSize: "0.75rem" }}>
										Notifiche
									</p>
								</div>
							</NavLink>
							<NavLink className="undecorated py-2 mx-3 pb-0 text-center">
								<img
									src={profile && profile.image}
									alt="foto profilo"
									style={{ width: "25px", height: "25px", borderRadius: "50%" }}
								></img>
								<NavDropdown
									className="dropstart"
									title="Tu"
									id="navbarScrollingDropdown"
									style={{ fontSize: "0.85rem", marginTop: "-8px" }}
								>
									<NavDropdown.Item onClick={(e) => e.stopPropagation()} className="defaultDrop mb-2">
										<div className="d-flex">
											<div>
												<img
													src={profile && profile.image}
													alt="foto profilo"
													style={{ width: "50px", height: "50px", borderRadius: "50%" }}
													className="me-3"
												></img>
											</div>
											<div>
												<p className="mb-0">{profile && profile.name + " " + profile.surname}</p>
												<small>{profile && profile.title}</small>
											</div>
										</div>
									</NavDropdown.Item>
									<div className="w-100 px-2 border border-1 border-light-secondary border-end-0 border-top-0 border-start-0">
										<Link
											to={"/profile/me"}
											variant="primary"
											className="btn btn-outline-primary rounded-pill w-100 py-0 mb-2"
											style={{ fontSize: "0.9rem" }}
										>
											Visualizza profilo
										</Link>
									</div>
									<NavDropdown.Item
										onClick={(e) => e.stopPropagation()}
										className="d-flex flex-column defaultDrop border border-1 border-light-secondary border-end-0 border-top-0 border-start-0"
									>
										<h6>Account</h6>
										<Link className="undecorated mb-1" style={{ fontSize: "0.9rem" }}>
											Impostazioni e privacy
										</Link>
										<Link className="undecorated mb-1" style={{ fontSize: "0.9rem" }}>
											Guida
										</Link>
										<Link className="undecorated mb-1" style={{ fontSize: "0.9rem" }}>
											Lingua
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item
										onClick={(e) => e.stopPropagation()}
										className="d-flex flex-column defaultDrop border border-1 border-light-secondary border-end-0 border-top-0 border-start-0"
									>
										<h6>Gestisci</h6>
										<Link className="undecorated mb-1" style={{ fontSize: "0.9rem" }}>
											Post e attività
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item onClick={(e) => e.stopPropagation()} className="d-flex flex-column defaultDrop">
										<Link className="undecorated" style={{ fontSize: "0.9rem" }}>
											Esci
										</Link>
									</NavDropdown.Item>
								</NavDropdown>
							</NavLink>
							<NavLink
								className="d-flex flex-column align-items-center undecorated border border-1 border-secondary border-end-0 border-top-0 border-bottom-0 ps-3"
								onClick={handleShow}
							>
								<CgMenuGridR className="mx-2 fs-4" />
								<div>
									<small className="mb-0">Per le aziende</small>
								</div>
							</NavLink>
							<Offcanvas
								show={show}
								onHide={handleClose}
								scroll={true}
								backdrop={false}
								placement="end"
								style={{ top: "68px", height: "calc(100% - 68px)", position: "fixed" }}
							>
								<Offcanvas.Header closeButton>
									<Offcanvas.Title>Per le aziende</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body>
									<div className="my-offcanvas-content">
										<div className="border border-2 border-light-secondary rounded-3 mb-2">
											<div className="border border-1 border-light-secondary border-top-0 border-end-0 border-start-0 py-3 px-4">
												<h6 className="mb-0">Scopri altri prodotti LinkedIn</h6>
											</div>
											<Row xs={4} className="px-2 py-3 gy-2">
												<Col className="d-flex flex-column align-items-center">
													<BsFillPlayBtnFill className="fs-3 text-primary " />
													<Link
														className="undecorated text-center"
														style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}
													>
														Learning
													</Link>
												</Col>
												<Col className="d-flex flex-column align-items-center">
													<CgInsights className="fs-3 text-primary " />
													<Link
														className="undecorated text-center"
														style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}
													>
														Insights
													</Link>
												</Col>
												<Col className="d-flex flex-column align-items-center">
													<MdOutlineWork className="fs-3 text-primary " />
													<Link
														className="undecorated text-center"
														style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}
													>
														Pubblica un'offerta di lavoro
													</Link>
												</Col>
												<Col className="d-flex flex-column align-items-center">
													<TbTargetArrow className="fs-3 text-primary " />
													<Link
														className="undecorated text-center"
														style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}
													>
														Pubblicizza
													</Link>
												</Col>
												<Col className="d-flex flex-column align-items-center">
													<FaRegCompass className="fs-3 text-primary " />
													<Link
														className="undecorated text-center"
														style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}
													>
														Vendi
													</Link>
												</Col>
												<Col className="d-flex flex-column align-items-center">
													<MdGroups className="fs-3 text-primary " />
													<Link
														className="undecorated text-center"
														style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}
													>
														Gruppi
													</Link>
												</Col>
												<Col className="d-flex flex-column align-items-center">
													<FaUserCheck className="fs-3 text-primary " />
													<Link
														className="undecorated text-center"
														style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}
													>
														Marketplace dei servizi
													</Link>
												</Col>
											</Row>
										</div>

										<div className="border border-2 border-light-secondary rounded-3">
											<div className="border border-1 border-light-secondary border-top-0 border-end-0 border-start-0 py-3 px-4">
												<h6 className="mb-0">Scopri altro per il business</h6>
											</div>
											<div className="d-flex flex-column border border-1 border-light-secondary border-top-0 border-end-0 border-start-0 py-3 px-4">
												<Link className="text-decoration-none text-black mb-1">Assumi su Linkedin</Link>
												<Link className="text-decoration-none text-black mb-1">Vendi con LinkedIn</Link>
												<Link className="text-decoration-none text-black mb-1">Offerta di lavoro gratuita</Link>
												<Link className="text-decoration-none text-black mb-1">Fai pubblicità su LinkedIn</Link>
												<Link className="text-decoration-none text-black mb-1">Impara con LinkedIn</Link>
												<Link className="text-decoration-none text-black mb-1">Centro amministrazione</Link>
											</div>
											<div className="d-flex align-items-center py-3 px-4">
												<Link className="text-decoration-none text-black me-2">Crea una pagina aziendale</Link>{" "}
												<FaPlus />
											</div>
										</div>
									</div>
								</Offcanvas.Body>
							</Offcanvas>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{showSubNavbar && (
				<Container fluid className="sub-navbar shadow-sm py-1 sticky-top">
					<Container>
						<div className="d-flex align-items-center justify-content-between">
							{/* Parte sinistra: Profilo utente */}
							<div className="d-flex align-items-center">
								<Link to={"/profile/me"}>
									<img
										src={profile && profile.image}
										alt="Profilo"
										className="rounded-circle me-4"
										style={{ width: "36px", height: "36px" }}
									/>
								</Link>
								<div>
									<NavLink className="undecorated fw-bold">{profile && profile.name + " " + profile.surname}</NavLink>
									<div className="text-muted">{profile && profile.title}</div>
								</div>
							</div>
							{/* Parte destra: Pulsanti */}
							<div>
								<button className="btn btn-outline-primary btn-sm me-2">Aggiungi sezione del profilo</button>
								<button className="btn btn-primary btn-sm">Disponibile per</button>
							</div>
						</div>
					</Container>
				</Container>
			)}
		</>
	);
}

export default NavBar;
