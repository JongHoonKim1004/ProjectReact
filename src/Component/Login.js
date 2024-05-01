import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigation = useNavigate();
  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>로그인</h1>
              <p style={{ fontSize: "12px", fontWeight: "100" }}>
                환영합니다. 엠브레인 패널파워 회원 로그인 페이지입니다. 여러분의
                의견이 세상을 움직입니다.
              </p>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 로그인
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Container style={{ backgroundColor: "white" }} className="p-5">
              <Row>
                <Col>
                  <Form>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        아이디
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control name="username" id="username" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        비밀번호
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="password"
                          name="password"
                          id="password"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <button
                        type="submit"
                        style={{
                          width: "auto",
                          padding: 0,
                          border: 0,
                          marginRight: "5px",
                        }}
                      >
                        <img alt="login" src="/img/login/loginBt_70x35.gif" />
                      </button>
                      <button
                        type="button"
                        style={{
                          width: "auto",
                          padding: 0,
                          border: 0,
                          marginRight: "5px",
                        }}
                        onClick={() => navigation('/register_terms')}
                      >
                        <img alt="register" src="/img/login/joinBt_80x35.gif" />
                      </button>
                      <button
                        type="button"
                        style={{
                          width: "auto",
                          padding: 0,
                          border: 0,
                          marginRight: "5px",
                        }}
                      >
                        <img
                          alt="idFind"
                          src="/img/login/idSearchBt_90x35.gif"
                        />
                      </button>
                      <button
                        type="button"
                        style={{ width: "auto", padding: 0, border: 0 }}
                      >
                        <img
                          alt="pwFind"
                          src="/img/login/pwSearchBt_105x35.gif"
                        />
                      </button>
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Row>
                    <Col md="3">
                      <img alt="" src="/img/login/loginLogo_img.gif" />
                    </Col>
                    <Col md="9" style={{paddingLeft: "15px"}}>
                      <p style={{fontSize: "12px", margin: "3px"}}>엠브레인 패널파워는</p>
                      <p style={{fontSize: "12px", margin: "3px"}}>국내 조사회사 중 유일하게 개인정보보호</p>
                      <p style={{fontSize: "12px", margin: "3px"}}>우수사이트 인증을 받았으며 패널님의</p>
                      <p style={{fontSize: "12px", margin: "3px"}}>소중한 정보를 안전하게 관리하고 있습니다.</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default Login;
