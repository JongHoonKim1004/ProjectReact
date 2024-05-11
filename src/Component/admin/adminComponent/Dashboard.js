import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // 회원 목록, 설문조사 목록 state
  const [usersList, setUsersList] = useState([]);
  const [surveyList, setSurveyList] = useState([]);

  // 화면 호출시 바로 시행
  useEffect(() => {
    // 화면 제일 위로
    window.scroll(0,0);


  },[]);
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>Dashboard</h1>
      </div>
      <Row className="p-5">
        <Col md="3">
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <i className="fa fa-users fa-5x"></i>
                </Col>
                <Col>
                  <Row>
                    <h3 style={{ textAlign: "right" }}>유저 수</h3>
                  </Row>
                  <Row>
                    <span className="usersNum" style={{ textAlign: "right" }}>
                      12
                    </span>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="3">
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <i className="fa fa-users fa-5x"></i>
                </Col>
                <Col>
                  <Row>
                    <h3 style={{ textAlign: "right" }}>설문 수</h3>
                  </Row>
                  <Row>
                    <span className="usersNum" style={{ textAlign: "right" }}>
                      12
                    </span>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="3">
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <i className="fa fa-users fa-5x"></i>
                </Col>
                <Col>
                  <Row>
                    <h3 style={{ textAlign: "right" }}>문의 수</h3>
                  </Row>
                  <Row>
                    <span className="usersNum" style={{ textAlign: "right" }}>
                      12
                    </span>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="3">
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <i className="fa fa-users fa-5x"></i>
                </Col>
                <Col>
                  <Row>
                    <h5 style={{ textAlign: "right" }}>총 조사인원 수</h5>
                  </Row>
                  <Row>
                    <span className="usersNum" style={{ textAlign: "right" }}>
                      12
                    </span>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="p-5">
        <Col>
          <Row className="pb-1">
            <h3>최근 등록된 설문조사</h3>
          </Row>
          <Row  className="p-3">
            <Table>
              <thead>
                <tr>
                  <th>설문 제목</th>
                  <th>설문 사업자</th>
                  <th>설문 응답자</th>
                  <th>응답 시간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row>
            <Link to={'/admin/survey/list'}>
              <Button variant="primary">전체 목록 보기</Button>
            </Link>
          </Row>
        </Col>
      </Row>
      <Row className="p-5">
        <Col>
          <Row className="pb-1">
            <h3>최근 가입한 회원</h3>
          </Row>
          <Row  className="p-3">
            <Table>
              <thead>
                <tr>
                  <th>아이디</th>
                  <th>이름</th>
                  <th>연락처</th>
                  <th>가입일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row>
            <Link to={'/admin/users/list'}>
              <Button variant="primary">전체 회원 목록 보기</Button>
            </Link>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default Dashboard;
