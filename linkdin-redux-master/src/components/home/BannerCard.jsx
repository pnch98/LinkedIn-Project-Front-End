import React, { useState, useEffect } from "react";
import { Card, Button, Image } from "react-bootstrap";
import { FaLinkedin, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const BannerCard = () => {
  const [showImageCard, setShowImageCard] = useState(true);
  const [enterNewCard, setEnterNewCard] = useState(true);
  const myProfile = useSelector((state) => state.fetchMyProfile.data);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowImageCard((prevShowImageCard) => !prevShowImageCard);
    }, 15000);

    const transitionTimer = setTimeout(() => {
      setEnterNewCard(false);
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(transitionTimer);
    };
  }, []);

  return (
    <>
      {/* CARD CON IMMAGINE  */}
      <div className="banner-container my-3 d-flex align-items-center">
        <Card className={`banner-profile ${showImageCard ? "card-visible" : "card-transition"}`}>
          <Image src={"/assets/img/BannerImg.png"} style={{ objectFit: "cover" }} />
        </Card>
        <Card className={`banner-profile ${showImageCard ? "card-transition" : "card-visible"}`}>
          <Card.Body>
            <Card.Title>{myProfile && myProfile.name + " " + myProfile.surname}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">stand out among other applicants</Card.Subtitle>
            <div className="d-flex align-items-center justify-content-around">
              <div style={{ width: "50px", height: "50px", borderRadius: "50%" }}>
                <img
                  src={myProfile && myProfile.image}
                  alt="Profile"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </div>

              <FaLinkedin size={50} color="#0e76a8" className="ml-3" />
            </div>
            <Card.Text className="my-2">Get ahead in 2024 with new Premium features</Card.Text>
            <div className="text-center">
              <Button variant="outline-primary btn-sm" className="btn rounded-pill ">
                Try for free
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default BannerCard;
