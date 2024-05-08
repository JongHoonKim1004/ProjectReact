import React from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <div>
      {/** 사이드 바 */}
      <Row>
        <Navbar sticky="top" bg="dark" data-bs-theme="dark" className='justify-content-between'>
          <Container style={{ marginLeft: "50px", marginRight: "0" }} inline>
            <Navbar.Brand>
              <Link to="/">
                <img alt="logo" src={process.env.PUBLIC_URL + "/img/header/logo.png" }/>
              </Link>
            </Navbar.Brand>
            
          </Container>
          <Container inline className='justify-content-end'>

            <Col md='4'>
              <Row>
                <Col md="8">
                  <p style={{color: "white", textAlign: "center"}}>{"누구"} 님</p>
                </Col>
                <Col md="4">
                  <Navbar.Collapse>
                    <Link to="/admin/logout" style={{textDecoration: "none", color: "white"}}>
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
    </div>
  );
};

export default AdminNavbar;
