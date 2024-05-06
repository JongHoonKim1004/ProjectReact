import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';


const UsernameCheck = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // 쿼리스트링의 아이디 추출
    const query = new URLSearchParams(window.location.search);
    const keyword = query.get("username");
    setUsername(keyword);

    // 추출한 아이디를 DB를 통해 검색하여 결과를 받음
  },[])
  
  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  // 중복된 아이디 존재시 다시 아이디 확인
  const changeIdCheck = (e) => {

  }

  // 아이디 사용 확인
  const usernameOk = (username) => {
    if(window.opener && !window.opener.closed){
      window.opener.usernameCheck(username);
      window.close();
    }
  }

  return (
    <div>
      <div style={{ backgroundColor: "RGB(240, 240, 240)", width: "700px", height: "500px" }}>
        <Row className='p-5'>
          <Col>
            <Row className='p-5 pt-2 pb-2' style={{justifyContent: "center"}}>입력하신 아이디는 사용할 수 있습니다</Row>
            <Row className='p-5 pt-2 pb-2' style={{justifyContent: "center"}}>입력하신 아이디는 사용할 수 없습니다</Row>
            <Row className='p-5' style={{justifyContent: "center"}}>
              <Col sm="10">
                <Row style={{justifyContent: "center"}}>
                  <Col sm="6">
                    <Form.Control type='text' name="username" value={username} onChange={handleUsername}/>
                  </Col>  
                  <Col sm="4">
                    <Button varinat="secondary" onClick={changeIdCheck} size='sm'>중복 확인</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='p-5 pt-2' style={{justifyContent: "center"}}>
              <Col sm="3">
                <Button variant='primary' onClick={() => usernameOk(username)} size='sm'>사용하기</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UsernameCheck;