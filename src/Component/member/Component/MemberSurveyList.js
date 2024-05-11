import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MemberSurveyList = () => {
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>설문조사 목록</h1>
      </div>
      <Row className="p-5">
        <Col>
          <Row  className="p-2">
            <Table className='bg-white'>
              <thead>
                <tr>
                  <th>제목</th>
                  <th style={{width: "20%"}}>등록일</th>
                  <th style={{width: "15%", textAlign: "center"}}>최소 지급 포인트</th>
                  <th style={{width: "15%", textAlign: "center"}}>최대 지급 포인트</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>
                      <Link to={`/member/survey/read/`} style={{textDecoration: "none" }}>
                        2
                      </Link>
                    </td>
                    <td>
                      2024-05-09
                    </td>
                    <td style={{textAlign: "center"}}>30</td>
                    <td style={{textAlign: "center"}}>200</td>
                  </tr>
              </tbody>
            </Table>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default MemberSurveyList;