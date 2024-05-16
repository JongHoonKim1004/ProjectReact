import { formatDate } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const MyVocRead = () => {
  // useNavigate
  const navigation = useNavigate();

  // useParams
  const {vocId} = useParams();

  // redux
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);

  // useState
  const [voc, setVoc] = useState({});
  const [replyList, setReplyList] = useState([]);

  // 문의 및 답글 호출
  useEffect(() => {
    // 호출 이전에 유저인지 확인
    if(token == null){
      alert("로그인 후 이용해주세요");
      navigation('/login');
    }
    if(token != null && user == null){
      alert("일반회원만 이용 가능합니다");
      navigation('/');
    }

    // 확인 되면 호출
    const fetchData = async () => {
      try {
        const response1 = await fetch(`//localhost:8080/voc/one/${vocId}`);
        if (!response1.ok) {
          console.error("Network is not good");
          return;
        }

        const data1 = await response1.json();

        console.log("data1: ", data1);

        setVoc(data1.voc);
        setReplyList(data1.reply);
      } catch (error) {
        console.error("Fetch Error", error);
      }
    };

    fetchData();
  },[]);

  // 생일 input 변경
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

    return [year, month, day].join('');
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
            <Container className='mt-4 bg-white'>
              <Row className="justify-content-md-center pt-4">
                <Col md="10" className='m-2'>
                  <Table className='pt-3 pb-3'>
                    <tbody>
                      <tr>
                        <th>문의 번호</th>
                        <td>{voc.vocId}</td>
                      </tr>
                      <tr>
                        <th>제목</th>
                        <td>{voc.title}</td>
                      </tr>
                      <tr>
                        <th>작성일</th>
                        <td>{formatDate(voc.regDate)}</td>
                      </tr>
                      <tr>
                        <th>내용</th>
                        <td>
                          <div dangerouslySetInnerHTML={{__html: voc.content}}/>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row className='justify-content-md-center pt-4'>
                <Col md="10" className='m-2'>
                  <Link to={"/myVoc"}>
                    <Button variant='primary' style={{float: "right"}}> 내 1:1 문의로</Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Container className='mt-4 bg-white'>
              <Row className="justify-content-md-center pt-4">
                <Col md="10" className='m-2'>
                  <h2>{replyList.length > 0 ? "문의 답글" : "답글이 없습니다"}</h2>
                </Col>
              </Row>
              {replyList.map((reply, index) => (
                <Row className="justify-content-md-center pt-4 pb-4" key={index}>
                  <Col md="10" className='m-2'>
                    <Table>
                      <tbody>
                        <tr>
                          <th>내용</th>
                          <td>
                            <div dangerouslySetInnerHTML={{__html: reply.reply}}/>
                          </td>
                        </tr>
                        <tr>
                          <th>작성일</th>
                          <td>{formatDate(reply.regDate)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default MyVocRead;