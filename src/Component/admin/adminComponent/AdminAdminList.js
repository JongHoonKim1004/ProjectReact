import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminAdminList = () => {
  // 관리자 목록 state 설정
  const [adminList, setAdminList] = useState([]);

  // 서버 통신
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        // fetch()를 사용하여 서버로부터 데이터 요청
        const response = await fetch('http://localhost:8080/admin/list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();  // 응답 데이터를 JSON 형태로 파싱
        console.log(data);
        setAdminList(data);  // 상태 업데이트
      } catch (error) {
        console.error('Fetching users failed:', error);
      }
    };

    fetchAdmin();
  },[]);

  return (
    <div>
      <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>관리자 목록</h1>
      </div>
      <Row className="p-5">
        <Col>
          <Row  className="p-2">
            <Table className='bg-white'>
              <thead>
                <tr>
                  <th>아이디</th>
                  <th>이름</th>
                  <th>연락처</th>
                  <th>사원번호</th>
                </tr>
              </thead>
              <tbody>
                {adminList.map((admin, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/admin/admin/read/${admin.adminId}`} style={{textDecoration: "none", color: "#111"}}>
                        {admin.name}
                      </Link>
                    </td>
                    <td>{admin.nickname}</td>
                    <td>{admin.phone}</td>
                    <td>{admin.employeeNo}</td>
                  </tr>
                ))}
                
                
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
    </div>
  );
};

export default AdminAdminList;