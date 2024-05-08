import React from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';

const AdminNoticeCreate = () => {

  // 제출 요청시 함수
  const handleSubmit = () => {

  }
  return (
    <main>
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>새 관리자 생성</h1>
      </div>
      <Row className='p-5 justify-content-md-center'>
        <Col md="8">
          <Form className='bg-white p-5' method="post">
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">제목</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="name" id="name"/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">작성자</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="nickname" id="nickname"/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">내용</Form.Label>
              <Col sm="10">
                <Form.Control as={"textarea"}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="10"></Form.Label>
              <Col sm="2">
                <Button variant='primary' type='button' onClick={handleSubmit}>등록하기</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </main>
  );
};

export default AdminNoticeCreate;