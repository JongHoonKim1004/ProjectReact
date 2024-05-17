import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const MyPointLog = () => {
  // useNavigate
  const navigation = useNavigate();

  // redux
  const { user, userPoint, token} = useSelector(state => state.auth);

  // useState
  const [logList, setLogList] = useState([]);

  // 화면 호출시 초기 작업
  useEffect(() => {
    // 회원 확인 작업
    if(token == null){
      alert("로그인 후 이용 가능합니다.");
      navigation('/login');
    } else if(token != null && user == null){
      alert("일반 회원만 이용 가능합니다");
      navigation('/');
    }

    // 회원 확인 후에는 이력 호출
    const fetchMyPointLog = async () => {
      try{
        const response = await fetch(`//localhost:8080/users/pointlog/list/${user.usersId}`);
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.json();
        console.log(data);
        setLogList(data);
      } catch(error){
        console.error("Fetch Failed in MyPoint Log");
      }

    }

    fetchMyPointLog();
  },[]);

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

  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>포인트 관리</h1>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 마이페이지 {`>`} 포인트 관리
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <p
              style={{
                fontWeight: "550",
                fontSize: "20px",
                marginBottom: "5px",
              }}
            >
              포인트 적립 내역
            </p>
            <p style={{ fontSize: "12px", lineHeight: "12px" }}>
              패널회원 여러분의 포인트 적립 내역을 확인하는 곳 입니다.
            </p>
            <div className='container' style={{backgroundColor: "white"}}>
              <Row className="justify-content-md-center pt-4">
                <Col md="12" className='m-2'>
                  <Table borderless>
                    <thead >
                      <tr>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>#</th>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>조사명</th>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>적립금</th>
                        <th style={{backgroundColor: "RGB(3, 131, 206)", color: "white"}}>적립일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logList.map((log, index) => (
                        <tr style={{borderTop: "1px solid #d8d8d8"}} key={index}>
                          <td>{log.logId}</td>
                          <td>{log.changeType}</td>
                          <td>{log.pointChange}</td>
                          <td>{formatDate(log.changeDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row className='pt-3 pb-3'>
                <Link to="/myPoint">
                  <Button variant='primary' size='sm'>이전 페이지로</Button>
                </Link>
              </Row>
            </div>  
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>  
    </div>
  );
};

export default MyPointLog;