import React from "react";
import { Container, Dropdown, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminMain = () => {
  // navigation
  const navigation = useNavigate();

  return (
    <div>
      {/** 사이드 바 */}
      <Row>
        <Navbar sticky="top" bg="dark" data-bs-theme="dark">
          <Container style={{ marginLeft: "50px", marginRight: "0" }}>
            <Navbar.Brand>
              <img alt="" src="img/header/logo.png" />
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">대시보드</Nav.Link>
              <Nav.Link disabled>|</Nav.Link>
              <Nav.Link href="#features">이용자 관리</Nav.Link>
              <Nav.Link disabled>|</Nav.Link>
              <Nav.Link href="#pricing">사업자 관리</Nav.Link>
              <Nav.Link disabled>|</Nav.Link>
              <Nav.Link href="">설문조사 관리</Nav.Link>
              <Nav.Link disabled>|</Nav.Link>
              <Nav.Link href="">1:1 문의 관리</Nav.Link>
              <Nav.Link disabled>|</Nav.Link>
              <Nav.Link href="">공지사항 관리</Nav.Link>
              <Nav.Link disabled>|</Nav.Link>
              <Nav.Link href="">자주묻는 질문 관리</Nav.Link>
              <Nav.Link disabled>|</Nav.Link>
              <Nav.Link href="">관리자 설정</Nav.Link>
            </Nav>
            
          </Container>
        </Navbar>
      </Row>
    </div>
  );
};

export default AdminMain;
