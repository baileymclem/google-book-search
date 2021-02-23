import React from "react";
import { Col, Row, Container, Card } from "react-bootstrap";

function NoMatch() {
  return (

    <Container fluid>
      <Row>
        <Col>

        <br />
          <Card className="text-center" border="dark">
            <Card.Body>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
            </Card.Body>
          </Card>
          <br />

        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;
