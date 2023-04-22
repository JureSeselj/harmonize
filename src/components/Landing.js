import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import landingImage from "../assets/landing-page.jpg";
import styles from "../styles/Landing.module.css";
import appStyles from "../App.module.css";

/*
  Landing page with app description and links to social media in footer
*/
const Landing = () => {
    return (
    <>
        <Row className="text-center">
          <Col sm={12}>
          <Container>
          <Card>
            <Card.Body>
                <Card.Title>
                    <h1 className="mb-4">Harmonize</h1>
                </Card.Title>
                <Card.Text className="font-weight-bold">
                Harmonize is a Photo Sharing Platform. If you’re looking for an
                inspiration for your next photo, you’re in the right place.
                <br />
                <br />
                Join the harmony revolution, Harmonize your social life and become an inspiration for
                someone else!
              </Card.Text>
            </Card.Body>
              <img 
              src={landingImage} 
              className={styles.LandingImage} 
              alt="Images" 
              />
            <Card.Body>
              <NavLink to="/signup">
              <Button className={`${appStyles.button} ${styles.LandingButtonMargin} mb-3`}>
                 Happy to join!
              </Button>
              </NavLink>
              <NavLink to="/login">
                <Button className={`${appStyles.button} mb-3`}>
                  I’m already a member, log me in!
                </Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
    <Container>
      <footer className={styles.footer}>
        <div className="float-left">
          <p>Designed by Jure Seselj</p>
        </div>

        <div className="float-right pb-3">
        <a
            href="https://www.linkedin.com/in/jure-seselj-062654192/"
            aria-label="Visit me on LinkedIn (opens in new tab)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin" />
          </a>
          <a
            href="https://github.com/JureSeselj/harmonize"
            aria-label="Check the website GitHub page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" />
          </a>
        </div>
      </footer>
    </Container>
    </>
  );
};

export default Landing;