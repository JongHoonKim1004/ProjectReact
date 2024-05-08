import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNotiveRead = () => {

  // 공지사항 삭제하기
  const deleteNotice = () => {

  }
  return (
    <main className="p-5">
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h1>이용자 정보 상세보기</h1>
        </div>
        <Row className='p-5 justify-content-md-center'>
          <Col md="8">
            <Row className='p-2 bg-white'>
              <Table>
                <tbody>
                  <tr>
                    <th style={{width: "20%", textAlign: "center"}}>식별번호</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>제목</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>작성자</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>작성일</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>수정일</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>조회수</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>내용</th>
                    <td></td>
                  </tr>
                  
                </tbody>
              </Table>
            </Row>
            <Row className='pt-5'>
              <Col md="7"></Col>
              <Col md="5">
                <Link to={'/admin/users/list'}>
                  <Button className='mx-5'>목록으로</Button>
                </Link>
                <Button variant='danger' onClick={deleteNotice}>유저 삭제하기</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </main>
  );
};

export default AdminNotiveRead;