import { addDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../authSlice";

const MyInfo = () => {
  // useNavigate
  const navigation = useNavigate();

  // redux 설정
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);

  // 접근 전 일반회원 확인
  useEffect(() => {
    if(token == null){
      alert("로그인 후 이용 가능합니다");
      navigation('/login');
    }
    if(token != null && user == null){
      alert("일반 회원만 이용 가능합니다");
      navigation('/');
    }
  },[]);

  // 유저 정보 상태 설정
  const [username, setUsername] = useState(user ? user.name : null);
  const [name, setName] = useState(user ? user.nickname : null);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [zipNo, setZipNo] = useState(user ? user.zipNo : null);
  const [addr, setAddr] = useState(user ? user.addr : null);
  const [birth, setBirth] = useState(user ? user.birth :  new Date());
  const [occupation, setOccupation] = useState(user ? user.occupation : null);
  const [phone, setPhone] = useState(user ? user.phone : null);
  const [addrDetail, setAddrDetail] = useState(user ? user.addrDetail : null);
  const [gender, setGender] = useState(user ? user.gender : null);
  const [married, setMarried] = useState(user ? user.married : null);

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


  // 다음 주소 API 호출
  const findZipNo = (e) => {
    window.open(`./addressSearch`,"_blank","width=700, height=500, left=100, top=100")
    
  }


  // onSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력 검증
    if(username == null || name == null || password == null || passwordCheck == null || phone == null || zipNo == null || addr == null || addrDetail == null){
      alert("입력되지 않은 부분이 있습니다.");
      return false;
    }
    if(password != passwordCheck){
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }

    let users = {
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
      const response = await fetch(`http://localhost:8080/users/update/${user.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const text = await response.text();
      console.log(text);
      alert("변경이 정상적으로 되었습니다.");
      dispatch(setUser(users));
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert("정보 변경 중 오류가 발생했습니다: " + error.message);
    }
  }

  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>내 정보 관리</h1>
              <p style={{ fontSize: "12px", fontWeight: "100" }}>
                정확한 정보를 입력하셔야 조사 참여의 기회가 주어집니다
              </p>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 마이페이지 {`>`} 내 정보 관리
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Form onSubmit={handleSubmit} className="bg-white px-5 pt-3 pb-3">
              
              <Form.Group className='mb-2 pb-3' style={{borderBottom: "1px solid #d8d8d8", textAlign: "right"}}>
                * 표시는 필수 입력 사항입니다.
              </Form.Group>
              <Form.Group as={Row} className='mt-3 mb-3'>
                <Form.Label column sm="3">회원번호</Form.Label>
                <Col sm="9">
                  <Form.Control type='text' name="usersId" id="usersId" readOnly plaintext value={user ? user.userId : null} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mt-3 mb-3'>
                <Form.Label column sm="3">아이디 {`(`}이메일{`)`} {`*`}</Form.Label>
                <Col sm="9">
                  <Form.Control type='email' name="username" id="username" placeholder='example@example.com' readOnly plaintext value={username}/>
                </Col>
              </Form.Group>
              
              <Form.Group as={Row} className='mb-3 mt-1'>
                <Form.Label column sm="3">이름 {`*`}</Form.Label>
                <Col sm="9">
                  <Form.Control name="name" id="name" readOnly plaintext value={name}/>
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
                <Col sm="4" className="d-grid">
                  <Button type="submit" variant='primary' size="lg">정보 수정하기</Button>
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

export default MyInfo;
