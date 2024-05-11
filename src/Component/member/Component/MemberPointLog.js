import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MemberPointLog = () => {
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>포인트 변경 이력</h1>
      </div>
      <Row className="p-5 justify-content-md-center">
        <Col md="8">
          <Row  className="p-2">
            <Table className='bg-white'>
              <thead>
                <tr>
                  <th>이력 번호</th>
                  <th>변경 사유</th>
                  <th>포인트 변동</th>
                  <th>변경 시간</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>4</td>
                    <td>3</td>
                    <td>2</td>
                    <td>1</td>
                  </tr>
              </tbody>
            </Table>
          </Row>
          <Row className='pt-2 pb-3'>
            <Col md="9"></Col>
            <Col>
              <Link to="/member/point/charge">
                <Button variant='primary'>포인트 충전하기</Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </main>  
  );
};

export default MemberPointLog;