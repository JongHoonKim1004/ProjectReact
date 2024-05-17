import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearQuestion, setQuestion } from '../../surveySlice';

const SurveyTitle = () => {
  // useNavigate
  const navigation = useNavigate();

  // useParams
  const { surveyId } = useParams();

  // redux
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);
  const { question, currentIndex } = useSelector(state => state.survey);

  // useState
  const [surveyObject, setSurvey] = useState({});

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

  // 설문 호출
  useEffect(() => {
    // 유저 접근 여부 확인
    if(token == null){
      alert("로그인 후 이용 가능합니다");
      window.close();
      if (window.opener && !window.opener.closed) {
        window.opener.location.href = "/login";
      }
    } else if(token && !user) {
      alert("일반회원만 이용 가능합니다");
      window.close();
      if (window.opener && !window.opener.closed) {
        window.opener.location.href = "/";
      }
    }
    
    // 확인 후 설문 메타데이터 호출
    const fetchSurvey = async () => {
      try{
        const response = await fetch(`//localhost:8080/survey/read/${surveyId}`);
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.json();
        console.log(data);
        setSurvey(data);
      } catch(error) {
        console.error("Fetch to Get Survey Failed : ", error);
      }
    };

    fetchSurvey()
  },[]);

  // 설문시작하기를 누르면 설문의 질문 모두 가져오기
  const handleCallSurvey = () => {
    // 중간 참여 확인
    if(question){
      dispatch(clearQuestion());
    }
    fetch(`//localhost:8080/survey/question/call/all/${surveyId}`,{
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "bearer " + token,
      }
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      dispatch(setQuestion(result));

      navigation(`/survey/participate/${surveyId}?currentIndex=0`);
    })
  }

  return (
    <div style={{backgroundColor: "RGB(235, 235, 235)", width: "950px", height: "740px"}}>
      <Row className='justify-content-md-center pt-5 mb-5'>
        <Col md="10">
          <Row>
            <Card
              style={{borderTop: "3px solid #225ce3"}}
              className='p-3 px-5'
            >
              <Card.Body>
                <Row>
                  <Table style={{borderTop: "2px solid black"}} bordered>
                    <tbody>
                      <tr>
                        <th style={{backgroundColor: "RGB(235, 235, 235)", width: "30%", paddingLeft: "20px"}}>조사명</th>
                        <td style={{paddingLeft: "20px"}}>{surveyObject.name}</td>
                      </tr>
                      <tr>
                        <th style={{backgroundColor: "RGB(235, 235, 235)", width: "30%", paddingLeft: "20px"}}>조사기간</th>
                        <td style={{paddingLeft: "20px"}}>{formatDate(surveyObject.endDate) + " 까지"}</td>
                      </tr>
                      <tr>
                        <th style={{backgroundColor: "RGB(235, 235, 235)", width: "30%", paddingLeft: "20px"}}>응답시간</th>
                        <td style={{paddingLeft: "20px"}}>{"약 5분 소요"}</td>
                      </tr>
                      <tr>
                        <th style={{backgroundColor: "RGB(235, 235, 235)", width: "30%", paddingLeft: "20px"}}>적립금</th>
                        <td style={{paddingLeft: "20px"}}><span style={{color: "#225ce3", fontSize: "22px", fontWeight: "600"}}>{surveyObject.point}</span> {" 원 (조사 완료시)"}</td>
                      </tr>
                      <tr>
                        <th style={{backgroundColor: "RGB(235, 235, 235)", width: "30%", paddingLeft: "20px"}}></th>
                        <td style={{paddingLeft: "20px"}}><span style={{color: "#225ce3", fontSize: "22px", fontWeight: "600"}}>{surveyObject.pointAtLeast}</span> {" 원 (대상초과 혹은 대상이 아닌 경우)"}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
                <Row className='justify-content-md-center pt-3 pb-3'>
                  <Col md="4">
                    <Button variant='primary' size='lg' style={{fontSize: "16px"}} onClick={() => handleCallSurvey()}>조사참여하기</Button>
                  </Col>
                </Row>
                <Row className='mt-3 mb-3'>
                  <Col>
                    <Card style={{backgroundColor: "RGB(235, 235, 235)", border: 0, padding: "0 5px"}}>
                      <Card.Body>
                        <Row>
                          <Col md="3" className='px-2'>
                            <Link to="/voc" style={{ textDecoration: "none", color: "#111"}}>
                              <div style={{border: "1px solid #225ce3", borderRadius: "5px"}}>
                                <Col>
                                  <Row>
                                    <img alt="" src="/img/survey/icon_question.png" style={{width: "70px", margin: "0 auto"}}/>
                                  </Row>
                                  <Row>
                                    <p style={{textAlign: "center", fontSize: "14px", fontWeight: "600", margin: 0}}>1:1 문의</p>
                                  </Row>
                                </Col>
                              </div>
                            </Link>
                          </Col>
                          <Col md="3" className='px-2'>
                            <Link to="/myPoint" style={{ textDecoration: "none", color: "#111"}}>
                              <div style={{border: "1px solid #225ce3", borderRadius: "5px"}}>
                                <Row>
                                  <img alt="" src="/img/survey/icon_pig.png" style={{width: "70px", margin: "0 auto"}}/>
                                </Row>
                                <Row>
                                  <p style={{textAlign: "center", fontSize: "14px", fontWeight: "600", margin: 0}}>내 적립금 확인</p>
                                </Row>
                              </div>
                            </Link>
                          </Col>
                          <Col md="6" style={{fontSize: "13px"}}>
                            <Row>
                              <Col>
                                <strong>개인정보보호 우수사이트</strong>
                                <p style={{margin: 0}}>국내 조사회사 중 유일하게 개인정보보호</p>
                                <p style={{margin: 0}}>우수 인증을 받은 안전한 사이트입니다.</p>
                              </Col>
                              <Col md="2" style={{ padding: 0}}>
                                <img alt="" src="/img/survey/icon_mark.png"/>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SurveyTitle;
