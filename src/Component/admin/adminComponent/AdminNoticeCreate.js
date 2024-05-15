import React, { useState } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../../ckeditor/build/ckeditor';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const AdminNoticeCreate = () => {
  // useNavigate 설정
  const navigation = useNavigate();

  // redux
  const dispatch = useDispatch();
  const {admin} = useSelector(state => state.auth);

  // state 설정
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState(admin.nickname);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    let notice = {
      title : title,
      writer : writer,
      content : content
    }
    // 폼 제출 로직
    console.log({ title, writer, content });

    fetch("http://localhost:8080/notice/create",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notice)
    }).then((result) => {
      return result.text();
    }).then((text) => {
      console.log(text);
      alert(text);
      navigation('/admin/notice/list');
    }).catch(error => {
      console.error(error);
    })
  };

  return (
    <main>
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>새 공지사항 작성</h1>
      </div>
      <Row className='p-5 justify-content-md-center'>
        <Col md="8">
          <Form className='bg-white p-5' method="post">
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">제목</Form.Label>
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
              <Form.Label column sm="2">작성자</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="writer"
                  id="writer"
                  value={writer}
                  readOnly
                  plaintext
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">내용</Form.Label>
              <Col sm="10">
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    toolbar: [
                      'heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
                      'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
                      'undo', 'redo', 'imageUpload'
                    ],
                    image: {
                      toolbar: [
                        'imageTextAlternative', 'imageStyle:full', 'imageStyle:side'
                      ]
                    },
                    simpleUpload: {
                      uploadUrl: 'http://example.com/image/upload', // 서버의 이미지 업로드 URL
                      headers: {
                        'X-CSRF-TOKEN': 'CSFR-Token',
                        Authorization: 'Bearer <JSON Web Token>'
                      }
                    }
                  }}
                  data=""
                  onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setContent(data);
                  }}
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

export default AdminNoticeCreate;
