import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Register_forms = () => {
  // 유저 정보 상태 설정
  const [username, setUsername] = useState("");
  const [usernameChecked, setUsernameChecked] = useState();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [zipNo, setZipNo] = useState();
  const [addr, setAddr] = useState();
  const [birth, setBirth] = useState(new Date());
  const [occupation, setOccupation] = useState();
  const [phone, setPhone] = useState();
  const [addrDetail, setAddrDetail] = useState();
  const [gender, setGender] = useState();
  const [married, setMarried] = useState();

  const handleMarried = (e) => {
    setMarried(e.target.value);
    console.log(e.target.value);
  }
  const handleGender = (e) => {
    setGender(e.target.value);
  }
  const handleAddrDetail = (e) => {
    setAddrDetail(e.target.value);
  }
  const handlePhone = (e) => {
    setPhone(e.target.value);
  }
  const handleUsername = (e) => {
    setUsername(e.target.value);
  }
  const handleName = (e) => {
    setName(e.target.value);
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

  const handleBirth = (date) => {
    setBirth(date);
    setFormattedBirth(formatBirth(date));
  }
  const handleOccupation = (e) => {
    setOccupation(e.target.value);
    console.log(occupation);
  }

  // 새로 연 창에서 데이터 받을 수 있도록 설정
  window.usernameCheck = (username) => {
    setUsernameChecked(username);
    console.log("Username Checked : ", username);
  }
  window.getAddr = (data) => {
    setAddr(data.address);
    setZipNo(data.zonecode);

    console.log(data);
  }

  // 생일 input 변경
  const formatBirth = (date) => {
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

    return [year, month, day].join('');
  }

  // DB로 전송 될 생일 정보
  const [formattedBirth,setFormattedBirth] = useState(formatBirth(new Date()));


  // 아이디 중복확인
  const idCheck = (e) => {
    
    if(username !== ""){
      window.open(`./idCheck?username=${username}`, "_blank", "width=700, height=500, left=100, top=100")
    } else {
      e.preventDefault();
      alert("아이디를 입력해주세요");
    }
    
  }

  // 다음 주소 API 호출
  const findZipNo = (e) => {
    window.open(`./addressSearch`,"_blank","width=700, height=500, left=100, top=100")
    
  }

  // navigate
  const navigate = useNavigate();

  // onSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let user = {
      name: username,
      nickname: name,
      password: password,
      phone: phone,
      zipNo: zipNo,
      addr: addr,
      addrDetail: addrDetail,
      birth: birth || null,
      gender: gender || null,
      occupation: occupation || null,
      married
    }

    try {
      const response = await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const text = await response.text();
      console.log(text);
      alert("등록이 정상적으로 되었습니다.");
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert("회원등록 중 오류가 발생했습니다: " + error.message);
    }
  }

  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>패널가입</h1>
              <p style={{ fontSize: "12px", fontWeight: "100" }}>
                회원가입을 위해 아래 이용약관과 개인정보 수집 및 이용에 대한
                안내를 읽고 동의해 주세요.
              </p>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 회원가입
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                아래의 정보를 정확하게 입력해주세요.
              </Form.Group>
              <Form.Group className='mb-2 pb-3' style={{borderBottom: "1px solid #d8d8d8", textAlign: "right"}}>
                * 표시는 필수 입력 사항입니다.
              </Form.Group>
              <Form.Group as={Row} className='mt-3 mb-3'>
                <Form.Label column sm="3">아이디 {`(`}이메일{`)`} {`*`}</Form.Label>
                <Col sm="9">
                  <Form.Control type='email' name="username" id="username" placeholder='example@example.com' value={username} onChange={handleUsername}/>
                </Col>
              </Form.Group>
              <Form.Group className='mb-5' as={Row}>
                <Col sm="3"></Col>
                <Col sm="9">
                  <Button variant='primary' onClick={idCheck}>중복 확인</Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3 mt-1'>
                <Form.Label column sm="3">이름 {`*`}</Form.Label>
                <Col sm="9">
                  <Form.Control name="name" id="name" value={name} onChange={handleName}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="3">비밀번호 {`*`}</Form.Label>
                <Col sm='9'>
                  <Form.Control name="password" type="password" id="password" value={password} onChange={handlePassword}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">비밀번호 확인 {`*`}</Form.Label>
                <Col sm="9">
                  <Form.Control name="password_check" type="password" id="password_check" value={passwordCheck} onChange={handlePasswordCheck}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="3">연락처 {`*`}</Form.Label>
                <Col sm="9">
                  <Form.Control name="phone" id="phone" value={phone} onChange={handlePhone}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3 pt-5'>
                <Form.Label column sm="3">우편번호 {`*`}</Form.Label>
                <Col sm="4">
                  <Form.Control name="zipNo" id="zipNo" value={zipNo} onChange={handleZipNo} readOnly/>
                </Col>
                <Col sm="5">
                  <Button variant='primary' onClick={findZipNo}>우편번호 찾기</Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="3">기본주소 {`*`}</Form.Label>
                <Col sm="9">
                  <Form.Control name="addr" id="addr" value={addr} onChange={handleAddr} readOnly/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="3">상세주소 {`*`}</Form.Label>
                <Col sm="9">
                  <Form.Control name="addrDetail" id="addrDetail" value={addrDetail} onChange={handleAddrDetail}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3 mt-2'>
                <Form.Label column sm="3" >생년월일</Form.Label>
                <Col sm="9">
                  <ReactDatePicker
                    dateFormat={'yyyy.MM.dd'} 
                    selected={birth} 
                    onChange={handleBirth} 
                    className="form-control"
                    maxDate={addDays(new Date(), 0)}/>
                  <Form.Control type='hidden' name="birth" id="birth" value={formattedBirth} readOnly/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="3">성별</Form.Label>
                <Col sm="4">
                  <Row>
                    <Col>
                      <Form.Check type={"radio"} name="gender" value="male" label={"남자"} checked={gender === 'male'} onChange={handleGender}/>
                    </Col>
                    <Col>
                      <Form.Check type={"radio"} name="gender" value="female" label={"여자"} checked={gender === 'female'} onChange={handleGender}/>
                    </Col>
                  </Row>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="3">결혼 여부</Form.Label> 
                <Col sm="6">
                  <Row>
                    <Col>
                      <Form.Check type='radio' value="married" name="married" label="기혼" checked={married === 'married'} onChange={handleMarried}/>
                    </Col>
                    <Col>
                      <Form.Check type="radio" value="unmarried" name="married" label="미혼" checked={married === 'unmarried'} onChange={handleMarried}/>
                    </Col>
                    <Col>
                      <Form.Check type="radio" value="divorce" name="married" label="이혼/사별" checked={married === 'divorce'} onChange={handleMarried}/>
                      {/* divorce = 이혼 */}
                    </Col>
                  </Row>
                </Col>               
              </Form.Group>
              <Form.Group as={Row} className='mb-5'>
                <Form.Label column sm="3">직업</Form.Label>
                <Col sm="3">
                  <Form.Select aria-label="직업" value={occupation} onChange={handleOccupation}>
                    <option>선택</option>
                    <option value="전문직">전문직</option>
                    <option value="경영직">경영직</option>
                    <option value="사무직">사무직</option>
                    <option value="서비스/영업/판매직">서비스/영업/판매직</option>
                    <option value="생산/기술직/노무직">생산/기술직/노무직</option>
                    <option value="교사/학원강사">교사/학원강사</option>
                    <option value="공무원(공기업 포함)">공무원(공기업 포함)</option>
                    <option value="학생">학생</option>
                    <option value="전업주부">전업주부</option>
                    <option value="농/임/어업">임</option>
                    <option value="자영업">자영업</option>
                    <option value="자유직/프리랜서">자유직/프리랜서</option>
                    <option value="무직">무직</option>
                    <option value="기타">기타</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Row className='pt-5 justify-content-md-center'>
                <Col sm="4">
                  <Button type="submit" variant='primary' size="lg">회원가입하기</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default Register_forms;