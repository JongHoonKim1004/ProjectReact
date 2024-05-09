import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminFaqList = () => {
  // state 설정
  const [faqList, setFaqList] = useState([]);

  // 초기 호출
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        // fetch()를 사용하여 서버로부터 데이터 요청
        const response = await fetch('http://localhost:8080/faq/list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();  // 응답 데이터를 JSON 형태로 파싱
        console.log(data);
        setFaqList(data);  // 상태 업데이트
      } catch (error) {
        console.error('Fetching faq failed:', error);
      }
    };

    fetchFaq();
  },[]);
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>자주묻는 질문 목록</h1>
      </div>
      <Row className="p-5">
        <Col>
          <Row  className="p-2">
            <Table className='bg-white'>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>질문</th>
                </tr>
              </thead>
              <tbody>
                {faqList.map((faq, index) => (
                  <tr key={index}>
                    <td>
                      {faq.faqId}
                    </td>
                    <td>
                      <Link to={`/admin/faq/read/${faq.faqId}`} style={{textDecoration: "none", color: "#111"}}>
                        {faq.title}
                      </Link>
                    </td>
                  </tr>
                ))}
                  
                  
                
              </tbody>
            </Table>
          </Row>
          <Row>
            <Col md="10"></Col>
            <Col md="2"className='justify-content-end pt-3 pb-3' style={{display: "flex"}}>
              <Link to={'/admin'}>
                <Button variant='primary'>메인 페이지로</Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default AdminFaqList;