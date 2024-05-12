import { addDays } from 'date-fns';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';


const AdminMemberCreate = () => {
  const navigation = useNavigate();

  // 사업자 정보 state 설정
  const [name, setName] = useState();
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [zipNo, setZipNo] = useState();
  const [addr, setAddr] = useState();
  const [addrDetail, setAddrDetail] = useState();
  const [phone, setPhone] = useState();
  const [estDate, setEstDate] = useState(new Date());
  const [compNo, setCompNo] = useState();

    
  // onChan function
  const handelName = (e) => {
    setName(e.target.value);
  }
  const handleNickname = (e) => {
    setNickname(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  }
  const handleZipNo = (e) => {
    setZipNo(e.target.value);
  }
  const handleAddr = (e) => {
    setAddr(e.target.value);
  }
  const handleAddrDetail = (e) => {
    setAddrDetail(e.target.value);
  }
  const handlePhone = (e) => {
    setPhone(e.target.value);
  }
  const handleEstDate = (date) => {
    setEstDate(date);
    setFormattedDate(formatDate(date));
  }
  const handleCompNo = (e) => {
    setCompNo(e.target.value);
  }
  const handleFormattedDate = (e) => {
    setFormattedDate(e.target.value);
  }
  const handleNameChecked = (e) => {
    setNameChecked(e.target.value);
  }


    // 새로 연 창에서 데이터 받을 수 있도록 설정
    window.usernameCheck = (name) => {
      setNameChecked(name);
      console.log("Username Checked : ", name);
    }
    window.getAddr = (data) => {
      setAddr(data.address);
      setZipNo(data.zonecode);
  
      console.log(data);
    }
  
    // 설립일 input 변경
    const formatDate = (date) => {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = '' + d.getFullYear();
  
      if(month.length < 2){
        month = '0' + month;
      }
      if(day.length < 2){
        day = '0' + day;
      }
  
      return [year, month, day].join('-');
    }
  

  
    // 아이디 중복확인
    const idCheck = (e) => {
      
      if(name !== undefined){
        window.open(`http://localhost:3000/idCheck?username=${name}`, "_blank", "width=700, height=500, left=100, top=100")
      } else {
        e.preventDefault();
        alert("아이디를 입력해주세요");
      }
      
    }
  
    // 다음 주소 API 호출
    const findZipNo = (e) => {
      window.open(`http://localhost:3000/addressSearch`,"_blank","width=700, height=500, left=100, top=100")
      
    }

    // DB로 전송 될 생일 정보
  const [formattedDate, setFormattedDate] = useState(formatDate(new Date()));
  const [nameChecked, setNameChecked] = useState();


  
  // 서버 요청 함수
  const handleSubmit = (e) => {
    if(name == null || nickname == null || password == null || passwordCheck == null || zipNo == null || addr == null || addrDetail == null || phone == null || formattedDate == null || compNo == null){
      alert("빈 칸을 채워주세요");
      return false;
    }
    if(password != passwordCheck){
      alert("비밀번호가 일치하지 않습니다");
      return false;
    }

    const member = {
      name : name,
      nickname : nickname,
      password: password,
      zipNo : zipNo,
      addr : addr,
      addrDetail : addrDetail,
      phone : phone,
      estDate : formattedDate,
      compNo : compNo
    }

    // 사업자 생성 요청 
    fetch("http://localhost:8080/member/create",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member)
    }).then((result) => {
      return result.text();
    }).then((text) => {
      console.log(text);
      alert(text);
      navigation("/admin/member/list");
    })
  }
  return (
    <main>
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>새 사업자 생성</h1>
      </div>
      <Row className='p-5 justify-content-md-center'>
        <Col md="8">
          <Form className='bg-white p-5' method="post">
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">아이디</Form.Label>
              <Col sm="5">
                <Form.Control type="text" name="name" id="name" value={name} onChange={handelName}/>
                <input type="hidden" name="nameChecked" id="nameChecked" value={nameChecked} onChange={handleNameChecked}/>
              </Col>
              <Col sm="5">
                <Button variant='primary' onClick={idCheck}>중복 확인</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">이름</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="nickname" id="nickname" value={nickname} onChange={handleNickname}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">비밀번호</Form.Label>
              <Col sm="10">
                <Form.Control type="password" name="password" id="password" value={password} onChange={handlePassword}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">비밀번호 확인</Form.Label>
              <Col sm="10">
                <Form.Control type="password" name="passwordCheck" id="passwordCheck" value={passwordCheck} onChange={handlePasswordCheck}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">우편번호</Form.Label>
              <Col sm="5">
                <Form.Control type="text" name="zipNo" id="zipNo" value={zipNo} onChange={handleZipNo} readOnly/>
              </Col>
              <Col sm="5">
                <Button variant='primary' onClick={findZipNo}>우편번호 찾기</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">기본주소</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="addr" id="addr" value={addr} onChange={handleAddr} readOnly/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">상세주소</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="addrDetail" id="addrDetail" value={addrDetail} onChange={handleAddrDetail}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">연락처</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="phone" id="phone" value={phone} onChange={handlePhone}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">설립일</Form.Label>
              <Col sm="10">
                <ReactDatePicker
                    dateFormat={'yyyy.MM.dd'} 
                    selected={estDate} 
                    onChange={handleEstDate} 
                    className="form-control"
                    maxDate={addDays(new Date(), 0)}/>
                
                <Form.Control type="hidden" name="formattedDate" id="formattedDate" value={formattedDate} onChange={handleFormattedDate}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="2">사업자등록번호</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="compNo" id="compNo" value={compNo} onChange={handleCompNo}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm="10"></Form.Label>
              <Col sm="2">
                <Button variant='primary' type='button' onClick={handleSubmit}>등록하기</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </main>
  );
};

export default AdminMemberCreate;