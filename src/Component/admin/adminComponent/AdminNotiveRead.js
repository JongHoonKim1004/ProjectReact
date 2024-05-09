import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AdminNotiveRead = () => {
  // params 가져오기
  const {id} = useParams();
  const [notice, setNotice] = useState({});

  // useNavigate 설정
  const navigation = useNavigate();

  // 공지사항 호출
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        // fetch()를 사용하여 서버로부터 데이터 요청
        const response = await fetch(`http://localhost:8080/notice/read/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();  // 응답 데이터를 JSON 형태로 파싱
        console.log(data);
        setNotice(data);  // 상태 업데이트
      } catch (error) {
        console.error('Fetching notice failed:', error);
      }
    };

    fetchNotice();
  },[]);

  // 공지사항 삭제하기
  const deleteNotice = () => {
    fetch(`http://localhost:8080/notice/delete/${id}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
    }).then((result) => {
      return result.text();
    }).then((text) => {
      console.log(text);
      alert(text);
      navigation("/admin/notice/list");
    })
  }
  return (
    <main className="p-5">
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <h1>공지사항 상세보기</h1>
        </div>
        <Row className='p-5 justify-content-md-center'>
          <Col md="8">
            <Row className='p-2 bg-white'>
              <Table>
                <tbody>
                  <tr>
                    <th style={{width: "20%", textAlign: "center"}}>식별번호</th>
                    <td>{notice.id}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>제목</th>
                    <td>{notice.title}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>작성자</th>
                    <td>{notice.writer}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>작성일</th>
                    <td>{notice.regDate}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>수정일</th>
                    <td>{notice.updateDate}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>조회수</th>
                    <td>{notice.readCount}</td>
                  </tr>
                  <tr>
                    <th style={{textAlign: "center"}}>내용</th>
                    <td>
                      <div dangerouslySetInnerHTML={{__html: notice.content}}/>
                    </td>
                  </tr>
                  
                </tbody>
              </Table>
            </Row>
            <Row className='pt-5'>
              <Col md="7"></Col>
              <Col md="5">
                <Link to={'/admin/users/list'}>
                  <Button className='mx-5'>목록으로</Button>
                </Link>
                <Button variant='danger' onClick={deleteNotice}>공지 삭제하기</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </main>
  );
};

export default AdminNotiveRead;