import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminUsersList = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // fetch()를 사용하여 서버로부터 데이터 요청
        const response = await fetch('http://localhost:8080/users/list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();  // 응답 데이터를 JSON 형태로 파싱
        console.log(data);
        setUsersList(data);  // 상태 업데이트
      } catch (error) {
        console.error('Fetching users failed:', error);
      }
    };

    fetchUsers();
  },[]);
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>이용자 목록</h1>
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
                </tr>
              </thead>
              <tbody>
                {usersList.map((users, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/admin/users/read/${users.usersId}`} style={{textDecoration: "none", color: "#111"}}>
                        {users.name}
                      </Link>
                    </td>
                    <td>{users.nickname}</td>
                    <td>{users.phone}</td>
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
  );
};

export default AdminUsersList;