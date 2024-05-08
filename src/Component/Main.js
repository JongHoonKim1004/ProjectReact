import React from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
  const navigation = useNavigate();
  return (
    <div>
      <Container>
        <Row
          style={{
            backgroundColor: "#5592c2",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div className="col-lg-8" style={{ padding: "0" }}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/main/banner_1.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/main/banner_2.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-lg-4">
            <Card
              style={{
                backgroundColor: "transparent",
                border: "0",
                width: "100%",
                height: "100%",
                color: "white",
              }}
            >
              <Card.Body>
                <div style={{ width: "100%", height: "100%" }}>
                  <Form>
                    <Row className="mb-2">
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="4">
                          아이디
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            name="name"
                            id="name"
                            placeholder="example@example.com"
                          />
                        </Col>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextpassword"
                      >
                        <Form.Label column sm="4">
                          비밀번호
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            name="password"
                            id="password"
                            type="password"
                          />
                        </Col>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Col sm="6">
                        <Button
                          variant="primary"
                          type="submit"
                          style={{
                            float: "right",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          로그인
                        </Button>
                      </Col>
                      <Col sm="6">
                        <Button
                          variant="primary"
                          type="button"
                          style={{ width: "100%", textAlign: "center" }}
                          onClick={() => navigation('/register_terms')}

                        >
                          <Link
                            
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            회원가입
                          </Link>
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <Button
                          variant="primary"
                          type="button"
                          style={{
                            float: "right",
                            width: "100%",
                            textAlign: "center",
                          }}
                          onClick={() => navigation('/idFind')}

                        >
                          <Link
                            
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            아이디 찾기
                          </Link>
                        </Button>
                      </Col>
                      <Col sm="6">
                        <Button
                          variant="primary"
                          type="button"
                          style={{ width: "100%", textAlign: "center" }}
                          onClick={() => navigation('/pwFind')}

                        >
                          <Link
                            
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            비밀번호 찾기
                          </Link>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>
      <Container>
        <Row>
        <div style={{backgroundColor: "#e2f4f7", height: "20px"}}></div>
        </Row>
      </Container>
      <Container>
        <Row>
          <div class="col-md-12" style={{ backgroundColor: "#bbebd2" }}>
            <Row>
              <Col md="1"></Col>
              <Col md="10">
                <Row>
                  <Col md="4" style={{cursor: "pointer"}}>
                    <img alt="" src="img/main/mPanelTabBt3_on.gif"/>
                  </Col>
                </Row>
                <Row style={{ height: "430px", margin: "20px 0" }}>
                  <div className="col-md-3">
                    <Card>
                      <ListGroup variant="flush">
                        <ListGroup.Item style={{ height: "90px" }}>
                          여기에 제목이 들어갑니다
                        </ListGroup.Item>
                        <ListGroup.Item style={{ height: "90px" }}>
                          여기에 정보가 들어갑니다
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </div>
                </Row>
              </Col>
              <Col md="1"></Col>
            </Row>
          </div>
        </Row>
      </Container>
      <Container>
        <Row>
        <div style={{backgroundColor: "#e2f4f7", height: "20px"}}></div>
        </Row>
      </Container>
      <Container style={{backgroundColor: "#f0f0f0"}}>
        <Row>
          <Col>
            <Row>
              <Col>
                <Row>
                  <Link to="/admin">관리자 페이지</Link>
                </Row>
                <Row></Row>
              </Col>
              <Col>
                <img alt="" src="img/main/mSaving_bg.gif"/>
              </Col>
              <Col>
                <img alt="" src="img/main/mProtectionImg.gif"/>
              </Col>
            </Row>
            <Row  className="mb-2 mt-2">
              <Col style={{display: "flex", alignItems: "center"}}>
                <img alt="" src="img/main/mPhoneInfo_tx.gif"></img>
              </Col>
              <Col sm="3" style={{display: "flex", justifyContent: "center"}}>
                <img alt="" src="img/main/mFaqImg.gif"/>
              </Col>
              <Col sm="3" style={{display: "flex", justifyContent: "center"}}>
                <img alt="" src="img/main/mQnaImg.gif"/>
              </Col>
              <Col sm="3" style={{display: "flex", justifyContent: "center"}}>
                <img alt="" src="img/main/mAppDownImg.gif"/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
