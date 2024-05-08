import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AdminUsersRead = () => {
  // useNavigate 설정
  const navigation = useNavigate();

  // params 설정
  const { usersId } = useParams();
  const [user, setUser] = useState({});


  // 이용자 정보 요청
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // fetch()를 사용하여 서버로부터 데이터 요청
        const response = await fetch(`http://localhost:8080/users/read/${usersId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();  // 응답 데이터를 JSON 형태로 파싱
        console.log(data);
        setUser(data);  // 상태 업데이트
      } catch (error) {
        console.error('Fetching users failed:', error);
      }
    };

    fetchUsers();
  },[]);

  // 이용자 삭제 요청
  const deleteUsers = (e) => {
    fetch(`http://localhost:8080/users/delete/${usersId}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
    }).then((result) => {
      return result.text();
    }).then((text) => {
      console.log(text);
      alert(text);
      navigation("/admin/users/list");
    })
  }
  return (
    <div>
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
                    <td>{user.usersId}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>아이디</th>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>이름</th>
                    <td>{user.nickname}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>연락처</th>
                    <td>{user.phone}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>우편번호</th>
                    <td>{user.zipNo}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>기본주소</th>
                    <td>{user.addr}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>생년월일</th>
                    <td>{user.birth || "정보없음"}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>성별</th>
                    <td>{user.gender || "정보없음"}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>직업</th>
                    <td>{user.occupation || "정보없음"}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>결혼 여부</th>
                    <td>{user.married || "정보없음"}</td>
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
                <Button variant='danger' onClick={deleteUsers}>유저 삭제하기</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default AdminUsersRead;