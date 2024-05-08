import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AdminAdminRead = () => {
  // useNavigate 설정
  const navigation = useNavigate();

  // params 설정
  const { adminId } = useParams();
  const [admin, setAdmin] = useState({});

  // 관리자 호출 요청
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // fetch()를 사용하여 서버로부터 데이터 요청
        const response = await fetch(`http://localhost:8080/admin/id/${adminId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();  // 응답 데이터를 JSON 형태로 파싱
        console.log(data);
        setAdmin(data);  // 상태 업데이트
      } catch (error) {
        console.error('Fetching users failed:', error);
      }
    };

    fetchUsers();
  },[]);

  // 관리자 삭제 요청
  const deleteAdmin = (e) => {
    fetch(`http://localhost:8080/admin/delete/${adminId}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
    }).then((result) => {
      return result.text();
    }).then((text) => {
      console.log(text);
      alert(text);
      navigation("/admin/admin/list");
    })
  }
  return (
    <main className="p-5">
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h1>관리자 정보 상세보기</h1>
        </div>
        <Row className='p-5 justify-content-md-center'>
          <Col md="8">
            <Row className='p-2 bg-white'>
              <Table>
                <tbody>
                  <tr>
                    <th style={{width: "20%", textAlign: "center"}}>식별번호</th>
                    <td>{admin.adminId}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>아이디</th>
                    <td>{admin.name}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>이름</th>
                    <td>{admin.nickname}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>연락처</th>
                    <td>{admin.phone}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>사원번호</th>
                    <td>{admin.employeeNo}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row className='pt-5'>
              <Col md="7"></Col>
              <Col md="5">
                <Link to={'/admin/admin/list'}>
                  <Button className='mx-5'>목록으로</Button>
                </Link>
                <Button variant='danger' onClick={deleteAdmin}>관리자 삭제하기</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </main>
  );
};

export default AdminAdminRead;