import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MyPoint = () => {
  // useNavigate
  const navigation = useNavigate();

  // redux
  const dispatch = useDispatch();
  const { user, userPoint, token } = useSelector(state => state.auth);

  // 로그인 확인
  useEffect(() => {
    if(token == null){
      alert("로그인 후 이용 가능합니다");
      navigation('/login');
    } else if(token != null && user == null){
      alert("일반회원만 이용 가능합니다");
      navigation('/');
    }

  },[]);

  // 포인트 상태
  const [pointTotal, setPointTotal] = useState(userPoint ? userPoint.pointTotal : null);
  const [pointUsed, setPointUsed] = useState(userPoint ? userPoint.pointUsed : null);
  const [pointWaiting, setPointWaiting] = useState(0);
  const [pointBalance, setPointBalance] = useState(userPoint ? userPoint.pointBalance : null);


  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>포인트 관리</h1>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 마이페이지 {`>`} 포인트 관리
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <p
              style={{
                fontWeight: "550",
                fontSize: "20px",
                marginBottom: "5px",
              }}
            >
              포인트 확인
            </p>
            <p style={{ fontSize: "12px", lineHeight: "12px" }}>
              패널님께서 현재까지 모으신 포인트을 확인하고 신청하실 수 있습니다.
            </p>
            <div
              className="container"
              style={{
                backgroundImage: "url('img/mypoint/pointChack_bg.gif')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Row className="justify-content-md-center pt-4 pb-4">
                <Col md="10" className="m-2 mb-4">
                  <h5>현재까지 쌓은 포인트 현황입니다.</h5>
                </Col>
                <Col
                  md="5"
                  className="m-2 pt-4 pb-4"
                  style={{ backgroundColor: "RGB(62, 176, 226)" }}
                >
                  <div className="container">
                    <Row>
                      <Col md="4">
                        <img alt="" src="img/mypoint/pointChackIcon1.gif" />
                      </Col>
                      <Col
                        md="8"
                        style={{
                          textAlign: "right",
                          fontSize: "18px",
                          color: "white",
                        }}
                      >
                        <p>모으신 총 포인트</p>
                        <p>
                          <span style={{ fontSize: "30px", fontWeight: "650" }}>
                            {pointTotal}
                          </span>{" "}
                          원
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col
                  md="5"
                  className="m-2 pt-4 pb-4"
                  style={{ backgroundColor: "RGB(62, 176, 226)" }}
                >
                  <div className="container">
                    <Row>
                      <Col md="4">
                        <img alt="" src="img/mypoint/pointChackIcon2.gif" />
                      </Col>
                      <Col
                        md="8"
                        style={{
                          textAlign: "right",
                          fontSize: "18px",
                          color: "white",
                        }}
                      >
                        <p>사용하신 총 포인트는</p>
                        <p>
                          <span style={{ fontSize: "30px", fontWeight: "650" }}>
                            {pointUsed}
                          </span>{" "}
                          원
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col
                  md="5"
                  className="m-2 pt-4 pb-4"
                  style={{ backgroundColor: "RGB(62, 176, 226)" }}
                >
                  <div className="container">
                    <Row>
                      <Col md="4">
                        <img alt="" src="img/mypoint/pointChackIcon3.gif" />
                      </Col>
                      <Col
                        md="8"
                        style={{
                          textAlign: "right",
                          fontSize: "18px",
                          color: "white",
                        }}
                      >
                        <p>지급 대기중인 적립금은</p>
                        <p>
                          <span style={{ fontSize: "30px", fontWeight: "650" }}>
                            {pointWaiting}
                          </span>{" "}
                          원
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col
                  md="5"
                  className="m-2 pt-4 pb-4"
                  style={{ backgroundColor: "RGB(48, 110, 237)" }}
                >
                  <div className="container">
                    <Row>
                      <Col md="4">
                        <img alt="" src="img/mypoint/pointChackIcon4.gif" />
                      </Col>
                      <Col
                        md="8"
                        style={{
                          textAlign: "right",
                          fontSize: "18px",
                          color: "white",
                        }}
                      >
                        <p>잔여 총 적립금은</p>
                        <p>
                          <span style={{ fontSize: "30px", fontWeight: "650" }}>
                            {pointBalance}
                          </span>{" "}
                          원
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Container style={{ height: "80px" }}>
          <Row className="justify-content-md-center mt-4">
            <Col md="7">
              <Row>
                <Col>
                  <Link to="/myPointLog">
                    <img alt="적립급 상세내역 보기" src="img/mypoint/pointViewBt_244x45.gif" />
                  </Link>
                </Col>
                <Col>
                  <Link>
                    <img
                      alt="적립금 신청하기"
                      src="img/mypoint/pointApplicationBt_204x45.gif"
                    />
                  </Link>
                </Col>
                <Col>
                  <Link>
                    <img alt="적립금 사용방법" src="img/mypoint/pointUseMethodBt_204x45.gif" />
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default MyPoint;
