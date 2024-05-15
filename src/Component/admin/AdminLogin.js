import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoginType, setToken, setAdmin } from "../../authSlice";
import jwt_decode from 'jwt-decode';

const AdminLogin = () => {
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

    if(admin != null && member == null && user == null){
      window.location.href="/admin";
    } else if(admin == null){
      if(member != null || user != null){
        alert("잘못된 접근입니다.");
        window.history.back(-1);
      }
    }
  },[]);

  // Admin login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    

    // 입력 검증
    if(name == "" || password == ""){
      alert("아이디와 비밀번호를 입력해주세요");
      return false;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/admin/login`, {
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
        const adminId = decoded.sub;
        
        const response2 = await fetch(`http://localhost:8080/admin/id/${adminId}`);
        const data = await response2.json();
        dispatch(setAdmin(data));
        dispatch(setToken(result.token));
        dispatch(setLoginType('admin'));

        
        navigation('/admin', {replace: false});
        return true;
      } else {
        console.error('Failed to login Admin:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error login Admin:', error);
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
                  <h4>관리자 로그인</h4>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='pt-3'>
            <Form onSubmit={handleAdminLogin}>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="3">아이디</Form.Label>
                <Col sm="9">
                  <Form.Control type="text" name="nameforadmin" value={name} onChange={(e) => setName(e.target.value)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-5 pb-5'>
                <Form.Label column sm="3">비밀번호</Form.Label>
                <Col sm="9">
                  <Form.Control type="password" name="passwordforadmin" value={password} onChange={(e) => setPassword(e.target.value)}/>
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

export default AdminLogin;
