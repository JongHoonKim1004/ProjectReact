import React, { useCallback, useEffect, useState } from 'react';
import { Accordion, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const MemberSurveyQuestion = () => {
  // useNavigate
  const navigate = useNavigate();

  // surveyId 설정
  const {sno} = useParams();

  // state 설정
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: {
        questionId: null,
        questionNumber: 1, // 질문 정렬을 위한 식별자
        surveyId: sno, // 설문조사 식별자
        question: "", // 질문 내용
        questionType: "text", // 잘뮨 유형(input type에 기재될 내용)
        optionsType: "" // 입력에 도움이 될 정보
      },
      options: [
        {
          optionsId: null,
          questionId: null,
          optionsNumber: 1,
          options: "options",
          terminate: false,
        },
      ],
      isSaved: false, // 저장된 상태인지 확인
      isTemporary: true, // 아직 서버로 보내지지 않았다면 true, 서버로 보내진 적이 있다면 false
    }
  ]);
  
  // 비정상 방법으로 페이지 이동 시


  // 질문 내용 변경시 함수
  const handelQuestionChange = (id, value) => {
    setQuestions(questions.map(q => q.id === id ? {...q, question: {...q.question, question: value} } : q));
  }

  // 질문 유형 변경시 함수
  const handleQuestionType = (id, value) => {
    if (confirm("질문 유형을 변경하시겠습니까?\n작성하던 내용이 사라집니다")) {
      setQuestions(questions.map(q =>
        q.id === id ? { ...q, question: { ...q.question, questionType: value },
        options: [{
          optionsId: null,
          questionId: null,
          optionsNumber: 1,
          options: "",
          terminate: false,
        }]
      } : q
      ));
    }
  };
  
  // 응답 유형 변경 함수
  const handleOptionsTypeChange = (id, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? {...q, question: {...q.question, optionsType: value}} : q
    ));
  }

  // 선택지 내용 변경 함수
  const handleOptionsChange = (id, optionsNumber, value) => {
    setQuestions(prevQuestions => prevQuestions.map(q => {
      if (q.id === id) {
        const updatedOptions = q.options.map(option =>
          option.optionsNumber === optionsNumber
            ? { ...option, options: value }
            : option
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    }));
  };
  

  // 새 질문 생성 버튼
  const addQuestion = () => {
    const newId = questions.length ? questions[questions.length - 1].id + 1 : 1;
    setQuestions([...questions,{
      id: newId,
      question: {
        questionId: null,
        questionNumber: newId, // 질문 정렬을 위한 식별자
        surveyId: "surveyId", // 설문조사 식별자
        question: "", // 질문 내용
        questionType: "text", // 잘뮨 유형(input type에 기재될 내용)
        optionsType: "" // 입력에 도움이 될 정보
      },
      options: [
        {
          optionsId: null,
          questionId: null,
          optionsNumber: 1,
          options: "options",
          terminate: false,
        },
      ],
      isSaved: false,
      isTemporary: true, // 아직 서버로 보내지지 않았다면 true, 서버로 보내진 적이 있다면 false
    }]);
  }

  // 새 선택지 생성 버튼
  const addOptions = (id) => {
    setQuestions(prevQuestions => prevQuestions.map(q => {
      if (q.id === id) {
        const newOptionsNumber = q.options.length + 1;
        const newOption = {
          optionsId: null,
          questionId: q.question.questionId || null,
          optionsNumber: newOptionsNumber,
          options: "",
          terminate: false,
        };
        const updatedOptions = [...q.options, newOption];
        return { ...q, options: updatedOptions };
      }
      return q;
    }));
  };
  

  // 질문 저장 버튼
  const handleSave = (id) => {
    saveToServer(id).then(success => {
      if(success) {
        setQuestions(prevQuestions => prevQuestions.map(q => q.id === id ? {...q, isSaved: true, isTemporary: false} : q));
      }
    })
  }

  // 질문 저장 요청 함수
  const saveToServer = async (id) => {
    const questionData = questions.find(q => q.id === id);
    questionData.question.surveyId = sno;
    console.log(questionData);
    if (questionData.isTemporary) {
      try {
        const response = await fetch(`http://localhost:8080/survey/question/create/${sno}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`,
          },
          body: JSON.stringify(questionData)
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          questionData.isSaved = true;
          questionData.isTemporary = false;
          questionData.question.questionId = result.question.questionId;
          questionData.options.forEach((option, index) => {
            option.questionId = result.question.questionId;
            option.optionsId = result.options[index].optionsId;
          })
          console.log(questionData);
          setQuestions(prevQuestions => prevQuestions.map(q => 
            q.id === id ? { ...questionData} : q
          ));
          return true;
        } else {
          console.error('Failed to save question:', response.statusText);
          return false;
        }
      } catch (error) {
        console.error('Error saving question:', error);
        return false;
      }
    } else {
      try{
      const questionId = questionData.question.questionId;
      const response = await fetch(`http://localhost:8080/survey/question/update/question/${questionId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(questionData)
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          questionData.question.questionId = result.question.questionId;
          questionData.options.forEach((option, index) => {
            option.questionId = result.question.questionId;
            option.optionsId = result.options[index].optionsId;
          })

          setQuestions(prevQuestions => prevQuestions.map(q => 
            q.id === id ? { ...questionData} : q
          ));
          return true;
        } else {
          console.error('Failed to save question:', response.statusText);
          return false;
        }
      } catch (error) {
        console.error('Error saving question:', error);
        return false;
      }
    }
  };

  // 다중 선택지(radio, checkbox) 의 조기종료 여부
  const handleOptionsTerminate = useCallback((id, optionsNumber) => {
    setQuestions(prevQuestions => prevQuestions.map(q => {
      if (q.id === id) {
        const updatedOptions = q.options.map(option =>
          option.optionsNumber === optionsNumber
            ? { ...option, terminate: !option.terminate }
            : option
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    }));
  }, []);

  // 질문 수정 버튼
  const handleModify = (id) => {
    setQuestions(prevQuestions => prevQuestions.map(q => q.id === id ? {...q, isSaved: false} : q));
  }

  // 질문 삭제 버튼
  const handleDelete = (id) => {
    // 질문이 1개일 경우 삭제를 막음
    if(questions.length == 1){
      alert("더 이상 삭제할 수 없습니다");
      return false;
    }

    // 질문이 2개일 경우에는 서버에 전송한 적이 있는지 여부로 경로가 바뀜
    const questionData = questions.find(q => q.id === id);
    if(questionData.isTemporary){
      // 서버로 보내진 적 없는 질문은 의사 확인 후 바로 삭제
      if(confirm("정말로 삭제하시겠습니까?")){
        setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
      }
    } else{
      // 서버에 저장된 질문은 서버에서 제거를 먼저 하고 삭제
      if(confirm("정말로 삭제하시겠습니까?")){
        fetch(`http://localhost:8080/survey/question/delete/question/${questionData.question.questionId}`,{
          method: "post",
          headers: {
            "Content-Type" : "application/json"
          },
        }).then(response => {
          return response.text();
        }).then(result => {
          console.log(result);
          setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
        })

        
      }
    }
  }

  // 설문조사 작성하기 버튼
  const handleAllCheck = () => {
    const searchUnsaved = questions.some(q => {
      if(!q.isSaved || q.isTemporary){
        alert("아직 저장되지 않은 질문이 있습니다.\n저장되지 않은 질문번호 : " + q.id);
        return true;
      }
      return false;
    });

    if(!searchUnsaved){
      alert("모든 질문이 저장되어있습니다.");
      navigate('/member/survey/list');
    }
  }

  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>새 설문조사 질문 생성</h1>
        <p>신중하게 작성해주세요. 작성 후에 내용 변경이 불가할 수 있습니다.</p>
      </div>
      <Row className="p-5 justify-content-md-center">
        <Col md="8">
          <Row className="p-5 bg-white">
            <Col>
              <Row className='justify-content-end pb-5'>
                <Col sm="2">
                  <Button variant='primary' onClick={addQuestion}>새 질문 생성</Button>
                </Col>
              </Row>
              <Row className='mb-5'>
                <Accordion defaultActiveKey="0">
                  {questions.map((question, index) => (
                    <Accordion.Item eventKey={index}>
                    <Accordion.Header>
                      <Col>
                        <Row>
                          <Col><p style={{marginBottom: 0, lineHeight: "35px"}}>{"질문 " + question.id}</p></Col>
                          <Col>
                            <p style={{textAlign: "right", marginBottom: 0, lineHeight: "35px", paddingRight: "20px"}}>
                              {question.isSaved ? "저장되었습니다" : ""}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col>
                          <Form onSubmit={(id) => handleSubmit(id)} className='pt-3 pb-3'>
                            <Form.Group as={Row} className='mb-3'>
                              <Form.Label column sm="2">질문 내용</Form.Label>
                              <Col sm="10">
                                <Form.Control
                                name="question"
                                placeholder='질문 내용을 입력하세요'
                                value={question.question.question}
                                onChange={(e) => {handelQuestionChange(question.id, e.target.value)}}
                                disabled={question.isSaved}
                              />
                              </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mb-3'>
                              <Form.Label column sm="2">응답 유형</Form.Label>
                              <Col sm="10">
                                <Form.Control
                                  type="text"
                                  placeholder='1개 선택, 출생연도 입력 등'
                                  value={question.question.optionsType}
                                  onChange={(e) => handleOptionsTypeChange(question.id, e.target.value)}
                                  disabled={question.isSaved}
                                />
                              </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mb-3'>
                              <Form.Label column sm="2">질문 유형</Form.Label>
                              <Col sm="10">
                                <Row>
                                  <Col sm="3">
                                    <Form.Check type='radio' name="questionType" value="text" label={"텍스트 입력"} onChange={(e) => handleQuestionType(question.id, e.target.value)} checked={question.question.questionType === "text"} />
                                  </Col>
                                  <Col sm="3">
                                    <Form.Check type='radio' name="questionType" value="number" label={"숫자 입력"} onChange={(e) => handleQuestionType(question.id, e.target.value)} checked={question.question.questionType === "number"}/>
                                  </Col>
                                  <Col sm="3">
                                    <Form.Check type='radio' name="questionType" value="radio" label={"단일 선택"} onChange={(e) => handleQuestionType(question.id, e.target.value)} checked={question.question.questionType === "radio"}/>
                                  </Col>
                                  <Col sm="3">
                                    <Form.Check type='radio' name="questionType" value="checkbox" label={"다중 선택"} onChange={(e) => handleQuestionType(question.id, e.target.value)}  checked={question.question.questionType === "checkbox"}/>
                                  </Col>
                                </Row>
                              </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mb-3 pb-5'>
                              <Form.Label column sm="2">선택지</Form.Label>
                              <Col sm="10">
                              {question.question.questionType === "text" && (
                                <Form.Control 
                                  type="text"
                                  value={question.options.options}
                                  onChange={(e) => handleOptionsChange(question.id, question.options.optionsNumber, e.target.value)}
                                  disabled={question.isSaved}
                                  readOnly
                                  placeholder='주관식 입력은 아무것도 입력하지 않으셔도 됩니다'
                                />
                              )}
                              {question.question.questionType === "number" &&(
                                <Form.Control
                                  type="number"
                                  value={question.options.options}
                                  onChange={(e) => handleOptionsChange(question.id, question.options.optionsNumber, e.target.value)}
                                  disabled={question.isSaved}
                                  readOnly
                                  placeholder='주관식 입력은 아무것도 입력하지 않으셔도 됩니다'
                                />
                              )}
                              {question.question.questionType === "radio" && (
                                <>
                                  {Array.isArray(question.options) && question.options.map((option, i) => (
                                    <div className='mb-4'>
                                      <InputGroup key={i}>
                                        <InputGroup.Text id={"radio" + index + "-" + i}>{i + 1}</InputGroup.Text>
                                        <Form.Control
                                          type="text"
                                          value={option.options}
                                          onChange={(e) => handleOptionsChange(question.id, option.optionsNumber, e.target.value)}
                                          disabled={question.isSaved}
                                        />
                                        <InputGroup.Checkbox
                                          name="terminate"
                                          checked={option.terminate == true}
                                          onChange={() => handleOptionsTerminate(question.id, option.optionsNumber)}
                                        />
                                      </InputGroup>
                                      <Form.Text id={"radio" + i} >조기 종료할 질문은 오른쪽 체크박스를 체크해 주세요</Form.Text>
                                    </div>
                                  ))}
                                  <Row>
                                    <Col><Button variant='primary' onClick={() => addOptions(question.id)} disabled={!question.isTemporary}>선택지 추가하기</Button></Col>
                                  </Row>
                                </>
                              )}
                              {question.question.questionType === "checkbox" && (
                                <>
                                  {Array.isArray(question.options) && question.options.map((option, i) => (
                                    <>
                                      <InputGroup key={i} className='mb-2'>
                                        <InputGroup.Text id={"checkbox" + index + "-" + i}>{i + 1}</InputGroup.Text>
                                        <Form.Control
                                          type="text"
                                          value={option.options}
                                          onChange={(e) => handleOptionsChange(question.id, option.optionsNumber, e.target.value)}
                                          disabled={question.isSaved}
                                        />
                                        <InputGroup.Checkbox
                                          name="terminate"
                                          checked={option.terminate == true}
                                          onChange={() => handleOptionsTerminate(question.id, option.optionsNumber)}
                                        />
                                      </InputGroup>
                                      <Form.Text id={"checkbox" + i} >조기 종료할 질문은 오른쪽 체크박스를 체크해 주세요</Form.Text>
                                    </>
                                  ))}
                                  <Row>
                                    <Col>
                                      <Button variant='primary' onClick={() => addOptions(question.id)} disabled={!question.isTemporary}>선택지 추가하기</Button>
                                    </Col>
                                  </Row>
                                </>
                              )}
                              </Col>
                            </Form.Group>
                            
                            <Form.Group as={Row} className='mb-5 pt-5 pt-5'>
                              <Col></Col>
                              <Col>
                                <Button
                                  type="button"
                                  variant='primary'
                                  style={{float: "right"}}
                                  onClick={() => handleSave(question.id)}
                                  disabled={question.isSaved}
                                >저장하기</Button>
                              </Col>
                              <Col>
                                <Button
                                variant='warning'
                                type="button"
                                onClick={() => handleModify(question.id)}
                                disabled={!question.isSaved}
                              >수정하기</Button>
                              </Col>
                              <Col></Col>
                            </Form.Group>
                            <Form.Group as={Row} className='pt-3 mb-3'>
                              <Col sm="5"></Col>
                              <Col sm="2" className='d-grid'>
                                <Button
                                variant='danger'
                                onClick={() => handleDelete(question.id)}
                                >삭제하기</Button>
                              </Col>
                              <Col sm="5"></Col>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                  ))}
                </Accordion>
              </Row>
              <Row className='pt-5'>
                <Col sm="9">
                  <p>질문을 모두 저장한 후에 '설문조사 저장하기' 버튼을 눌러주세요</p>
                </Col>
                
              </Row>
              <Row>
                <Col sm="3">
                  <Button
                    variant='primary'
                    onClick={() => handleAllCheck()}
                  >설문조사 저장하기</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default MemberSurveyQuestion;