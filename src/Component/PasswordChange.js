import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

// 쿼리스트링 추출
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const PasswordChange = () => {
  // useNavigate
  const navigate = useNavigate();

  // useState
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);
  const [user, setUser] = useState({});

  // query
  const query = useQuery();
  const name = query.get("name");

  // 회원정보 업데이트를 위한 회원정보 호출
  useEffect(() => {
    const fetchPasswordChangeName = async () => {
      try{
        const response = await fetch(`//localhost:8080/users/name/${name}`);
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.json();

        setUser(data);
      } catch(error){
        console.error("Fetch Failed in Password Change Get Users");
      }
    }

    fetchPasswordChangeName();
  },[name]);

  // 비밀번호 변경
  const changePassword = () => {
    if(!password || !passwordCheck || password == "" || passwordCheck == ""){
      alert("비밀번호 와 비밀번호 확인을 입력해주세요");
      return;
    }
    if(password != passwordCheck){
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    let userDTO = {
      adrr: user.addr,
      addrDetail: user.addrDetail,
      birth: user.bitrh,
      gender: user.gender,
      married: user.married,
      name: user.name,
      nickname: user.nickname,
      occupation: user.occupation,
      password: password,
      phone: user.phone,
      usersId: user.usersId,
      zipNo: user.zipNo
    }


    const fetchPasswordChange = async () => {
      try{
        const response = await fetch(`//localhost:8080/users/update/${user.usersId}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDTO),
        });

        if(!response.ok){
          console.error("Network is not good");
          return;
        }

        const data = await response.text();
        alert("비밀번호가 변경되었습니다.\n로그인 화면으로 이동합니다");
        navigate("/login");
      } catch(error){
        console.error("Fetch Failed in Password Change Fetching");
      }
    }

    fetchPasswordChange();
  }
  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>비밀번호 재설정</h1>
              <p style={{ fontSize: "12px", fontWeight: "100" }}>
                
              </p>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 비밀번호 재설정
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Form>
              <Row className='pb-4 justify-content-md-center'>
                <Col md="6">
                  <Form.Group as={Row} className="mb-5">
                    <Form.Label column sm="4">비밀번호</Form.Label>
                    <Col sm="8">
                      <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off'/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-5">
                    <Form.Label column sm="4">비밀번호 확인</Form.Label>
                    <Col sm="8">
                      <Form.Control type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} autoComplete='off'/>
                    </Col>
                  </Form.Group>
                  <Form.Group>
                    <Col className='d-grid'>
                      <Button type="button" variant='primary' style={{float: "right"}} onClick={changePassword}>비밀번호 재설정</Button>
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

export default PasswordChange;