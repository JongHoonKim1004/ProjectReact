import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ClassicEditor from '../ckeditor/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useNavigate } from 'react-router-dom';


const Voc = () => {
  // useNavigate
  const navigation = useNavigate();

  // redux
  const dispatch = useDispatch();
  const {user, token} = useSelector(state => state.auth);

  // 유저만 접근 가능하도록
  useEffect(() => {
    if(token == null) {
      alert("로그인 후 이용해주세요");
      navigation('/login');
    }

    if(token != null && user == null){
      alert("일반회원만 이용 가능합니다");
      navigation('/');
    }
  },[]);

  // useState
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState(user ? user.name : null);
  const [content, setContent] = useState("");

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 작성자 검증
    if(writer == null){
      alert("잘못된 접근입니다.");
      navigation('/');
    }

    // 입력 검증
    if(title == null || content == null){
      alert("제목과 내용을 채워주세요");
      return false;
    }

    // VOC 만들기
    let voc = {
      title: title,
      writer: writer,
      content: content,
    }

    // fetch
    fetch("//localhost:8080/voc/create",{
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(voc)
    }).then(response => response.text())
    .then(result => {
      console.log(result);
      if(result == "VOC Saved"){
        alert("등록에 성공했습니다.");
        navigation('/myVoc');
      } else {
        alert("등록에 실패했습니다");
      }
    })
  }

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
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className='mb-3' controlId='formTextTitle'>
                <Form.Label column sm="2">제목</Form.Label>
                <Col sm="10">
                  <Form.Control name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3' controlId='formTextWriter'>
                <Form.Label column sm="2">작성자</Form.Label>
                <Col sm="10">
                  <Form.Control name="writer" id="writer" plaintext readonly value={writer}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3' controlId='formTextContent'>
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