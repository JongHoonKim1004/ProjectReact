import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import {  Link, useLocation } from 'react-router-dom';

// 쿼리스트링 추출
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const EmailFindResult = () => {
  // useState
  const [name, setName] = useState("");

  // query
  const query = useQuery();
  const nickname = query.get("nickname");
  const phone = query.get("phone");

  // 개인정보 호출
  useEffect(() => {
    const fetchIdFind = async () => {
      try{
        const response = await fetch(`//localhost:8080/users/idFind?nickname=${nickname}&phone=${phone}`);
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.json();
        console.log(data);
        if(data != null){
          setName(data.name);
        } else {
          alert("이름과 전화번호가 일치하는 계정이 없습니다");
          window.history.back(-1);
        }
        
      } catch(error){
        console.error("Fetch Failed in Id Find");
      }
    }

    fetchIdFind();
  },[]);
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
              <Col md="3">
                <p>아이디 검색 결과입니다</p>
              </Col>
            </Row>
            <Row className='justify-content-md-center mb-3'>
              <Col md="6">
                <Row className='pb-5'>
                  <Col>
                    <Form>
                      <Form.Control readOnly style={{textAlign: "center"}} value={name}/>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Link to="/pwFind" className='d-grid' style={{textDecoration: "none"}}>
                      <Button variant='warning'>비밀번호 찾기</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/login" className='d-grid'>
                      <Button variant="primary">로그인</Button>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default EmailFindResult;