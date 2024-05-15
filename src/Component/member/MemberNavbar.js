import React from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../../authSlice";

const MemberNavbar = () => {
  // useNavigate
  const navigation = useNavigate();

  // redux
  const { member } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // logout
  const handleLogout = () => {
    let logoutConfirm = confirm("정말로 로그아웃 하시겠습니까?");

    if (logoutConfirm) {
      dispatch(clearToken());
      alert("로그아웃되었습니다.");
      navigation("/");
    }
  };

  return (
    <>
      {/** 사이드 바 */}
      <Row>
        <Navbar
          sticky="top"
          bg="white"
          data-bs-theme="white"
          className="justify-content-between"
        >
          <Container style={{ marginLeft: "50px", marginRight: "0" }} inline>
            <Navbar.Brand>
              <Link to="/">
                <img
                  alt="logo"
                  src={process.env.PUBLIC_URL + "/img/header/logo.png"}
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Text>사업자 페이지</Navbar.Text>
          </Container>
          <Container inline className="justify-content-end">
            <Col md="4">
              <Row>
                {member && (
                  <Col md="8">
                    <p style={{ textAlign: "center" }}>{member.nickname} 님</p>
                  </Col>
                )}
                <Col md="4">
                  <Navbar.Collapse>
                    <Button
                      variant="link"
                      size="sm"
                      style={{ textDecoration: "none", color: "#111" }}
                      onClick={handleLogout}
                    >
                      로그아웃
                    </Button>
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
