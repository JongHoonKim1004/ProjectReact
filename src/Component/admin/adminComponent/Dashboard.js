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

    // Call all Lists
    const fetchLists = async () => {
      try {
        // fetch()를 사용하여 서버로부터 데이터 요청
        const response = await fetch(`http://localhost:8080/users/list`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();  // 응답 데이터를 JSON 형태로 파싱
        console.log(data);
        setUsersList(data);  // 상태 업데이트
      } catch (error) {
        console.error('Fetching users failed:', error);
      }
    };

    fetchLists();

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
                      {usersList.length}
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
                  <th>자세히보기</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.nickname}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Link to={"/admin/users/read/" + user.usersId}>
                        <Button size="sm">자세히보기</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                
                
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
