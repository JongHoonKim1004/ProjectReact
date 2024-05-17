import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, setLoginType, setToken, setUser, setUserPoint } from "../authSlice";
import jwt_decode from 'jwt-decode';
import { clearQuestion } from "../surveySlice";


const Main = () => {
  // usenavigate
  const navigation = useNavigate();

  // redux 설정
  const dispatch = useDispatch();
  const {token, user, userPoint, admin, member, memberPoint} = useSelector(state => state.auth);
  const {question, currentIndex} = useSelector(state => state.survey);

  // state
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [surveyList, setSurveyList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);

  // call 
  useEffect(() => {
    const fetchSurvey = async () => {
      try{
        const response = await fetch("//localhost:8080/survey/list/active");
        const response2 = await fetch("//localhost:8080/notice/list/formain");
        if(!response.ok || !response2.ok){
          console.error("Network is not good");
        }

        const data = await response.json();
        const data2 = await response2.json();

        console.log(data);
        console.log(data2);

        setSurveyList(data);
        setNoticeList(data2);
      } catch(error){
        console.error("Failed get Fetch, Fetch Failed");
      }
    }

    fetchSurvey();
  },[]);

// 날짜 input 변경
const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = '' + d.getFullYear();

  if(month.length < 2){
    month = '0' + month;
  }
  if(day.length < 2){
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

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
        console.error('Failed to login Users:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error login Users:', error);
      return false;
    }
  }

  // logout
  const handleLogout = (e) => {
    let checkLogout = confirm("정말로 로그아웃 하시겠습니까?");
    if(checkLogout){
      dispatch(clearToken());
      dispatch(clearQuestion());
      navigation('/', {replace: false});
    }
  }

  return (
    <div>
      <Container>
        <Row
          style={{
            backgroundColor: "#5592c2",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div className="col-lg-8" style={{ padding: "0" }}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/main/banner_1.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/main/banner_2.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-lg-4">
            <Card
              style={{
                backgroundColor: "transparent",
                border: "0",
                width: "100%",
                height: "100%",
                color: "white",
              }}
            >
              <Card.Body>
                <div style={{ width: "100%", height: "100%" }}>
                  {token ? (
                    <Row>
                      <Col>
                        <Row className="pt-3 pb-5">
                          {user && (
                            <Col>
                              <h4>{user.nickname} 님, 환영합니다</h4>
                            </Col>
                          )}
                          {admin && (
                            <Col>
                              <h4>{admin.nickname} 님, 환영합니다</h4>
                            </Col>
                          )}
                          {member && (
                            <Col>
                              <h4>{member.nickname} 님, 환영합니다</h4>
                            </Col>
                          )}
                        </Row>
                        {userPoint && (
                          <Row className="pt-3 pb-5">
                            <Col>
                              <span>사용 가능한 포인트</span>
                            </Col>
                            <Col>
                              <span>{userPoint.pointBalance} 포인트</span>
                            </Col>
                          </Row>
                        )}
                        {memberPoint && (
                          <Row className="pt-3 pb-5">
                            <Col>
                              <span>사용 가능한 포인트</span>
                            </Col>
                            <Col>
                              <span>{memberPoint.pointBalance} 포인트</span>
                            </Col>
                          </Row>
                        )}
                        <Row className="pb-3">
                          <Col className="d-grid">
                            {admin && null}
                            {user && (
                              <Button 
                              variant="success"
                              onClick={() => navigation('/myInfo')}
                            >회원정보 변경</Button>
                            )}
                            {member && (
                              <Button 
                              variant="success"
                              onClick={() => navigation('member/infoModify')}
                            >회원정보 변경</Button>
                            )}
                          </Col>
                          <Col className="d-grid">
                            <Button 
                              variant="danger"
                              onClick={handleLogout}
                            >로그아웃</Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  ) : (
                    <Form onSubmit={handleLogin}>
                    <Row className="mb-2">
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextEmail"
                      >
                        <Form.Label column sm="4">
                          아이디
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            name="name"
                            id="name"
                            placeholder="example@example.com"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextpassword"
                      >
                        <Form.Label column sm="4">
                          비밀번호
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            name="password"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Col sm="6">
                        <Button
                          variant="primary"
                          type="submit"
                          style={{
                            float: "right",
                            width: "100%",
                            textAlign: "center",
                          }}
                          
                        >
                          로그인
                        </Button>
                      </Col>
                      <Col sm="6">
                        <Button
                          variant="primary"
                          type="button"
                          style={{ width: "100%", textAlign: "center" }}
                          onClick={() => navigation('/register_terms')}

                        >
                          <Link
                            
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            회원가입
                          </Link>
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <Button
                          variant="primary"
                          type="button"
                          style={{
                            float: "right",
                            width: "100%",
                            textAlign: "center",
                          }}
                          onClick={() => navigation('/idFind')}

                        >
                          <Link
                            
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            아이디 찾기
                          </Link>
                        </Button>
                      </Col>
                      <Col sm="6">
                        <Button
                          variant="primary"
                          type="button"
                          style={{ width: "100%", textAlign: "center" }}
                          onClick={() => navigation('/pwFind')}

                        >
                          <Link
                            
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            비밀번호 찾기
                          </Link>
                        </Button>
                      </Col>
                    </Row>
                    <Row className="pt-2">
                      <p style={{fontSize: "12px", textAlign: "center"}}>{'※'} 소셜로그인은 상단 '로그인' 버튼으로 이동 후 로그인 해주세요</p>
                    </Row>
                  </Form>
                  )
                }
                  
                </div>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>
      <Container>
        <Row>
        <div style={{backgroundColor: "#e2f4f7", height: "20px"}}></div>
        </Row>
      </Container>
      <Container>
        <Row>
          <div class="col-md-12" style={{ backgroundColor: "#bbebd2" }}>
            <Row>
              <Col md="1"></Col>
              <Col md="10">
                <Row>
                  <Col md="4" style={{cursor: "pointer"}}>
                    <img alt="" src="img/main/mPanelTabBt3_on.gif"/>
                  </Col>
                </Row>
                <Row style={{ height: "430px", margin: "20px 0" }}>
                  {surveyList.map((survey, index) => (
                    <div className="col-md-3" key={index}>
                      <Card>
                        <ListGroup variant="flush">
                          <ListGroup.Item style={{ height: "90px" }}>
                            <Button variant="link"
                              onClick={(e) => window.open(`/survey/title/${survey.surveyId}`, "_blank", "width=950, height=720, left=100, top=100")}
                              style={{textDecoration: "none"}}
                            >
                              {survey.name} 
                            </Button>
                          </ListGroup.Item>
                          <ListGroup.Item style={{ height: "90px" }}>
                            <Row className="mb-4">
                              <Col>
                              {formatDate(survey.startDate) + "~" + formatDate(survey.endDate)}
                              </Col>
                            </Row>
                            <Row>
                              <Col style={{textAlign: "right"}}>{survey.point + " 포인트 지급"}</Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </div>
                  ))}
                </Row>
              </Col>
              <Col md="1"></Col>
            </Row>
          </div>
        </Row>
      </Container>
      <Container>
        <Row>
        <div style={{backgroundColor: "#e2f4f7", height: "20px"}}></div>
        </Row>
      </Container>
      <Container style={{backgroundColor: "#f0f0f0"}}>
        <Row>
          <Col>
            <Row>
              <Col md="4"className="p-3">
                <Row className="pb-3">
                  <Col md="11">
                    <img alt="" src="/img/main/mNoti2_tit.gif"/>
                  </Col>
                  <Col md="1">
                    <Link to="/notice" style={{textDecoration: "none", color: "#111"}}>
                      {"+"}
                    </Link>
                  </Col>
                </Row>
                <Row>
                  {Array.isArray(noticeList.content) ? noticeList.content.map((notice, index) => (
                    <Col sm="12" key={index} className="pb-1">
                      <Link to={"/notice/read/" + notice.id} style={{textDecoration: "none", color: "#111"}}>
                        {notice.title}
                      </Link>
                    </Col>
                  )) : null}
                  
                </Row>
              </Col>
              <Col md="8">
                <Row>
                  <Col>
                    <img alt="" src="img/main/mSaving_bg.gif" style={{width: "100%"}}/>
                  </Col>
                  <Col>
                    <img alt="" src="img/main/mProtectionImg.gif" style={{width: "100%"}}/>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row  className="mb-2 mt-2">
              <Col md="4" style={{display: "flex", alignItems: "center"}}>
                <img alt="" src="img/main/mPhoneInfo_tx.gif" style={{width: "100%"}}></img>
              </Col>
              <Col md="8">
                <Row>
                  <Col sm="4">
                    <img alt="" src="img/main/mFaqImg.gif" style={{width: "100%"}}/>
                  </Col>
                  <Col sm="4">
                    <img alt="" src="img/main/mQnaImg.gif" style={{width: "100%"}}/>
                  </Col>
                  <Col sm="4" >
                    <img alt="" src="img/main/mAppDownImg.gif" style={{width: "100%", paddingTop: "15px"}}/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
