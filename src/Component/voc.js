import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const Voc = () => {
  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>1:1 문의하기</h1>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 고객센터 {`>`} 1:1 문의하기
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Form>
              <Form.Group as={Row} className='mb-3' controlId='formTextTitle'>
                <Form.Label column sm="2">제목</Form.Label>
                <Col sm="10">
                  <Form.Control name="title" id="title"></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3' controlId='formTextWriter'>
                <Form.Label column sm="2">작성자</Form.Label>
                <Col sm="10">
                  <Form.Control name="writer" id="writer" plaintext readonly defaultValue={"zima0412@gmail.com"}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3' controlId='formTextContent'>
                <Form.Label column sm="2">내용</Form.Label>
                <Col sm="10">
                  <Form.Control as={"textarea"} rows={5} cols={10} style={{resize: "none", overflow: "scroll"}} name="content" id="content"/>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm="10"></Col>
                <Col sm="2">
                  <Button type="submit">등록하기</Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default Voc;