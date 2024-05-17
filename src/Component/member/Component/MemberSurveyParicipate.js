import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const MemberSurveyParicipate = () => {
  // navigate
  const navigate = useNavigate();

  // redux
  const {member} = useSelector(state => state.auth);

  // useState
  const [list, setList] = useState([]);

  // 호출
  useEffect(() => {
    const fetchMemberParticipate = async () => {
      try{
        const response = await fetch(`//localhost:8080/member/survey/memberid/${member.memberId}`);
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.json();
        console.log(data);
        setList(data);
      } catch(error){
        console.error("Fetch Error in Member Survey Participate");
      }

    }

    fetchMemberParticipate();
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
        <p>사업자 님의 모든 설문조사에 참여한 인원입니다</p>
      </div>
      <Row className="p-5">
        <Col>
          <Row  className="p-2">
            <Table className='bg-white'>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>참여자</th>
                  <th style={{width: "15%", textAlign: "center"}}>참여일</th>
                  <th style={{width: "15%", textAlign: "center"}}>지급 포인트</th>
                </tr>
              </thead>
              <tbody>
                {list.map((survey, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/member/survey/read/${survey.surveyId}`} style={{textDecoration: "none" }}>
                          {survey.surveyId}
                        </Link>
                      </td>
                      <td>
                        {survey.usersId}
                      </td>
                      <td style={{textAlign: "center"}}>

                        {formatDate(survey.surveyTime)}
                      </td>
                      <td style={{textAlign: "center"}}>
                        {survey.pointGiven}
                      </td>
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

export default MemberSurveyParicipate;