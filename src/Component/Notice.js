import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Notice = () => {
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
            
            <div className='container mt-4' style={{backgroundColor: "white"}}>
              <Row className="justify-content-md-center pt-4">
                <Col md="12" className='m-2'>
                  <Table borderless>
                    <thead >
                      <tr>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>#</th>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>제목</th>
                        <th style={{backgroundColor: "RGB(3, 131, 206)", color: "white"}}>작성일</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{borderTop: "1px solid #d8d8d8"}}>
                        <td>1</td>
                        <td>
                          <Link to={'/notice/1'} style={{color: "black", textDecoration: "none"}}>
                            공지사항 제목
                          </Link>
                        </td>
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

export default Notice;