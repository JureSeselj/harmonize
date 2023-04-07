import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import NavLink from "react-router-dom/NavLink";
import landingImage from "../assets/landing-page.jpg";
import styles from "../styles/Landing.module.css";

const Landing = () => {
    return (
      <div>
        <Row>
          <Col sm={12}>
          <Card className="text-center">
            <Card.Body>
                <Card.Title>
                    <h1>Harmonize - Get started</h1>
                </Card.Title>
                <Card.Text>
                Harmonize is Photo Sharing Platform. If you’re looking for an
                inspiration for your next photo, you’re in the right place.
                <br />
                <br />
                Join our community, find ideas and become an inspiration for
                someone else!
              </Card.Text>
            </Card.Body>
              <img src={landingImage} className={styles.LandingImage} alt="Images" />
            <Card.Body className="mb-3">
              <NavLink to="/signup">
                <Button className="mx-2">Happy to join</Button>
              </NavLink>
              <NavLink to="/signin">
                <Button className="mx-2">
                  I’m already a member, log me in!
                </Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Landing;