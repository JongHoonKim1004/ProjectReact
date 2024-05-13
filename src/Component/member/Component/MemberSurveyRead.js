import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const MemberSurveyRead = () => {
  // useParams
  const { surveyId } = useParams();

  // useState
  const [survey, setSurvey] = useState({});

  // 초기 호출
  useEffect(() => {
    const fetchSurvey = async () => {
      try{
        const response = await fetch(`//localhost:8080/survey/read/${surveyId}`);
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setSurvey(data);
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
          <h1>설문조사 상세보기</h1>
        </div>
        <Row className='p-5 justify-content-md-center'>
          <Col md="8">
            <Row className='p-2 bg-white'>
              <Table>
                <tbody>
                  <tr>
                    <th style={{width: "20%", textAlign: "center"}}>식별번호</th>
                    <td>{survey.surveyId}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>설문조사 이름</th>
                    <td>{survey.name}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>설명</th>
                    <td>
                      <div dangerouslySetInnerHTML={{__html: survey.description}}/>
                    </td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>설문 등록일</th>
                    <td>{formatDate(survey.regDate)}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>설문 시작일</th>
                    <td>{formatDate(survey.startDate)}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>설문 종료일</th>
                    <td>{formatDate(survey.endDate)}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>최소 지급 포인트</th>
                    <td>{survey.pointAtLeast}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>최대 지급 포인트</th>
                    <td>{survey.point}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row className='pt-5 mt-5'>
              <Col>
                <h3>이 설문조사를 참여한 사람들</h3>
              </Col>
            </Row>
            <Row className='p-2 bg-white'>
              <Table>
                <thead>
                  <tr>
                    <th>식별번호</th>
                    <th>참가자</th>
                    <th>참가일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row className='pt-5'>
              <Col md="7"></Col>
              <Col md="5">
                <Link to={'/member/survey/list'}>
                  <Button className='mx-5' style={{float: "right"}}>목록으로</Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </main>
  );
};

export default MemberSurveyRead;