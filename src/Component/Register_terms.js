import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Register_terms = () => {
  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>패널가입</h1>
              <p style={{ fontSize: "12px", fontWeight: "100" }}>
                회원가입을 위해 아래 이용약관과 개인정보 수집 및 이용에 대한 안내를 읽고 동의해 주세요.
              </p>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 회원가입
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8"></Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default Register_terms;