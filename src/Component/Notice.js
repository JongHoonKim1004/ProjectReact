import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Notice = () => {
  // useState
  const [noticeList, setNoticeList] = useState([]);

  // 공지사항 목록 호출
  useEffect(() => {
    const fetchNotice = async () => {
      try{
        const response = await fetch("//localhost:8080/notice/list");
        if(!response.ok){
          console.error("Network is not goot");
        }

        const data = await response.json();
        console.log(data);
        setNoticeList(data);
      }catch(error){
        console.error("Fetch Error", error);
      }
    }

    fetchNotice();
  },[]);

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

  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>공지사항</h1>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 고객센터 {`>`} 공지사항
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            
            <div className='container mt-4' style={{backgroundColor: "white"}}>
              <Row className="justify-content-md-center pt-4">
                <Col md="12" className='m-2'>
                  <Table borderless>
                    <thead >
                      <tr>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>#</th>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>제목</th>
                        <th style={{backgroundColor: "RGB(3, 131, 206)", color: "white"}}>작성일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {noticeList.map((notice, index) => (
                        <tr style={{borderTop: "1px solid #d8d8d8"}} key={index}>
                          <td>{notice.id}</td>
                          <td>
                            <Link to={'/notice/read/' + notice.id} style={{color: "black", textDecoration: "none"}}>
                            {notice.title}
                            </Link>
                          </td>
                          <td>{formatDate(notice.regDate)}</td>
                        </tr>
                      ))}
                      
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>  
    </div>
  );
};

export default Notice;