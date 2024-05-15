import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';


const UsernameCheck = () => {
  const [username, setUsername] = useState('');
  const [canUse, setCanUse] = useState(null);
  
  useEffect(() => {
    const checkUsernameAvailability = async () => {
      const query = new URLSearchParams(window.location.search);
      const keyword = query.get("username");
      setUsername(keyword);

      if (keyword) {
        try {
          const response = await fetch(`http://localhost:8080/userCheck/${keyword}`);
          const data = await response.json(); // Assuming the server returns JSON
          console.log(data);
          setCanUse(data);
        } catch (error) {
          console.error('Error fetching username check:', error);
          setCanUse(false);
        }
      }
    };

    checkUsernameAvailability();
  },[])
  
  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  // 중복된 아이디 존재시 다시 아이디 확인
  const changeIdCheck = (e) => {
    if (username) {
      fetch(`http://localhost:8080/userCheck/${username}`)
        .then(result => result.json())
        .then(data => {
          console.log(data);
          setCanUse(data);
        })
        .catch(error => {
          console.error('Error fetching username check:', error);
          setCanUse(false);
        });
    }
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
          <Row className='p-5 pt-2 pb-2' style={{justifyContent: "center"}}>{canUse === null ? "Checking..." : canUse ? "입력하신 아이디는 사용할 수 있습니다" : "입력하신 아이디는 사용할 수 없습니다"}</Row>
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
          {canUse && (
            <Row className='p-5 pt-2' style={{justifyContent: "center"}}>
              <Col sm="3">
                <Button variant='primary' onClick={() => usernameOk(username)} size='sm'>사용하기</Button>
              </Col>
            </Row>
          )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UsernameCheck;