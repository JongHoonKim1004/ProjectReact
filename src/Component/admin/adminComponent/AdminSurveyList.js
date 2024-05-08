import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminSurveyList = () => {
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>설문조사 목록</h1>
      </div>
      <Row className='p-5'>
        <Col>
          <Row className='p-2'>
            <Table className='bg-white'>
              <thead>
                <tr>
                  <th>설문조사 제목</th>
                  <th>등록한 사업자</th>
                  <th>등록일</th>
                  <th>시작일</th>
                  <th>종료일</th>
                  <th>참여인원</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={'/admin/survey/read'} style={{textDecoration: "none", color: "#111"}}>
                      1
                    </Link>
                  </td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row>
            <Col md="10"></Col>
            <Col md="2"className='justify-content-end pt-3 pb-3' style={{display: "flex"}}>
              <Link to={'/admin'}>
                <Button variant='primary'>메인 페이지로</Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default AdminSurveyList;