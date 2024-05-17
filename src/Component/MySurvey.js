import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MySurvey = () => {
  // navigate
  const navigate = useNavigate();

  // redux
  const {user, token} = useSelector(state => state.auth);

  // useState
  const [surveyList, setSurveyList] = useState([]);

  // 유저 확인 및 조사 관리 호출
  useEffect(() => {
    // 유저 확인
    if(!token){
      alert("로그인 후 이용 가능합니다");
      navigate('/login');
      return;
    } else if(token && !user){
      alert("일반회원만 이용 가능합니다.");
      navigate('/');
      return;
    }

    // 서버 요청
    const fetchMySurvey = async () => {
      try{
        const response = await fetch(`//localhost:8080/users/survey/${user.usersId}`);
        if(!response.ok){
          console.error("Network is not good");
        }
        
        const data = await response.json();
        console.log(data);
        setSurveyList(data);
      } catch(error){
        console.error("Fetch Failed in MySurvey");
      }
    }

    fetchMySurvey();
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
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>조사관리</h1>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 마이페이지 {`>`} 조사 관리
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
              참여하신 조사
            </p>
            <p style={{ fontSize: "12px", lineHeight: "12px" }}>
              내가 참여한 조사 목록입니다. 참여 조사에 관한 결과까지 한눈에 알아보자!
            </p>
            <div className='container' style={{backgroundColor: "white"}}>
              <Row className="justify-content-md-center pt-4">
                <Col md="12" className='m-2'>
                  <Table borderless>
                    <thead >
                      <tr>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>#</th>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>조사명</th>
                        <th style={{backgroundColor: "RGB(3, 131, 206)", color: "white"}}>응답 날짜</th>
                      </tr>
                    </thead>
                    <tbody>
                      {surveyList.map((survey, index) => (
                        <tr style={{borderTop: "1px solid #d8d8d8"}} key={index}>
                          <td>{survey.logId}</td>
                          <td>{survey.surveyId}</td>
                          <td>{formatDate(survey.surveyDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />  
      </Container>      
    </div>
  );
};

export default MySurvey;