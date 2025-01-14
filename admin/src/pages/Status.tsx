import { Alert, Container, Row, Col } from "react-bootstrap";
export default function Status() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col className="text-center">
          <Alert variant="info" className="p-4 shadow">
            <h3 className="mb-3">Your approval is pending</h3>
            <p>Please wait for an administrator to review your request.</p>
          </Alert>
        </Col>
      </Row>
    </Container>

  )
}
