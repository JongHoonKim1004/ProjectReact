import React, { useState } from "react";
import { Button, Col, Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../authSlice";
import { clearQuestion } from "../surveySlice";
const Header = () => {

  const navigation = useNavigate();

  const dispatch = useDispatch();
  const {token, user, admin, member, loginType} = useSelector(state => state.auth);
  const {question, currentIndex} = useSelector(state => state.survey);

  const handleLogout = (e) => {
    let checkLogout = confirm("정말로 로그아웃 하시겠습니까?");
    if(checkLogout){
      dispatch(clearToken());
      dispatch(clearQuestion());
      
      navigation('/', {replace: false});
    }
  }

  // naver logout
  const naverLogout = () => {
    let checkLogout = confirm("정말로 로그아웃 하시겠습니까?");
    if(checkLogout){
      const accessToken = localStorage.getItem("accessToken");
      window.open(`//localhost:8080/logout/oauth/naver?access_token=${accessToken}`, "_blank", "width=500, height=500, top=100, left=100")
      }
  }

  // google logout
  const googleLogout = () => {
    let checkLogout = confirm("정말로 로그아웃 하시겠습니까?");
    if(checkLogout){
      localStorage.removeItem("accessToken");
      dispatch(clearToken());
      dispatch(clearQuestion());
      

      navigation('/', {replace: false});
    }
  }

  return (
    <div className="mb-3 mt-1">
      <Container>
        <Row>
          <Col md="3">
            <Link to="/">
              <img alt="" src="/img/header/h_logo.gif" height={"80px"}  className="p-2"/>
            </Link>
          </Col>
          <Col md="9">
            <Row>
              <Col style={{
                width: "100%",
                display: "flex",
                flexDirection: "row-reverse",
                fontSize: "12px"
              }}>
                {token ? (
                    loginType == 'naver' ? <Button variant="link" style={{textDecoration: "none", color: "#999", height: "16px", fontSize: "12px"}} className="p-0" onClick={naverLogout}>로그아웃</Button> : 
                    loginType == 'google' ?<Button variant="link" style={{textDecoration: "none", color: "#999", height: "16px", fontSize: "12px"}} className="p-0" onClick={googleLogout}>로그아웃</Button> :
                  <Button variant="link" style={{textDecoration: "none", color: "#999", height: "16px", fontSize: "12px"}} className="p-0" onClick={handleLogout}>로그아웃</Button>
                ) : (
                  <>
                    <Link style={{textDecoration: "none", color: "#999"}} to="/login">로그인</Link>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link style={{textDecoration: "none", color: "#999"}} to="/member/login">사업자 로그인</Link>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link style={{textDecoration: "none", color: "#999"}} to="/admin/login">관리자 로그인</Link>
                  </>
                )}
                {user ? (
                  <div>
                  <span style={{color: "#999"}}>{user.nickname} 님</span> 
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  </div>
                ) : null}
                {admin ? (
                  <div>
                    <Link to="/admin"  style={{textDecoration: "none", color: "#999"}} >
                      관리자 페이지
                    </Link>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span style={{color: "#999"}}>{admin.nickname} 님</span> 
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                  </div>
                ) : null}
                {member ? (
                  <div>
                    <Link to="/member"  style={{textDecoration: "none", color: "#999"}} >
                      사업자 페이지
                    </Link>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span style={{color: "#999"}}>{member.nickname} 님</span> 
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                  </div>
                ) : null}
              </Col>
            </Row>
            <Row className="pt-3 justify-content-end">
              <Col md="10">
                <Navbar style={{fontSize: "20px", fontWeight: "600s"}}>
                  <Col style={{display: "flex"}} className="justify-content-md-center">
                    <NavDropdown title="패널안내" id="navbarScrollingDropdown1" style={{fontSize: "18px", fontWeight: "650", color: "#555"}}>
                      <NavDropdown.Item><Link to="/" style={{textDecoration: "none", color: "black"}}>가입 및 혜택 안내</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/" style={{textDecoration: "none", color: "black"}}>조사 안내</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/" style={{textDecoration: "none", color: "black"}}>적립금 안내</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/" style={{textDecoration: "none", color: "black"}}>1%+ Donation</Link></NavDropdown.Item>
                    </NavDropdown>
                  </Col>
                  <Col  style={{display: "flex"}} className="justify-content-md-center">
                    <Nav.Link style={{fontSize: "18px", fontWeight: "650", color: "#555"}} to="/survey/list">조사참여</Nav.Link>
                  </Col>
                  <Col  style={{display: "flex"}} className="justify-content-md-center">
                    <NavDropdown title="이벤트" id="navbarScrollingDropdown3" style={{fontSize: "18px", fontWeight: "650", color: "#555"}}>
                      <NavDropdown.Item><Link to="/" style={{textDecoration: "none", color: "black"}}>진행중인 이벤트</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/" style={{textDecoration: "none", color: "black"}}>당첨자 확인</Link></NavDropdown.Item>
                    </NavDropdown>
                  </Col>
                  <Col  style={{display: "flex"}} className="justify-content-md-center">
                    <NavDropdown title="마이페이지" id="navbarScrollingDropdown4" style={{fontSize: "18px", fontWeight: "650", color: "#555"}}>
                      <NavDropdown.Item><Link to="/myInfo" style={{textDecoration: "none", color: "black"}}>내 정보 관리</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/myPoint" style={{textDecoration: "none", color: "black"}}>포인트 관리</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/mySurvey" style={{textDecoration: "none", color: "black"}}>조사 관리</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/myVOC" style={{textDecoration: "none", color: "black"}}>내 1:1 문의</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/" style={{textDecoration: "none", color: "black"}}>패널탈퇴</Link></NavDropdown.Item>
                    </NavDropdown>
                  </Col>
                  <Col  style={{display: "flex"}} className="justify-content-md-center">
                    <NavDropdown title="고객센터" id="navbarScrollingDropdown5" style={{fontSize: "18px", fontWeight: "650", color: "#555"}}>
                      <NavDropdown.Item><Link to="/notice" style={{textDecoration: "none", color: "black"}}>공지사항</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/faq" style={{textDecoration: "none", color: "black"}}>자주 묻는 질문</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link to="/voc" style={{textDecoration: "none", color: "black"}}>1:1 문의하기</Link></NavDropdown.Item>
                    </NavDropdown>
                  </Col>
                </Navbar>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
