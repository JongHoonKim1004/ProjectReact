import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const AdminMemberRead = () => {
  // useNavigate 설정
  const navigation = useNavigate();

  // 사업자 정보 state 설정
  const { memberId } = useParams();
  const [member, setMember] = useState({});

  // 사업자 정보 호출
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // fetch()를 사용하여 서버로부터 데이터 요청
        const response = await fetch(`http://localhost:8080/member/read/${memberId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();  // 응답 데이터를 JSON 형태로 파싱
        console.log(data);
        setMember(data);  // 상태 업데이트
      } catch (error) {
        console.error('Fetching member failed:', error);
      }
    };

    fetchUsers();
  },[]);

  // 사업자 삭제 요청
  const deleteMember = (e) => {
    fetch(`http://localhost:8080/member/delete/${memberId}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
    }).then((result) => {
      return result.text();
    }).then((text) => {
      console.log(text);
      alert(text);
      navigation("/admin/member/list");
    })
  }
  
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>사업자 정보 상세보기</h1>
      </div>
      <Row className="p-5 justify-content-md-center">
        <Col md="8">
          <Row className="p-2 bg-white">
            <Table>
              <tbody>
                <tr>
                  <th style={{ width: "20%", textAlign: "center" }}>
                    식별번호
                  </th>
                  <td>{member.memberId}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>아이디</th>
                  <td>{member.name}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>상호명</th>
                  <td>{member.nickname}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>우편번호</th>
                  <td>{member.zipNo}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>기본주소</th>
                  <td>{member.addr}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>상세주소</th>
                  <td>{member.addrDetail}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>연락처</th>
                  <td>{member.phone}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>설립일</th>
                  <td>{member.estDate}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>사업자등록번호</th>
                  <td>{member.compNo}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row className="pt-5">
            <Col md="7"></Col>
            <Col md="5">
              <Link to={"/admin/member/list"}>
                <Button className="mx-5">목록으로</Button>
              </Link>
              <Button variant="danger" onClick={deleteMember}>사업자 삭제하기</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default AdminMemberRead;
