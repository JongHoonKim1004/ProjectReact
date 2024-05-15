import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminMemberList = () => {
  // 사업자 목록 state 설정
  const [memberList, setMemberList] = useState([]);

  // 서버에서 사업자 목록 호출
  useEffect(() => {
    const fetchMember = async () => {
      try {
        // fetch()를 사용하여 서버로부터 데이터 요청
        const response = await fetch('http://localhost:8080/member/list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();  // 응답 데이터를 JSON 형태로 파싱
        console.log(data);
        setMemberList(data);  // 상태 업데이트
      } catch (error) {
        console.error('Fetching member failed:', error);
      }
    };

    fetchMember();
  },[]);
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>사업자 목록</h1>
      </div>
      <Row className="p-5">
        <Col>
          <Row  className="p-2">
            <Table className='bg-white'>
              <thead>
                <tr>
                  <th>아이디</th>
                  <th>상호명</th>
                  <th>연락처</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/admin/member/read/${member.memberId}`} style={{textDecoration: "none", color: "#111"}}>
                        {member.name}
                      </Link>
                    </td>
                    <td>{member.nickname}</td>
                    <td>{member.phone}</td>
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

export default AdminMemberList;