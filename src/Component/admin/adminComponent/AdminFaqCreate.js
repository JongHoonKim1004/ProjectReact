import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminFaqCreate = () => {
  // useNavigate 설정
  const navigation = useNavigate();

  // state 설정
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  // 질문 제출 요청
  const handleSubmit = () => {
    let faq = {
      title : title,
      content : content
    }

    fetch("http://localhost:8080/faq/create",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faq)
    }).then((result) => {
      return result.text();
    }).then((text) => {
      console.log(text);
      alert(text);
      navigation('/admin/faq/list');
    }).catch(error => {
      console.error(error);
    })
  }
  return (
    <main>
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>자주묻는 질문 생성</h1>
      </div>
      <Row className='p-5 justify-content-md-center'>
        <Col md="8">
          <Form className='bg-white p-5' method="post">
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">질문</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">내용</Form.Label>
              <Col sm="10">
                <Form.Control
                  as={"textarea"}
                  rows={3}
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
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

export default AdminFaqCreate;