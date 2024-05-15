import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const MemberPointLog = () => {
  // useNavigate
  const navigation = useNavigate();

  // redux
  const { member, memberPoint } = useSelector(state => state.auth); 

  // useState
  const [logList, setLogList] = useState([]);

  // 날짜 input 변경
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

  // 사업자 포인트 이력 호출
  useEffect(() => {
    const fetchLog = async () => {
      try{
        const response = await fetch(`//localhost:8080/member/pointlog/list/${member.memberId}`);
        if(!response.ok){
          console.error("Network is not good");
        }
        const data = await response.json();
        console.log(data);
        setLogList(data);
      }catch(error){
        console.error('Fetching Log failed:', error);

      }
    }

    fetchLog();
  },[]);

  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>포인트 변경 이력</h1>
      </div>
      <Row className="p-5 justify-content-md-center">
        <Col md="8">
          <Row  className="p-2">
            <Table className='bg-white'>
              <thead>
                <tr>
                  <th>이력 번호</th>
                  <th>변경 사유</th>
                  <th>포인트 변동</th>
                  <th>변경 시간</th>
                </tr>
              </thead>
              <tbody>
                {logList.map((log, index) => (
                  <tr key={index}>
                    <td>{log.logId}</td>
                    <td>{log.changeType}</td>
                    <td>{log.pointChange}</td>
                    <td>{formatDate(log.changeDate)}</td>
                  </tr>
                ))}
                  
              </tbody>
            </Table>
          </Row>
          <Row className='pt-2 pb-3'>
            <Col md="9"></Col>
            <Col>
              <Link to="/member/point/charge">
                <Button variant='primary' style={{float: "right"}}>포인트 충전하기</Button>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col md="2"></Col>
      </Row>
    </main>  
  );
};

export default MemberPointLog;