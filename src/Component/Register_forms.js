import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';

const Register_forms = () => {
  // 유저 정보 상태 설정
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [zipNo, setZipNo] = useState();
  const [addr, setAddr] = useState();
  const [addrDetail, setAddrDetail] = useState();
  const [birth, setBirth] = useState();


  const handleUsername = (e) => {
    setUsername(e.target.value);
  }
  const handleName = (e) => {
    setName(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  }
  const handleZipNo = (e) => {
    setZipNo(e.target.value);
  }
  const handleAddr = (e) => {
    setAddr(e.target.value);
  }
  const handleAddrDetail = (e) => {
    setAddrDetail(e.target.value);
  }
  const handleBirth = (e) => {
    setBirth(e.target.value);
  }

  // 아이디 중복확인
  const idCheck = (e) => {
    setUsername(e.target.value);
    if(username !== ""){
      window.open(`./idCheck?username=${username}`, "_blank", "width=500, height=400, left=100, top=100")
    } else {
      e.preventDefault();
      alert("아이디를 입력해주세요");
    }
    
  }

  // 다음 주소 API 호출
  const findZipNo = (e) => {
    setZipNo(document.getElementById("zipNo").value);
    
  }

  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>패널가입</h1>
              <p style={{ fontSize: "12px", fontWeight: "100" }}>
                회원가입을 위해 아래 이용약관과 개인정보 수집 및 이용에 대한
                안내를 읽고 동의해 주세요.
              </p>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 회원가입
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Form>
              <Form.Group className='mb-3'>
                아래의 정보를 정확하게 입력해주세요.
              </Form.Group>
              <Form.Group className='mb-2 pb-3' style={{borderBottom: "1px solid #d8d8d8", textAlign: "right"}}>
                * 표시는 필수 입력 사항입니다.
              </Form.Group>
              <Form.Group as={Row} className='mt-3 mb-3'>
                <Form.Label column sm="2">아이디 {`(`}이메일{`)`}</Form.Label>
                <Col sm="10">
                  <Form.Control type='email' name="username" id="username" placeholder='example@example.com' value={username} onChange={handleUsername}/>
                </Col>
              </Form.Group>
              <Form.Group className='mb-5' as={Row}>
                <Col sm="2"></Col>
                <Col sm="10">
                  <Button variant='primary' onClick={idCheck}>중복 확인</Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3 mt-1'>
                <Form.Label column sm="2">이름</Form.Label>
                <Col sm="10">
                  <Form.Control name="name" id="name" value={name} onChange={handleName}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="2">비밀번호</Form.Label>
                <Col sm='10'>
                  <Form.Control name="password" type="password" id="password" value={password} onChange={handlePassword}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">비밀번호 확인</Form.Label>
                <Col sm="10">
                  <Form.Control name="password_check" type="password" id="password_check" value={passwordCheck} onChange={handlePasswordCheck}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3 pt-5'>
                <Form.Label column sm="2">우편번호</Form.Label>
                <Col sm="4">
                  <Form.Control name="zipNo" id="zipNo" value={zipNo} onChange={handleZipNo} readOnly/>
                </Col>
                <Col sm="6">
                  <Button variant='primary' onClick={findZipNo}>우편번호 찾기</Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="2">기본주소</Form.Label>
                <Col sm="10">
                  <Form.Control name="addr" id="addr" value={addr} onChange={handleAddr} readOnly/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="2">상세주소</Form.Label>
                <Col sm="10">
                  <Form.Control name="addrDetail" id="addrDetail" value={addrDetail} onChange={handleAddrDetail}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3 mt-2'>
                <Form.Label column sm="2">생년월일</Form.Label>
                <Col sm="10">
                  <ReactDatePicker
                    dateFormat={'yyyy.MM.dd'}/>
                  <Form.Control name="birth" id="birth" value={birth} onChange={handleBirth}/>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default Register_forms;