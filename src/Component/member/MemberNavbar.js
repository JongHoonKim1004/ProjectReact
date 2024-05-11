import React from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MemberNavbar = () => {
  return (
    <>
      {/** 사이드 바 */}
      <Row>
        <Navbar sticky="top" bg="white" data-bs-theme="white" className='justify-content-between'>
          <Container style={{ marginLeft: "50px", marginRight: "0" }} inline>
            <Navbar.Brand>
              <Link to="/">
                <img alt="logo" src={process.env.PUBLIC_URL + "/img/header/logo.png" }/>
              </Link>
            </Navbar.Brand>
            <Navbar.Text>
              사업자 페이지
            </Navbar.Text>
          </Container>
          <Container inline className='justify-content-end'>

            <Col md='4'>
              <Row>
                <Col md="8">
                  <p style={{textAlign: "center"}}>{"누구"} 님</p>
                </Col>
                <Col md="4">
                  <Navbar.Collapse>
                    <Link to="/member/logout" style={{textDecoration: "none", color : "#111"}}>
                      로그아웃
                    </Link>
                  </Navbar.Collapse>
                </Col>
              </Row>
            </Col>
          </Container>
        </Navbar>
      </Row>
      {/** 사이드 바 end */}
    </>
  );
};

export default MemberNavbar;
