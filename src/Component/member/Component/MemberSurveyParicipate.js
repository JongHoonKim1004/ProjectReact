import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MemberSurveyParicipate = () => {
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>설문조사 목록</h1>
        <p>사업자 님의 모든 설문조사에 참여한 인원입니다</p>
      </div>
      <Row className="p-5">
        <Col>
          <Row  className="p-2">
            <Table className='bg-white'>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>참여자</th>
                  <th style={{width: "15%", textAlign: "center"}}>참여일</th>
                  <th style={{width: "15%", textAlign: "center"}}>최대 지급 포인트</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>
                      <Link to={`/member/survey/read/`} style={{textDecoration: "none" }}>
                        수요 조사
                      </Link>
                    </td>
                    <td>
                      SZHHUJIONEONINid
                    </td>
                    <td style={{textAlign: "center"}}>2024-05-09</td>
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

export default MemberSurveyParicipate;