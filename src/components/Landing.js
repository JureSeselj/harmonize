import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import NavLink from "react-router-dom/NavLink";
import landingImage from "../assets/landing-page.jpg";
import styles from "../styles/Landing.module.css";

const Landing = () => {
    return (
        <Row className="text-center">
          <Col sm={12}>
          <Container>
          <Card>
            <Card.Body>
                <Card.Title>
                    <h1>Harmonize - Get started</h1>
                </Card.Title>
                <Card.Text className="font-weight-bold">
                Harmonize is Photo Sharing Platform. If you’re looking for an
                inspiration for your next photo, you’re in the right place.
                <br />
                <br />
                Join our community, find ideas and become an inspiration for
                someone else!
              </Card.Text>
            </Card.Body>
              <img 
              src={landingImage} 
              className={styles.LandingImage} 
              alt="Images" 
              />
            <Card.Body className="mb-3">
              <NavLink to="/signup">
                <Button className={styles.LandingButton}> Happy to join</Button>
              </NavLink>
              <NavLink to="/signin">
                <Button className={styles.LandingButton}>
                  I’m already a member, log me in!
                </Button>
              </NavLink>
            </Card.Body>
          </Card>
          </Container>
        </Col>
      </Row>
  );
};

export default Landing;