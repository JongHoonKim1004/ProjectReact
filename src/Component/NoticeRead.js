import React, { useEffect, useState } from 'react';
import { Button, Col, Container,  Row,  Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const NoticeRead = () => {
  // useParams
  const {id} = useParams();

  // useState
  const [notice, setNotice] = useState({});

  // 공지사항 호출
  useEffect(() => {
    const fetchNotice = async () => {
      try{
        const response = await fetch(`//localhost:8080/notice/read/${id}`);
        if(!response.ok){
          console.error("Network id not good");
        }

        const data = await response.json();
        console.log(data);
        setNotice(data);
      } catch(error) {
        console.error("Fetch Error");
      }

    }

    fetchNotice();
  },[]);
  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>공지사항</h1>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 고객센터 {`>`} 공지사항
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Container className='mt-4 bg-white'>
              <Row className="justify-content-md-center pt-4">
                <Col md="10" className='m-2'>
                  <Table>
                    <tbody>
                      <tr>
                        <th>공지사항 번호</th>
                        <td>{notice.id}</td>
                      </tr>
                      <tr>
                        <th>제목</th>
                        <td>{notice.title}</td>
                      </tr>
                      <tr>
                        <th>작성자</th>
                        <td>{notice.writer}</td>
                      </tr>
                      <tr>
                        <th>내용</th>
                        <td>
                          <div dangerouslySetInnerHTML={{__html: notice.content}}/>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row className='mt-3 pb-3 justify-content-md-center'>
                <Col md="10">
                  <Link to="/notice">
                    <Button variant='primary' style={{float: "right"}}>목록으로</Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default NoticeRead;