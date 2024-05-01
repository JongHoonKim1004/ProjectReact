import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';

const MySurvey = () => {
  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>조사관리</h1>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 마이페이지 {`>`} 조사 관리
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <p
              style={{
                fontWeight: "550",
                fontSize: "20px",
                marginBottom: "5px",
              }}
            >
              참여하신 조사
            </p>
            <p style={{ fontSize: "12px", lineHeight: "12px" }}>
              내가 참여한 조사 목록입니다. 참여 조사에 관한 결과까지 한눈에 알아보자!
            </p>
            <div className='container' style={{backgroundColor: "white"}}>
              <Row className="justify-content-md-center pt-4">
                <Col md="12" className='m-2'>
                  <Table borderless>
                    <thead >
                      <tr>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>#</th>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>조사명</th>
                        <th style={{backgroundColor: "RGB(3, 131, 206)", color: "white"}}>응답 날짜</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{borderTop: "1px solid #d8d8d8"}}>
                        <td>1</td>
                        <td>패널 대상 조사</td>
                        <td>2024.04.26</td>
                      </tr>
                      <tr style={{borderTop: "1px solid #d8d8d8"}}>
                        <td>1</td>
                        <td>패널 대상 조사</td>
                        <td>2024.04.26</td>
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

export default MySurvey;