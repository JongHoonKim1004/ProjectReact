import React from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <div>
      {/** 사이드 바 */}
      <Row>
        <Navbar sticky="top" bg="dark" data-bs-theme="dark">
          <Container style={{ marginLeft: "50px", marginRight: "0" }}>
            <Navbar.Brand>
              <Link to="/">
                <img alt="" src="img/header/logo.png" />
              </Link>
            </Navbar.Brand>
            
          </Container>
        </Navbar>
      </Row>
      {/** 사이드 바 end */}
    </div>
  );
};

export default AdminNavbar;
