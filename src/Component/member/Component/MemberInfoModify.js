import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MemberInfoModify = () => {
  // useNavigate 설정
  const navigation = useNavigate();

  // state 설정
  const [memberId, setMemberId] = useState("");
  const [name, setName] = useState("");
  const [compNo, setCompNo] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck,setPasswordCheck] = useState("");
  const [phone, setPhone] = useState("");
  const [zipNo, setZipNo] = useState("");
  const [addr, setAddr] = useState("");
  const [addrDetail, setAddrDetail] = useState("");

  // 본인 정보 호출 후 state 에 저장
  

  // 제출 요청 처리
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>회원 정보 변경</h1>
      </div>
      <Row className="p-5 justify-content-md-center">
        <Col md="8">
          <Form className="p-5 bg-white" onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">식별번호</Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly value={memberId}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">아이디</Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly value={name}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">사업자명</Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly value={nickname}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">사업자등록번호</Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly value={compNo}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">비밀번호</Form.Label>
              <Col sm="10">
                <Form.Control name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">비밀번호 확인</Form.Label>
              <Col sm="10">
                <Form.Control name="passwordCheck" type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">연락처</Form.Label>
              <Col sm="10">
                <Form.Control name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">우편번호</Form.Label>
              <Col ms="4">
                <Form.Control name="zipNo" value={zipNo} onChange={(e) => setZipNo(e.target.value)} readOnly/>
              </Col>
              <Col sm="6">
                <Button variant="primary" >우편번호 찾기</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">기본주소</Form.Label>
              <Col sm="10">
                <Form.Control name="addr" value={addr} onChange={(e) => setAddr(e.target.value)} readOnly/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">상세주소</Form.Label>
              <Col sm="10">
                <Form.Control name="addrDetail" value={addrDetail} onChange={(e) => setAddrDetail(e.target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 pt-5">
              <Col sm="10"></Col>
              <Col sm="2">
                <Button variant="warning" type="submit">수정하기</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </main>
  );
};

export default MemberInfoModify;
