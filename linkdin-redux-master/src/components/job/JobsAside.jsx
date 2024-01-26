import { Card, Col } from "react-bootstrap";
import { IoSettingsSharp } from "react-icons/io5";
import { FaBookmark, FaListUl } from "react-icons/fa";
import { BsClipboard2Check, BsFillPlayBtnFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const JobsAside = () => {
  return (
    <Col className="d-flex flex-wrap">
      <Card className="d-flex flex-column align-items-start bg-white py-4 px-4">
        <div className="text-start">
          <ul className="list-unstyled mb-0">
            <li>
              <div className="d-flex align-items-center mb-4">
                <FaBookmark className="me-3 fs-4" />{" "}
                <Link style={{ textDecoration: "none", color: "black" }} className="mb-0">
                  Le mie offerte di lavoro
                </Link>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center mb-4">
                <FaListUl className="me-3 fs-4" />{" "}
                <Link style={{ textDecoration: "none", color: "black" }} className="mb-0">
                  Preferenze
                </Link>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center mb-4">
                <BsClipboard2Check className="me-3 fs-4" />{" "}
                <Link style={{ textDecoration: "none", color: "black" }} className="mb-0">
                  Valutazioni delle competenze
                </Link>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center mb-4">
                <BsFillPlayBtnFill className="me-3 fs-4" />{" "}
                <Link style={{ textDecoration: "none", color: "black" }} className="mb-0">
                  Indicazioni per chi cerca lavoro
                </Link>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <IoSettingsSharp className="me-3 fs-4" />{" "}
                <Link style={{ textDecoration: "none", color: "black" }} className="mb-0">
                  Impostazioni di candidatura
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </Col>
  );
};

export default JobsAside;
