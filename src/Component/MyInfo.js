import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyInfo = () => {
  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8">
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>내 정보 관리</h1>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 마이페이지 {`>`} 내 정보 관리
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <p
              style={{
                display: "block",
                lineHeight: "24px",
                fontSize: "24px",
                float: "left",
                marginRight: "10px",
              }}
            >
              개인정보 수정
            </p>
            <p
              style={{
                display: "block",
                lineHeight: "24px",
                fontSize: "14px",
                float: "left",
                color: "#888",
              }}
            >
              정확한 정보를 입력하셔야 조사 참여의 기회가 주어집니다
            </p>
            <p style={{ fontSize: "14px", float: "right" }}>
              * 표시는 필수입력 사항입니다.
            </p>
            <div className="container pt-5">
              <Form style={{marginTop: "50px", backgroundColor: "white", borderTop: "3px solid RGB(3, 131, 206)", padding: "40px 25px"}}>
                <Form.Group as={Row} className="mb-5">
                  <Form.Label column sm="3">
                    이름
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control></Form.Control>
                  </Col>
                </Form.Group>
                <hr/>
                <Form.Group as={Row} className="mb-5">
                  <Form.Label column sm="3">
                    생년월일 / 성별
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control></Form.Control>
                  </Col>
                </Form.Group>
                <hr/>
                <Form.Group as={Row} className="mb-5">
                  <Form.Label column sm="3">
                    거주지역 *
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control></Form.Control>
                  </Col>
                </Form.Group>
                <hr/>
                <Form.Group as={Row} className="mb-5">
                  <Form.Label column sm="3">
                    휴대폰정보 *
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control></Form.Control>
                  </Col>
                </Form.Group>
                <hr/>
                <Form.Group as={Row} className="mb-5">
                  <Form.Label column sm="3">
                    비밀번호
                  </Form.Label>
                  <Col sm="9">
                    <Link to={`/changePassword/`}>
                      <Button>
                        비밀번호 변경
                      </Button>
                    </Link>
                  </Col>
                </Form.Group>
                <hr/>
                <Form.Group as={Row} className="mb-5">
                  <Form.Label column sm="3">
                    결혼여부
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control></Form.Control>
                  </Col>
                </Form.Group>
                <hr/>
                <Form.Group as={Row} className="mb-5">
                  <Form.Label column sm="3">
                    직업
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control></Form.Control>
                  </Col>
                </Form.Group>
                <Button type="submit" variant="primary" size="lg">
                  수정완료
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default MyInfo;
