import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const AdminFaqRead = () => {
  // useNavigate 설정
  const navigation = useNavigate();

  // params 설정
  const {faqId} = useParams();

  // state 설정
  const [faq, setFaq] = useState({});

  // 초기 질문 불러오기
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        // fetch()를 사용하여 서버로부터 데이터 요청
        const response = await fetch(`http://localhost:8080/faq/read/${faqId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();  // 응답 데이터를 JSON 형태로 파싱
        console.log(data);
        setFaq(data);  // 상태 업데이트
      } catch (error) {
        console.error('Fetching faq failed:', error);
      }
    };

    fetchFaq();
  },[]);

  // 질문 삭제 요청하기
  const deleteFaq = () => {
    fetch(`http://localhost:8080/faq/delete/${faqId}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
    }).then((result) => {
      return result.text();
    }).then((text) => {
      console.log(text);
      alert(text);
      navigation("/admin/faq/list");
    })
  }
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>자주묻는 질문 상세보기</h1>
      </div>
      <Row className="p-5 justify-content-md-center">
        <Col md="8">
          <Row className="p-2 bg-white">
            <Table>
              <tbody>
                <tr>
                  <th style={{ width: "20%", textAlign: "center" }}>
                    식별번호
                  </th>
                  <td>{faq.faqId}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>질문</th>
                  <td>{faq.title}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>응답</th>
                  <td>{faq.content}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row className="pt-5">
            <Col md="7"></Col>
            <Col md="5">
              <Link to={"/admin/users/list"}>
                <Button className="mx-5">목록으로</Button>
              </Link>
              <Button variant="danger" onClick={deleteFaq}>
                질문 삭제하기
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default AdminFaqRead;
