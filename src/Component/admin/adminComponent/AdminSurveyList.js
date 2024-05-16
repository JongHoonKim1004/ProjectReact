import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AdminSurveyList = () => {
  // useNavigate
  const navigation = useNavigate();

  // useState
  const [surveyList, setSurveyList] = useState([]);

  // 설문조사 목록 호출
  useEffect(() => {
    const fetchSurveyList = async () => {
      try{
        const response = await fetch("//localhost:8080/survey/list");
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.json();
        console.log(data);
        setSurveyList(data);
      } catch(error) {
        console.error("Fetch Error in Admin Survey List");
      }
    }

    fetchSurveyList();
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
      <Row className='p-5'>
        <Col>
          <Row className='p-2'>
            <Table className='bg-white'>
              <thead>
                <tr>
                  <th>설문조사 제목</th>
                  <th>등록한 사업자</th>
                  <th>등록일</th>
                  <th>시작일</th>
                  <th>종료일</th>
                  <th>참여인원</th>
                </tr>
              </thead>
              <tbody>
                {surveyList.map((survey, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/admin/survey/read/` + survey.surveyId} style={{textDecoration: "none", color: "#111"}}>
                        {survey.name}
                      </Link>
                    </td>
                    <td>
                      <Link to={"/admin/member/read/" + survey.memberId} style={{textDecoration: "none", color: "#111"}}>
                        {survey.memberId}
                      </Link>
                    </td>
                    <td>{formatDate(survey.regDate)}</td>
                    <td>{formatDate(survey.startDate)}</td>
                    <td>{formatDate(survey.endDate)}</td>
                    <td>{survey.surveyParticipate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Row>
            <Col md="10"></Col>
            <Col md="2"className='justify-content-end pt-3 pb-3' style={{display: "flex"}}>
              <Link to={'/admin'}>
                <Button variant='primary'>메인 페이지로</Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default AdminSurveyList;