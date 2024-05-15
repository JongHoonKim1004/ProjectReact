import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminAdminCreate = () => {
  const navigation = useNavigate();

  // 관리자 정보 state 생성
  const [name, setName] = useState();
  const [nameChecked, setNameChecked] = useState();
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [phone, setPhone] = useState();
  const [employeeNo, setEmployeeNo] = useState();

  // 정보 onChange funciton 생성
  const handelName = (e) => {
    setName(e.target.value);
  }
  const handleNickname = (e) => {
    setNickname(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  }
  const handlePhone = (e) => {
    setPhone(e.target.value);
  }
  const handleEmployeeNo = (e) => {
    setEmployeeNo(e.target.value);
  }

  window.usernameCheck = (name) => {
    setNameChecked(name);
    console.log("Username Checked : ", name);
  }

  // 아이디 중복확인
  const idCheck = (e) => {
      
    if(name !== undefined){
      window.open(`http://localhost:3000/idCheck?username=${name}`, "_blank", "width=700, height=500, left=100, top=100")
    } else {
      e.preventDefault();
      alert("아이디를 입력해주세요");
    }
    
  }
  
  // 제출시 실행할 function
  const handleSubmit = (e) => {
    // 서버 요청 전 확인
    if(name == null || nickname == null || password == null || passwordCheck == null || phone == null || employeeNo == null){
      alert("빈칸을 전부 채워주세요");
      return false;
    }
    if(password != passwordCheck){
      alert("비밀번호가 일치하지 않습니다");
      return false;
    }

    // 서버 요청
    var admin = {
      name : name,
      nickname : nickname,
      password : password,
      phone : phone,
      employeeNo : employeeNo
    }

    fetch("http://localhost:8080/admin/create",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin)
    }).then((result) => {
      return result.text();
    }).then((text) => {
      console.log(text);
      alert(text);
      navigation('/admin/admin/list');
    })
  }

  return (
    <>
      <main>
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>새 관리자 생성</h1>
      </div>
      <Row className='p-5 justify-content-md-center'>
        <Col md="8">
          <Form className='bg-white p-5' method="post">
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">아이디</Form.Label>
              <Col sm="5">
                <Form.Control type="text" name="name" id="name" value={name} onChange={handelName}/>
              </Col>
              <Col sm="5">
                <Button variant='primary' onClick={idCheck}>중복 확인</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">이름</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="nickname" id="nickname" value={nickname} onChange={handleNickname}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">비밀번호</Form.Label>
              <Col sm="10">
                <Form.Control type="password" name="password" id="password" value={password} onChange={handlePassword}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">비밀번호 확인</Form.Label>
              <Col sm="10">
                <Form.Control type="password" name="passwordCheck" id="passwordCheck" value={passwordCheck} onChange={handlePasswordCheck}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">연락처</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="phone" id="phone" value={phone} onChange={handlePhone}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">사원번호</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="employeeNo" id="employeeNo" value={employeeNo} onChange={handleEmployeeNo}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="10"></Form.Label>
              <Col sm="2">
                <Button variant='primary' type='button' onClick={handleSubmit}>등록하기</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </main>
    </>
  );
};

export default AdminAdminCreate;