import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const MyVoc = () => {
  // useNavigate
  const navigation = useNavigate();

  // redux 
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);

  // useState
  const [vocList, setVocList] = useState([]);


  // 나의 문의 목록 호출
  useEffect(() => {
    // 마이페이지 접근 제한
    if(token == null){
      alert("로그인 후 이용할 수 있습니다");
      navigation('/login');
    }

    if(token != null && user == null){
      alert("일반회원만 이용 가능합니다");
      navigation('/');
    }


    const fetchVoc = async () => {
      try{
        const response = await fetch(`//localhost:8080/voc/list/${user.name}`);
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.json();
        console.log(data);
        setVocList(data);
      } catch(error){
        console.error("Fetch Failed");
      }
    }

    fetchVoc();
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
              <h1 style={{ fontWeight: "650" }}>내 1:1 문의</h1>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 마이페이지 {`>`} 내 1:1 문의
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Row >
              <Col md="9"></Col>
              <Col md="3">
                <Link to="/voc">
                  <img alt="go to voc" src="img/mysurvey/myQnaBt_170x45.gif"/>
                </Link>
              </Col>
            </Row>
            <div className='container mt-4' style={{backgroundColor: "white"}}>
              <Row className="justify-content-md-center pt-4">
                <Col md="12" className='m-2'>
                  <Table borderless>
                    <thead >
                      <tr>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>제목</th>
                        <th style={{borderRight: "1px solid #d8d8d8", backgroundColor: "RGB(3, 131, 206)", color: "white"}}>작성일</th>
                        <th style={{backgroundColor: "RGB(3, 131, 206)", color: "white"}}>답변 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vocList.map((voc, index) => (
                        <tr style={{borderTop: "1px solid #d8d8d8"}} key={index}>
                          <td>
                            <Link to={"/myVoc/read/" + voc.vocId} style={{textDecoration: "none"}}>
                              {voc.title}
                            </Link>
                          </td>
                          <td></td>
                          <td>{voc.reply == 1 ? "답변완료" : "답변대기"}</td>
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

export default MyVoc;