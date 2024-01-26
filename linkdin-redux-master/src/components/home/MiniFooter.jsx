import React from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

const MiniFooter = () => {
  return (
    <div id="mini-footer" className="d-flex flex-column">
      <div className="d-flex flex-wrap justify-content-center" style={{ color: "gray" }}>
        <small className="mx-1 my-1">Informazioni</small>
        <small className="mx-1 my-1">Accessibilità</small>
        <small className="mx-1 my-1">Centro Assistenza</small>
        <small className="mx-1 my-1">Centro sicurezza</small>

        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            className="bg-none mx-1"
            style={{ border: "none", color: "gray", backgroundColor: "transparent" }}
            size="sm"
            id="dropdown-basic"
          >
            Privacy e condizioni
          </Dropdown.Toggle>
          <Dropdown.Menu className="langDrop">
            <Dropdown.Item className="dropHover" href="#/action-1">
              Termini e condizioni delle Pagine LinkedIn
            </Dropdown.Item>
            <Dropdown.Item className="dropHover" href="#/action-2">
              Informazioni sui cookie
            </Dropdown.Item>
            <Dropdown.Item className="dropHover" href="#/action-3">
              Informazioni sul copyright
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <small className="mx-1 my-1">Opzioni per gi annunci pubblicitari</small>
        <small className="mx-1 my-1">Pubblicità</small>
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            className="bg-none"
            style={{ border: "none", color: "gray", backgroundColor: "transparent" }}
            size="sm"
            id="dropdown-basic"
          >
            Servizi alle aziende
          </Dropdown.Toggle>
          <Dropdown.Menu className="langDrop">
            <Dropdown.Item className="dropHover" href="#/action-4">
              Centro amministrazione
            </Dropdown.Item>
            <Dropdown.Item className="dropHover" href="#/action-5">
              Crea una pagina aziendale <FiPlus />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div>
          <small className="mx-1 my-1">Scarica l'app LinkedIn</small>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 56 14"
            id="linkedin-logo-blue-xxsmall"
            aria-hidden="true"
            role="none"
            data-supported-dps="56x14"
            width="56"
            height="14"
          >
            <g>
              <path
                d="M22.1 8.2l3.09 3.8h-2.44L20 8.51V12h-2V2h2v5.88L22.54 5h2.55zm-8-3.4A2.7 2.7 0 0011.89 6V5H10v7h2V8.73a1.73 1.73 0 011.54-1.92h.12C14.82 6.8 15 7.94 15 8.73V12h2V8.29c0-2.2-.73-3.49-2.86-3.49zM32 8.66a3.23 3.23 0 010 .44h-5.25v.07a1.79 1.79 0 001.83 1.43 2.51 2.51 0 001.84-.69l1.33 1a4.3 4.3 0 01-3.25 1.29 3.49 3.49 0 01-3.7-3.26 4 4 0 010-.49 3.58 3.58 0 013.5-3.65h.26C30.44 4.8 32 6.13 32 8.66zm-1.86-.86a1.45 1.45 0 00-1.51-1.4h-.08a1.63 1.63 0 00-1.8 1.4zM2 2H0v10h6v-2H2zm36 0h2v10h-1.89v-.7a2.45 2.45 0 01-2 .9 3.41 3.41 0 01-3.32-3.5 1.41 1.41 0 010-.2 3.35 3.35 0 013-3.68h.3a2.61 2.61 0 011.9.7zm.15 6.5a1.64 1.64 0 00-1.4-1.84h-.22A1.76 1.76 0 0034.9 8.5a1.76 1.76 0 001.63 1.85 1.62 1.62 0 001.63-1.63.81.81 0 00-.01-.22zM8 1.8A1.27 1.27 0 006.75 3a1.25 1.25 0 002.5 0A1.27 1.27 0 008 1.8zM7 12h2V5H7zM56 1v12a1 1 0 01-1 1H43a1 1 0 01-1-1V1a1 1 0 011-1h12a1 1 0 011 1zM46 5h-2v7h2zm.25-2A1.25 1.25 0 1045 4.25 1.25 1.25 0 0046.25 3zM54 8.29c0-2.2-.73-3.49-2.86-3.49A2.71 2.71 0 0048.89 6V5H47v7h2V8.73a1.73 1.73 0 011.54-1.92h.12C51.82 6.8 52 7.94 52 8.73V12h2z"
                fill="#0a66c2"
              />
            </g>
          </svg>
          <small className="ms-1">Linkedin Corporetions &copy; 2024</small>
        </div>
      </div>
    </div>
  );
};

export default MiniFooter;
