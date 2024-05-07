import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';


const Dashboard = () => {
  return (
    <main className='p-5' style={{ backgroundColor: "RGB(235, 235, 235)"}}>
      <div style={{padding: "16px 24px", color: "#44596e"}}>
        <h1>Dashboard</h1>
      </div>
      <Row className='pt-5 px-5'>
        <Col md="3">
          <Card>
            <Card.Body>
              <Row>
                <Col>1</Col>
                <Col>2</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="3">
          <Card>
            <Card.Body>
              <Row>
                <Col>1</Col>
                <Col>2</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="3">
          <Card>
            <Card.Body>
              <Row>
                <Col>1</Col>
                <Col>2</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="3">
          <Card>
            <Card.Body>
              <Row>
                <Col>1</Col>
                <Col>2</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </main>
  );
};

export default Dashboard;