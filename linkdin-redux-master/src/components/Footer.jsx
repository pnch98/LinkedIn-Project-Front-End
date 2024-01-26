import React from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { FaQuestionCircle, FaCog, FaBalanceScale } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    location.pathname !== "/" ||
    (location.pathname !== "/jobs" && (
      <footer className="footer mt-auto py-3">
        <Container>
          <Row className="justify-content-between">
            <Col>
              <Row>
                <Col>
                  <h6>Informazioni</h6>
                  <ul>
                    <li>Linee guida della community</li>
                    <li>Privacy e condizioni</li>
                    <li>Sales Solutions</li>
                    <li>Centro sicurezza</li>
                  </ul>
                </Col>
                <Col>
                  <h6>Accessibilità</h6>
                  <ul>
                    <li>Carriera</li>
                    <li>Opzioni per gli annunci pubblicitari</li>
                    <li>Mobile</li>
                  </ul>
                </Col>
                <Col>
                  <h6>Talent Solutions</h6>
                  <ul>
                    <li>Soluzioni di marketing</li>
                    <li>Pubblicità</li>
                    <li>Piccole imprese</li>
                  </ul>
                </Col>
                <Col>
                  <h6>
                    <FaQuestionCircle /> Domande?
                  </h6>
                  <p>Visita il nostro Centro assistenza.</p>
                  <h6>
                    <FaCog /> Gestisci il tuo account e la tua privacy
                  </h6>
                  <p>Vai alle impostazioni</p>
                  <h6>
                    <FaBalanceScale /> Trasparenza sui contenuti consigliati
                  </h6>
                  <p>Scopri di più sui contenuti consigliati.</p>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={3}>
              <Dropdown className="border">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Seleziona lingua
                </Dropdown.Toggle>
                <Dropdown.Menu className="langDrop">
                  <Dropdown.Item className="dropHover" href="#/action-1">
                    Italiano (Italiano)
                  </Dropdown.Item>
                  <Dropdown.Item className="dropHover" href="#/action-2">
                    Esperanto (Esperanto)
                  </Dropdown.Item>
                  <Dropdown.Item className="dropHover" href="#/action-3">
                    Portuguese (Portuguese)
                  </Dropdown.Item>
                  <Dropdown.Item className="dropHover" href="#/action-4">
                    Russo (Russo)
                  </Dropdown.Item>
                  <Dropdown.Item className="dropHover" href="#/action-5">
                    Inglese (Inglese)
                  </Dropdown.Item>
                  <Dropdown.Item className="dropHover" href="#/action-6">
                    Francese (Francese)
                  </Dropdown.Item>
                  <Dropdown.Item className="dropHover" href="#/action-7">
                    Polonese (Polonese)
                  </Dropdown.Item>
                  <Dropdown.Item className="dropHover" href="#/action-8">
                    Portoghese (Portoghese)
                  </Dropdown.Item>
                  <Dropdown.Item className="dropHover" href="#/action-9">
                    Catalano (Catalano)
                  </Dropdown.Item>
                  <Dropdown.Item className="dropHover" href="#/action-10">
                    Grecco (Grecco)
                  </Dropdown.Item>
                  <Dropdown.Item className="dropHover" href="#/action-10">
                    Tedesco (Tedesco)
                  </Dropdown.Item>
                  <Dropdown.Item className="dropHover" href="#/action-10">
                    Cinese (Cinese)
                  </Dropdown.Item>
                  <Dropdown.Item className="dropHover" href="#/action-10">
                    Arabo (Arabo)
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row className="text-center mt-3">
            <Col>
              <p>LinkedIn Corporation © 2024</p>
            </Col>
          </Row>
        </Container>
      </footer>
    ))
  );
};

export default Footer;
