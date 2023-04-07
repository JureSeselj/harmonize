import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavLink from "react-router-dom/NavLink";

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
                <img src="" style={{ width: '350px' }} alt=""/>
            <Card.Body>
              <NavLink to="/signup">
                <Button variant="secondary">Happy to join</Button>
              </NavLink>
              <NavLink to="/signin">
                <Button variant="secondary">
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