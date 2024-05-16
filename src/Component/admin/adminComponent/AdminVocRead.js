import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../../ckeditor/build/ckeditor';

const AdminVocRead = () => {
  // useNavigate
  const navigation = useNavigate();

  // useParams
  const { vocId } = useParams();

  // redux
  const { token } = useSelector(state => state.auth);

  // useState
  const [voc, setVoc] = useState({});
  const [replyList, setReplyList] = useState([]);
  const [wantReply, setWantReply] = useState(false);
  const [reply, setReply] = useState("");


  // 날짜 input 변경
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = '' + d.getFullYear();

    if(month.length < 2){
      month = '0' + month;
    }
    if(day.length < 2){
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  // 문의와 답글 목록 호출
  useEffect(() => {
    const fetchAdminVocRead = async () => {
      try{
        const response = await fetch(`//localhost:8080/voc/one/${vocId}`);
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.json();
        console.log(data);
        setVoc(data.voc);
        setReplyList(data.reply);
      } catch(error){
        console.error("Fetch Error in Admin Voc Read");
      }
    }

    fetchAdminVocRead();
  },[]);

  // 문의 삭제 요청
  const handleAdminVocDelete =  () => {
    let check =  confirm("정말로 삭제하시겠습니까?");
    if(check){
      fetch(`//localhost:8080/voc/delete/${vocId}`,{
        method: "post",
        headers: {
          "Authorization": "bearer " + token,
        }
      }).then(response => response.text())
      .then(result => {
        console.log(result);
        if(result == "VOC Deleted"){
          alert("삭제가 완료되었습니다.");
          navigation("/admin/voc/list");
        } else{
          alert("문제가 발생했습니다.");
          return false;
        }
      })
    }}

    // 답글 작성
    const handleVocReply = (e) => {
      e.preventDefault();
      
      // 답글 DTO 작성
      let replyForm = {
        reply: reply,
        vocId: voc.vocId
      };

      // 서버 요청
      fetch("//localhost:8080/reply/create",{
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "bearer " + token,
        },
        body: JSON.stringify(replyForm),
      }).then(response => response.text())
      .then(result => {
        console.log(result);
        if(result == "Reply created"){
          alert("Reply created");
          navigation('/admin/voc/list');
        } else {
          alert("작성 중 에러 발생");
        }
      })
    }

    // 답글 삭제
    const handleDeleteReply = (id) => {
      if(confirm("정말로 삭제하시겠습니까?")){
        fetch(`//localhost:8080/reply/delete/${id}`,{
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token,
          }
        })
        .then(response => response.text())
        .then(result => {
          console.log(result);
          if(result == "Reply deleted"){
            alert("삭제가 완료되었습니다.");
          } else {
            alert("삭제 과정 중 오류가 발생했습니다.");
          }
          window.location.reload();
        })
      }
    }

  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>1:1문의 상세보기</h1>
      </div>
      <Row className='p-5 justify-content-md-center'>
        <Col md="8">
          <Row className='p-2 bg-white mb-5'>
            <Table>
              <tbody>
                <tr>
                  <th>문의 식별자</th>
                  <td>{voc.vocId}</td>
                </tr>
                <tr>
                  <th>문의 제목</th>
                  <td>{voc.title}</td>
                </tr>
                <tr>
                  <th>문의 작성자</th>
                  <td>
                    {voc.writer}
                  </td>
                </tr>
                <tr>
                  <th>문의 작성일</th>
                  <td>{formatDate(voc.regDate)}</td>
                </tr>
                <tr>
                  <th>문의 내용</th>
                  <td>
                    <div dangerouslySetInnerHTML={{__html: voc.content}}/>
                  </td>
                </tr>
                <tr>
                  <th>답변 여부</th>
                  <td>{voc.reply ? "답변완료" : "답변대기"}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          {replyList.length > 0 ? (
            <Row className='p-2 bg-white mb-5'>
            <Accordion>
              {replyList.map((reply, index) => (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header>{formatDate(reply.regDate) + " 에 작성된 답글"}</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md="10">
                        <div dangerouslySetInnerHTML={{__html: reply.reply}}/>
                      </Col>
                      <Col md="2">
                        <Button variant='danger' style={{float: "right"}} onClick={() => handleDeleteReply(reply.id)}>삭제하기</Button>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Row>
          ) : null}
          <Row className='pt-5 pb-3'>
            <Col>
              <Button variant='primary' onClick={() => setWantReply(!wantReply)}>답글 작성하기</Button>
              <Button variant='danger' style={{float: "right", marginLeft: "10px"}} onClick={handleAdminVocDelete}>삭제하기</Button>
              <Link to="/admin/voc/list">
                <Button variant='primary' style={{float: "right"}}>목록으로</Button>
              </Link>
            </Col>
          </Row>
          {wantReply && (
            <Row className='mt-5 pt-5 pb-3 bg-white'>
            <Col>
              <Row className='pb-5'>
                <Col>
                  <h4>답변 작성하기</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form onSubmit={handleVocReply}>
                    <Form.Group as={Row} className='pb-3'>
                      <Form.Label column sm="2">답글</Form.Label>
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
                    setReply(data);
                  }}
                />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mt-5'>
                      <Col>
                        <Button variant='primary' type="submit" style={{float: "right"}}>등록하기</Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
          )}
        </Col>
      </Row>
    </main>
  );
};

export default AdminVocRead;