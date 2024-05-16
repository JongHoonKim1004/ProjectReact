import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Dahboard = () => {
  // useNavigate
  const navigation = useNavigate();

  // redux
  const dispatch = useDispatch();
  const { member, memberPoint } = useSelector(state => state.auth);

  // useState
  const [surveyList, setSurveyList] = useState([]);
  

  // all list fetch
  useEffect(() => {
    // 화면 렌더링 시 위로 스크롤
    window.scroll(0,0);

    const fetchMemberDashboard = async () => {
      try{
        const response = await fetch(`//localhost:8080/survey/list/member/${member.memberId}`);
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.json();
        console.log(data);
        setSurveyList(data);
      } catch(error){
        console.error("Fetch Failed in Member Dashboard");
      }

    }

    fetchMemberDashboard();
  },[]);

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

    

  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>Dashboard</h1>
      </div>
      <Row className="p-5">
        <Col md="4">
          <Card>
            <Card.Body>
              <Row>
                <Col md="3">
                  <i className='fa fa-files-o fa-5x'></i>
                </Col>
                <Col>
                  <p align="right">만든 설문조사 수</p>
                  <p align="right">{surveyList.length}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Body>
              <Row>
                <Col md="3">
                  <i className='fa fa-users fa-5x'></i>
                </Col>
                <Col>
                  <p align="right">총 설문 참여인원 수</p>
                  <p align="right">1</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Body>
              <Row>
                <Col md="3">
                  <i className='fa fa-money fa-5x'></i>
                </Col>
                <Col>
                  <p align="right">포인트 잔액</p>
                  {memberPoint ? (
                    <p align="right">{memberPoint.pointBalance}</p>
                  ) : null}
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
                  <th>설문 등록일</th>
                  <th>설문 시작일</th>
                  <th>설문 참여인원</th>
                </tr>
              </thead>
              <tbody>
                {surveyList.map((survey, index) => (
                  <tr>
                    <td>{survey.name}</td>
                    <td>{formatDate(survey.regDate)}</td>
                    <td>{formatDate(survey.startDate)}</td>
                    <td>{survey.surveyParticipate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Row>
            <Link to={'/member/survey/list'}>
              <Button variant="primary">전체 목록 보기</Button>
            </Link>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default Dahboard;