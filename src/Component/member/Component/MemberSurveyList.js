import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MemberSurveyList = () => {
  // state 설정
  const [surveyList, setSurveyList] = useState([]);

  // 초기 호출
  useEffect(() => {
    const fetchSurvey = async () => {
      try{
        const response = await fetch("//localhost:8080/survey/list");
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setSurveyList(data);
      }catch(error){
        console.error('Fetching survey failed:', error);
      }
    }

    fetchSurvey();
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
        <h1>설문조사 목록</h1>
      </div>
      <Row className="p-5">
        <Col>
          <Row  className="p-2">
            <Table className='bg-white'>
              <thead>
                <tr>
                  <th>제목</th>
                  <th style={{width: "20%"}}>등록일</th>
                  <th style={{width: "15%", textAlign: "center"}}>최소 지급 포인트</th>
                  <th style={{width: "15%", textAlign: "center"}}>최대 지급 포인트</th>
                </tr>
              </thead>
              <tbody>
                {surveyList.map((survey, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/member/survey/read/${survey.surveyId}`} style={{textDecoration: "none" }}>
                        {survey.name}
                      </Link>
                    </td>
                    <td>
                      {formatDate(survey.regDate)}
                    </td>
                    <td style={{textAlign: "center"}}>{survey.pointAtLeast}</td>
                    <td style={{textAlign: "center"}}>{survey.point}</td>
                  </tr>
                ))}
                  
              </tbody>
            </Table>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default MemberSurveyList;