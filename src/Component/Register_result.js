import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register_result = () => {
  const navigation = useNavigate();
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
          <Col md="6">
            <Row className='p-4 bg-white'>
              <Col>
                <Row className='justify-content-md-center mb-4'>
                  <Col md="8">
                    <img alt="" src="img/register_result/2377640_business_company_hands_join_shakehand_icon.png"
                        style={{width: "100%"}}
                    />
                  </Col>
                </Row>
                <Row className='mb-4'>
                  <p align="center"
                      style={{fontSize: "24px", fontWeight: "700"}}
                  >엠브레인 패널파워의 회원이 되신 것을 축하드립니다.</p>
                </Row>
                <Row className='mb-4 justify-content-md-center'>
                  <Col md="6">
                    <Button className='mx-4' type="button" onClick={navigation('/login', {replace: true})}>로그인</Button>
                    <Button type="button" onClick={navigation('/', {replace: true})}>메인 페이지로</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Container style={{height: "80px"}}/>
      </Container>
    </div>
  );
};

export default Register_result;
