import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyVoc = () => {
  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>내 1:1 문의</h1>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 마이페이지 {`>`} 내 1:1 문의
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Row >
              <Col md="9"></Col>
              <Col md="3">
                <Link to="/voc">
                  <img alt="go to voc" src="img/mysurvey/myQnaBt_170x45.gif"/>
                </Link>
              </Col>
            </Row>
            <div className='container mt-4' style={{backgroundColor: "white"}}>
              <Row className="justify-content-md-center pt-4">
                <Col md="12" className='m-2'>
                  <Table borderless>
                    <thead >
                      <tr>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>#</th>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>조사명</th>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>응답 날짜</th>
                        <th style={{backgroundColor: "RGB(3, 131, 206)", color: "white"}}>답변 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{borderTop: "1px solid #d8d8d8"}}>
                        <td>1</td>
                        <td>패널 대상 조사</td>
                        <td>2024.04.26</td>
                        <td>답변완료</td>
                      </tr>
                      <tr style={{borderTop: "1px solid #d8d8d8"}}>
                        <td>1</td>
                        <td>패널 대상 조사</td>
                        <td>2024.04.26</td>
                        <td>답변대기</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>  
    </div>
  );
};

export default MyVoc;