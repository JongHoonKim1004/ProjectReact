import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EmailFind = () => {
  // useNavigate
  const navigate = useNavigate();

  // redux
  const { token } = useSelector(state => state.auth);

  // useState
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");

  // 아이디 찾기
  const findId = () => {
    if(nickname == "" || phone == ""){
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    navigate(`/idFind/result?nickname=${nickname}&phone=${phone}`);
  }

  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>아이디 찾기</h1>
              <p style={{ fontSize: "12px", fontWeight: "100" }}>
                
              </p>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 아이디 찾기
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Row className='pt-5 pb-5 justify-content-md-center'>
              <Col md="6">
                <p>아이디를 찾기 위해 이름과 전화번호 입력이 필요합니다</p>
              </Col>
            </Row>
            <Form>
              <Row className='pb-4 justify-content-md-center'>
                <Col md="6">
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">이름</Form.Label>
                    <Col sm="9">
                      <Form.Control value={nickname} onChange={(e) => setNickname(e.target.value)} autoComplete='off'/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm="3">전화번호</Form.Label>
                    <Col sm="9">
                      <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="'-' 를 제외하고 입력해주세요"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className='mb-3'>
                    <Col className='d-grid'>
                      <Button type="button" variant='primary' style={{float: "right"}} onClick={findId}>아이디 찾기</Button>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default EmailFind;