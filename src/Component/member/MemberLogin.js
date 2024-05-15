import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoginType, setMember, setMemberPoint, setToken } from '../../authSlice';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';

const MemberLogin = () => {
    // useNavate
    const navigation = useNavigate();

    // redux
    const dispatch = useDispatch();
    const { admin, member, user } = useSelector(state => state.auth);
  
    // useState
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
  
    // 로그인 하고 접근했는지 확인
  useEffect(() => {
    window.scroll(0,0);

    if(admin == null && member != null && user == null){
      navigation("/member");
    } else if(admin == null){
      if(member != null || user != null){
        alert("잘못된 접근입니다.");
        window.history.back(-1);
      }
    }
  },[]);

    // Member login
    const handleMemberLogin = async (e) => {
      e.preventDefault();
      
  
      // 입력 검증
      if(name == "" || password == ""){
        alert("아이디와 비밀번호를 입력해주세요");
        return false;
      }
      
      try {
        const response = await fetch(`http://localhost:8080/member/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            password: password
          })
        });
  
        if (response.ok) {
          // 로그인 처리 전 아이디 비밀번호 비우기
          setName("");
          setPassword("");
  
          // 로그인 처리
          const result = await response.json();
          console.log(result);
  
          // 사용자 정보 호출
          const decoded = jwt_decode(result.token);
          const memberId = decoded.sub;
          
          const response2 = await fetch(`http://localhost:8080/member/read/${memberId}`);
          const data2 = await response2.json();
          const response1 = await fetch(`http://localhost:8080/member/point/find/${memberId}`);
          const data1 = await response1.json();
          dispatch(setMember(data2));
          dispatch(setMemberPoint(data1));

          dispatch(setToken(result.token));
          dispatch(setLoginType('member'));

          navigation('/member', {replace: false});
          return true;
        } else {
          console.error('Failed to login Member:', response.statusText);
          return false;
        }
      } catch (error) {
        console.error('Error login Member:', error);
        return false;
      }
    }
  
    
    return (
      <div>
        <Row className='justify-content-md-center' style={{backgroundColor: "RGB(235, 235, 235)"}}>
          <Container style={{padding: "100px 0"}}/>
          <Col md="4" className="p-5 mt-5 bg-white">
            <Row className="justify-content-md-center mb-5">
              <Col md="8">
                <Row className="justify-content-md-center mb-3">
                  <Col md="6">
                    <Link to="/">
                      <img alt="logo" src="../img/header/h_logo.gif" style={{width: "100%"}}/>
                    </Link>
                  </Col>
                </Row>
                <Row className='justify-content-md-center'>
                  <Col md="6">
                    <h4>사업자 로그인</h4>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='pt-3'>
              <Form onSubmit={handleMemberLogin}>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label column sm="3">아이디</Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" name="nameformember" value={name} onChange={(e) => setName(e.target.value)}/>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-5 pb-5'>
                  <Form.Label column sm="3">비밀번호</Form.Label>
                  <Col sm="9">
                    <Form.Control type="password" name="passwordformember" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Col sm="3"></Col>
                  <Col sm="9">
                    <Row>
                      <Col md="8" className='d-grid'>
                        <Button variant='primary' type="submit" size="lg">로 그 인</Button>
                      </Col>
                      <Col md="4"></Col>
                    </Row>
                  </Col>
                </Form.Group>
              </Form>
            </Row>
          </Col>
          <Container style={{padding: "200px 0"}}/>
        </Row>
        
      </div>
    );
  };


export default MemberLogin;