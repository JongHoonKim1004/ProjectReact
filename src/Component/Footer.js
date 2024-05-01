import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <div>
      <Container className='pb-4 pt-4' style={{backgroundColor: "#666"}}>
        <Row>
          <img alt="" src="img/footer/footer.png"/>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;