import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { incrementIndex } from '../../surveySlice';

// 쿼리스트링 추출
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

// 본 함수
const SurveyParicipate = () => {
  // query 설정
  const query = useQuery();
  const indexCurrent = query.get('currentIndex');
  const sqNo = parseInt(indexCurrent) + 1 ; 

  // useNavigate 
  const navigation = useNavigate();

  // useParams
  const { surveyId } = useParams();


  // redux
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);
  const { question, currentIndex } = useSelector(state => state.survey);

  // useState
  const [answer, setAnswer] = useState([]);

  // 질문 유형에 따른 answer 설정
  useEffect(() => {
    // Initial answer setup based on question type
    if (question[currentIndex].question.questionType === 'text' || question[currentIndex].question.questionType === 'number') {
      setAnswer('');
    } else {
      setAnswer([]);
    }
  }, [currentIndex, question]);

  // input type 에 따른 응답 입력 변경
  const handleAnswerChange = (event) => {
    const { value, checked } = event.target;

    if (question[currentIndex].question.questionType === 'checkbox') {
      if (checked) {
        setAnswer(prevAnswer => [...prevAnswer, value]);
      } else {
        setAnswer(prevAnswer => prevAnswer.filter(item => item !== value));
      }
    } else {
      setAnswer([value]); // 모든 선택지를 배열로 관리
    }
  };
  
  // switch 문으로 input type 에 따른 렌더링 변경
  const renderOptions = (question) => {
    switch(question.question.questionType){
      case 'text':
        return (
          <Form>
            <Form.Group as={Row} className='pb-4 pt-4 justify-content-md-center'>
              <Col>
                <Form.Control name="text" id={question.options[0].optionsId} type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='pb-4 justify-content-md-center'>
              <Col md="4" className='d-grid'>
                <Button variant='primary' onClick={handleNextQuestion}>제출하기</Button>
              </Col>
            </Form.Group>
          </Form>
        );
      case 'number':
        return (
          <Form>
            <Form.Group as={Row} className='pb-4 pt-4 justify-content-md-center'>
              <Col>
                <Form.Control name="number" id={question.options[0].optionsId} type="number" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='pb-4 justify-content-md-center'>
              <Col md="4" className='d-grid'>
                <Button variant='primary' onClick={handleNextQuestion}>제출하기</Button>
              </Col>
            </Form.Group>
          </Form>
        );
      case 'radio':
        return (
          <Form>
            <Form.Group as={Row} className='pb-4 pt-4 justify-content-md-center'>
              {question.options.map((option, index) => (
                <Col key={index}>
                  <Form.Check label={option.options} name={"radio" + option.questionId} type="radio" value={option.optionsId} checked={answer.includes(option.optionsId)} onChange={handleAnswerChange}/>
                </Col>
              ))}
            </Form.Group>
            <Form.Group as={Row} className='pb-4 justify-content-md-center'>
              <Col md="4" className='d-grid'>
                <Button variant='primary' onClick={handleNextQuestion}>제출하기</Button>
              </Col>
            </Form.Group>
          </Form>
        );
      case 'checkbox':
        return (
          <Form>
            <Form.Group as={Row} className='pb-4 pt-4 justify-content-md-center'>
              {question.options.map((option, index) => (
                <Col key={index}>
                  <Form.Check label={option.options} name={"checkbox_" + option.questionId} type="checkbox" value={option.optionsId} checked={answer.includes(option.optionsId)} onChange={handleAnswerChange}/>
                </Col>
              ))}
            </Form.Group>
            <Form.Group as={Row} className='pb-4 justify-content-md-center'>
              <Col md="4" className='d-grid'>
                <Button variant='primary' onClick={handleNextQuestion}>제출하기</Button>
              </Col>
            </Form.Group>
          </Form>
        );
    }
  }

  

  // 제출하기 버튼
  const handleNextQuestion = async (e) => {
    e.preventDefault();
    
    // 입력 확인
    if(answer == null || answer == ""){
      alert("질문에 답변해주세요.");
      return false;
    }

    // responseDTO 폼 만들기
    const responseDTO = {
      questionId: question[currentIndex].question.questionId,
      optionsId: question[currentIndex].question.questionType === 'text' ? [question[currentIndex].options[0].optionsId] : question[currentIndex].question.questionType === 'number' ? [question[currentIndex].options[0].optionsId] : answer, // 선택지를 배열로 전송
      usersId: user ? user.usersId : null, // 실제 사용자 ID로 대체
      responseText: question[currentIndex].question.questionType === 'text' ? answer[0] : question[currentIndex].question.questionType === 'nunber' ? answer[0] : null,
    };

    console.log(JSON.stringify(responseDTO));
    // 입력 확인되면 제출
    try {
      const fetchResponse = await fetch(`//localhost:8080/survey/response/create/${surveyId}`,{
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "bearer " + token,
        },
        body: JSON.stringify([responseDTO]),
      });

      const result = await fetchResponse.json();

      console.log(result);

      if (result && typeof result.isTerminated !== 'undefined') {
        if (result.isTerminated) {
          alert("설문이 종료되었습니다.");
        } else {
          setAnswer([]);
          if (currentIndex < question.length - 1) {
            dispatch(incrementIndex());
          } else {
            alert("설문이 종료되었습니다.");
          }
        }
      } else {
        console.error('응답 객체에 isTerminated 속성이 없습니다.');
        alert('서버 응답에 오류가 있습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('답변 제출 중 오류:', error);
      alert("답변 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }

  const printDTO = () => {
    const responseDTO = {
      questionId: question[currentIndex].question.questionId,
      optionsId: question[currentIndex].question.questionType === 'text' ? [question[currentIndex].options[0].optionsId] : question[currentIndex].question.questionType === 'number' ? [question[currentIndex].options[0].optionsId] : answer, // 선택지를 배열로 전송
      usersId: user ? user.usersId : null, // 실제 사용자 ID로 대체
      responseText: question[currentIndex].question.questionType === 'text' ? document.getElementsByName("text").value : question[currentIndex].question.questionType === 'nunber' ? document.getElementsByName("number").value : null,
    };

    console.log(JSON.stringify(responseDTO));
  }
  return (
    <div style={{backgroundColor: "RGB(235, 235, 235)", width: "950px", height: "740px"}}>
      <Row className='justify-content-md-center pt-5 mb-5'>
        <Col md="10">
          <Row>
            {question && question.length > 0 && question[currentIndex] ? (
              <Card className='px-0'>
              <Card.Header style={{borderTop: "3px solid #225ce3"}} className='p-0'>
                <Row className='mb-3 pt-3 px-3'>
                  <img alt="logo" src="/img/header/logo.png" style={{width: "170px"}}/>
                </Row>
                <Row className='px-3 '>
                  <Col>
                    <span style={{fontWeight: "550", float: "left"}}>{"SQ" + sqNo}. {question[currentIndex].question.question}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span
                      style={{float: "right", fontSize: "12px", textAlign: "right", lineHeight: "30px", backgroundColor: "#225ce3", color: "white", borderRadius: "5px 5px 0 0"}}
                      className='px-3'
                    >
                      {question[currentIndex].question.optionsType}
                    </span>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Container>
                  {renderOptions(question[currentIndex])}
                </Container>
              </Card.Body>
            </Card>
            ) : null}
          </Row>
          <Row>
            <Col>
              <Button onClick={printDTO}>test</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SurveyParicipate;