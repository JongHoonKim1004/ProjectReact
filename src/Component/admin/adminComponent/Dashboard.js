import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // 회원 목록, 설문조사 목록 state
  const [usersList, setUsersList] = useState([]);
  const [surveyList, setSurveyList] = useState([]);
  const [vocList, setVocList] = useState([]);

  // 날짜 input 변경
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = '' + d.getFullYear();

    if(month.length < 2){
      month = '0' + month;
    }
    if(day.length < 2){
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }


  // 화면 호출시 바로 시행
  useEffect(() => {
    // 화면 제일 위로
    window.scroll(0,0);

    // Call all Lists
    const fetchLists = async () => {
      try {
        // fetch()를 사용하여 서버로부터 데이터 요청
        const response = await fetch(`http://localhost:8080/users/list`);
        const response2 = await fetch(`//localhost:8080/survey/list/active`);
        const response3 = await fetch(`//localhost:8080/voc/list/all`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();  // 응답 데이터를 JSON 형태로 파싱
        const data2 = await response2.json();
        const data3 = await response3.json();

        console.log("usersList : " + data);
        console.log("SurveyList: " + data2);
        console.log("VocList: " + data3);

        setUsersList(data);  // 상태 업데이트
        setSurveyList(data2);
        setVocList(data3);
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
                      {surveyList.length}
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
                      {vocList.length}
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
                  <th>설문 등록일</th>
                  <th>설문 시작일</th>
                </tr>
              </thead>
              <tbody>
                {surveyList.map((survey, index) => (
                  <tr>
                    <td>{survey.name}</td>
                    <td>{survey.memberId}</td>
                    <td>{formatDate(survey.regDate)}</td>
                    <td>{formatDate(survey.startDate)}</td>
                  </tr>
                ))}
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
