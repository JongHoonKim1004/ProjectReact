import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AdminSurveyRead = () => {
  // useNavigate
  const navigation = useNavigate();

  // useParams
  const {surveyId} = useParams();

  // useState
  const [survey, setSurvey] = useState({});

  // redux
  const { token } = useSelector(state => state.auth);

  // 설문조사 메타데이터 호출
  useEffect(() => {
    const fetchAdminSurveyRead = async () => {
      try{
        const response = await fetch(`//localhost:8080/survey/read/${surveyId}`);
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.json();
        console.log(data);
        setSurvey(data);
      } catch(error){
        console.error("Fetch Failed in Admin Survey Read");
      }
    }

    fetchAdminSurveyRead();
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

  // 삭제 요청
  const handleDeleteSurvey = () => {
    let confirm = confirm("정말 삭제하시겠습니까?");
    if(confirm){
      fetch(`//localhost:8080/survey/delete/${surveyId}`,{
        method: "post",
        headers: {
          "Authorization": "Bearer " + token,
        },

      }).then(response => response.text())
      .then(result => {
        if(result == "Survey deleted"){
          console.log("Survey deleted");
          navigation('/admin/survey/list');
        }
      })
    }
  }
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>설문조사 상세보기</h1>
      </div>
      <Row className='p-5 justify-content-md-center'>
        <Col md="8">
          <Row className='p-2 bg-white'>
            <Table bordered>
              <tbody>
                <tr>
                  <th style={{width: "20%", textAlign: "center"}}>식별번호</th>
                  <td style={{paddingLeft: "20px"}}>{survey.surveyId}</td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>설문조사 제목</th>
                  <td style={{paddingLeft: "20px"}}>{survey.name}</td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>등록한 사업자</th>
                  <td style={{paddingLeft: "20px"}}>
                    <Link to={"/admin/member/read" + survey.memberId}>
                      {survey.memberId}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>설문조사 설명</th>
                  <td style={{paddingLeft: "20px"}}>
                    <div dangerouslySetInnerHTML={{__html: survey.description}}/>
                  </td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>설문조사 등록일</th>
                  <td style={{paddingLeft: "20px"}}>{formatDate(survey.regDate)}</td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>설문조사 시작일</th>
                  <td style={{paddingLeft: "20px"}}>{formatDate(survey.startDate)}</td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>설문조사 종료일</th>
                  <td style={{paddingLeft: "20px"}}>{formatDate(survey.endDate)}</td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>최대 지급 포인트</th>
                  <td style={{paddingLeft: "20px"}}>{survey.point + " 포인트"}</td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>최소 지급 포인트</th>
                  <td style={{paddingLeft: "20px"}}>{survey.pointAtLeast + " 포인트"}</td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>참여 인원</th>
                  <td style={{paddingLeft: "20px"}}>{survey.surveyParticipate + " 명"}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row className='pt-5'>
            <Col md="9"></Col>
            <Col md="3">
              <Link to={'/admin/survey/list'}>
                <Button className='mx-3'>목록으로</Button>
              </Link>
              <Button variant='danger' onClick={handleDeleteSurvey}>삭제하기</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default AdminSurveyRead;