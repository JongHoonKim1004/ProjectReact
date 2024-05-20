import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const MemberSurveyRead = () => {
  // useParams
  const { surveyId } = useParams();

  // useState
  const [survey, setSurvey] = useState({});
  const [questionList, setQuestionList] = useState([]);
  // 초기 호출
  useEffect(() => {
    const fetchSurvey = async () => {
      try{
        const response = await fetch(`//localhost:8080/survey/read/${surveyId}`);
        const response2 = await fetch(`//localhost:8080/survey/question/call/all/${surveyId}`);
        if(!response.ok){
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const data2 = await response2.json();
        
        console.log(data);
        console.log(data2);

        setSurvey(data);
        setQuestionList(data2);
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
                  <tr>
                    <th style={{textAlign: "center"}}>설문 참여 인원</th>
                    <td>{survey.surveyParticipate}</td>
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
            <Row className='pt-5'>
              <Col>
                <p>질문 내역입니다. 응답중에 텍스트나 숫자 입력 유형은 'options' 로 선택지가 기록됩니다</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Accordion>
                  {Array.isArray(questionList) ?
                    questionList.map((question, index) => (
                      <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>{question.question.question}</Accordion.Header>
                        <Accordion.Body>
                          <p>질문 유형 : {question.question.questionType}</p>
                          <p>응답 유형 : {question.question.optionsType}</p>
                          <Table>
                            <tbody>
                              <tr>
                                <th>번호</th>
                                <td style={{textAlign: "center"}}>내용</td>
                              </tr>
                              {Array.isArray(question.options) ? 
                                question.options.map((option, i) => (
                                  <tr key={i}>
                                    <th>{option.optionsNumber}</th>
                                    <td>
                                      {option.options}&nbsp;&nbsp;<span>{option.terminate ? "(조기종료)": null}</span>
                                    </td>
                                  </tr>
                                ))  
                              : null}
                            </tbody>
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))
                  : null}
                </Accordion>
              </Col>
            </Row>
            <Row className='pt-4'>
              <Col>
                <p>질문 수정은 관리자에게 직접 문의해주세요</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </main>
  );
};

export default MemberSurveyRead;