import React, { useState } from 'react';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PasswordFind = () => {
  // useNavigate
  const navigate = useNavigate();

  // useState
  const [name, setName] = useState("");
  const [code, setCode] = useState(null);
  const [inputCode, setInputCode] = useState(null);

  const [sendCode, setSendCode] = useState(false);
  const [codeChecked, setCodeChecked] = useState(false);

  // 인증번호 전송
  const findPw = () => {
    if(name == ""){
      alert("아이디를 입력해주세요");
    }

    const fetchCodeSend = async () => {
      try{
        const response = await fetch(`//localhost:8080/email/send/passwordFind?to=${name}`)
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.text();
        console.log(data);
        setCode(data);
        setSendCode(true);
        alert("이메일이 전송되었습니다.\n인증번호를 확인 후 입력해주세요")
      } catch(error){
        console.error("Fetch Error in Password Find");
      }
    }

    fetchCodeSend();
  }

  // 인증번호 확인
  const codecheck = () => {
    if(!inputCode || inputCode == ""){
      alert("인증번호를 입력해주세요");
      return;
    }
    if(inputCode.length < 6){
      alert("인증번호 6자리를 정확히 입력해주세요");
      return;
    }

    if(inputCode == code){
      alert("인증번호가 일치합니다.\n'비밀번호 재설정' 버튼을 눌러서 다음 단계로 이동해주세요");
      setCodeChecked(true);
    } else {
      alert("인증번호가 일치하지 않습니다\n다시 한 번 확인해주세요");
    }
  }
  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>비밀번호 찾기</h1>
              <p style={{ fontSize: "12px", fontWeight: "100" }}>
                
              </p>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 비밀번호 찾기
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Row className='pt-5 pb-5 justify-content-md-center'>
              <Col md="10">
                <p>아이디를 입력 후 '인증번호 전송' 버튼을 누르시면 인증번호가 담긴 이메일이 전송됩니다</p>
              </Col>
            </Row>
            <Form>
              <Row className='pb-4 justify-content-md-center'>
                <Col md="6">
                  <Form.Group as={Row} className="mb-5">
                    <Form.Label column sm="3">이름</Form.Label>
                    <Col sm="9">
                      <Form.Control value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' readOnly={sendCode}/>
                    </Col>
                  </Form.Group>
                  <Form.Group>
                    <Col className='d-grid'>
                      <Button type="button" variant='primary' style={{float: "right"}} onClick={findPw} disabled={codeChecked}>인증번호 전송</Button>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              {sendCode ? 
              <Row className='pb-4 justify-content-md-center'>
              <Col md="6">
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label column sm="3">인증번호</Form.Label>
                  <Col sm="9">
                    <Form.Control value={inputCode} onChange={(e) => setInputCode(e.target.value)} readOnly={codeChecked}/>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                  <Col className='d-grid'>
                    {codeChecked ? 
                    <Button type='button' variant='success' onClick={() => navigate(`/pwChange?name=${name}&code=${code}`)}>비밀번호 재설정</Button> :
                    <Button type="button" variant='primary' onClick={codecheck}>인증번호 확인</Button> 
                    }
                  </Col>
                </Form.Group>
              </Col>
            </Row> : null}
            </Form>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default PasswordFind;