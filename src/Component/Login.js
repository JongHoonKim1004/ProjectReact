import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoginType, setToken, setUser, setUserPoint } from "../authSlice";
import jwt_decode from 'jwt-decode';

const Login = () => {
  // usenavigate
  const navigation = useNavigate();

  // redux 설정
  const dispatch = useDispatch();
  const {admin , user, member} = useSelector(state => state.auth);

  // state
  const [name, setName] = useState("");
  const [password,setPassword] = useState("");

  // 네이버 설정
  const NAVER_CLIENT_ID = "3kmcSAzePM8TYBI6aCLw";
  const REDIRECT_URI = "http://localhost:8080/login/oauth/naver";
  const STATE = "helloreact";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

  const naverLogin = () => {
    window.open(NAVER_AUTH_URL, "_blank", "width=950, height=720, left=100, top=100");
  }

  // 구글 설정
  const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&redirect_uri=http://localhost:8080/login/oauth/google&response_type=code&client_id="
  const GOOGLE_CLIENT_ID = "151101852629-rag7pn75fia742c4m0uo31eaog2e0iq3.apps.googleusercontent.com";
  const googleLogin = () => {
    window.open(GOOGLE_AUTH_URL + GOOGLE_CLIENT_ID, "_blank", "width=950, height=720, left=100, top=100");
  }


  // 로그인 하고 접근하는지 확인
  useEffect(() => {
    if(admin != null || user != null || member != null){
      alert("잘못된 접근입니다");
      navigation('/');
    }
  },[]);

  // login
  const handleLogin = async (e) => {
    e.preventDefault();
    

    // 입력 검증
    if(name == "" || password == ""){
      alert("아이디와 비밀번호를 입력해주세요");
      return false;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/users/login`, {
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
        const userId = decoded.sub;
        
        const response2 = await fetch(`http://localhost:8080/users/read/${userId}`);
        const data2 = await response2.json();
        const response1 = await fetch(`http://localhost:8080/users/point/find/${userId}`);
        const data1 = await response1.json();
        dispatch(setUser(data2));
        dispatch(setUserPoint(data1));

        dispatch(setToken(result.token));
        dispatch(setLoginType('normal'));

        navigation('/', {replace: false});
        return true;
      } else {
        console.error('Failed to save Survey:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error saving Survey:', error);
      return false;
    }
  }

  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>로그인</h1>
              <p style={{ fontSize: "12px", fontWeight: "100" }}>
                환영합니다. 엠브레인 패널파워 회원 로그인 페이지입니다. 여러분의
                의견이 세상을 움직입니다.
              </p>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 로그인
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Container style={{ backgroundColor: "white" }} className="p-5">
              <Row>
                <Col>
                  <Form onSubmit={handleLogin}>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        아이디
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control 
                          name="username" 
                          id="username"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        비밀번호
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="password"
                          name="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <button
                        type="submit"
                        style={{
                          width: "auto",
                          padding: 0,
                          border: 0,
                          marginRight: "5px",
                        }}
                      >
                        <img alt="login" src="/img/login/loginBt_70x35.gif" />
                      </button>
                      <button
                        type="button"
                        style={{
                          width: "auto",
                          padding: 0,
                          border: 0,
                          marginRight: "5px",
                        }}
                        onClick={() => navigation('/register_terms')}
                      >
                        <img alt="register" src="/img/login/joinBt_80x35.gif" />
                      </button>
                      <button
                        type="button"
                        style={{
                          width: "auto",
                          padding: 0,
                          border: 0,
                          marginRight: "5px",
                        }}
                        onClick={() => navigation('/idFind')}
                      >
                        <img
                          alt="idFind"
                          src="/img/login/idSearchBt_90x35.gif"
                        />
                      </button>
                      <button
                        type="button"
                        style={{ width: "auto", padding: 0, border: 0 }}
                        onClick={() => navigation('/pwFind')}
                      >
                        <img
                          alt="pwFind"
                          src="/img/login/pwSearchBt_105x35.gif"
                        />
                      </button>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Col sm="6">
                        <img alt="naver login" src="/img/social/btnG_naver1.png" style={{width: "170px", cursor: "pointer", height: "45px"}}  onClick={naverLogin} />
                      </Col>
                      <Col sm="6">
                        <img alt="google login" src="/img/social/web_light_sq_ctn@1x.png" style={{width: "170px", cursor: "pointer", height: "45px"}} onClick={googleLogin}/>
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Row>
                    <Col md="3">
                      <img alt="" src="/img/login/loginLogo_img.gif" />
                    </Col>
                    <Col md="9" style={{paddingLeft: "15px"}}>
                      <p style={{fontSize: "12px", margin: "3px"}}>엠브레인 패널파워는</p>
                      <p style={{fontSize: "12px", margin: "3px"}}>국내 조사회사 중 유일하게 개인정보보호</p>
                      <p style={{fontSize: "12px", margin: "3px"}}>우수사이트 인증을 받았으며 패널님의</p>
                      <p style={{fontSize: "12px", margin: "3px"}}>소중한 정보를 안전하게 관리하고 있습니다.</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default Login;
