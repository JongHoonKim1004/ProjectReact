import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminSurveyRead = () => {
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>설문조사 상세보기</h1>
      </div>
      <Row className='p-5 justify-content-md-center'>
        <Col md="8">
          <Row className='p-2 bg-white'>
            <Table>
              <tbody>
                <tr>
                  <th style={{width: "15%", textAlign: "center"}}>식별번호</th>
                  <td></td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>설문조사 제목</th>
                  <td></td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>등록한 사업자</th>
                  <td></td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>설문조사 설명</th>
                  <td></td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>설문조사 등록일</th>
                  <td></td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>설문조사 시작일</th>
                  <td></td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>설문조사 종료일</th>
                  <td></td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>최대 지급 포인트</th>
                  <td></td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>최소 지급 포인트</th>
                  <td></td>
                </tr>
                <tr>
                  <th style={{textAlign: "center"}}>참여 인원</th>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row className='pt-5'>
            <Col md="9"></Col>
            <Col md="3">
              <Link to={'/admin/survey/list'}>
                <Button className='mx-3'>목록으로</Button>
              </Link>
              <Button variant='danger'>삭제하기</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default AdminSurveyRead;