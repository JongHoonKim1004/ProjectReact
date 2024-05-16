import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";

const Faq = () => {
  // useState
  const [faqList, setFaqList] = useState([]);

  // 자주묻는 질문 호출
  useEffect(() => {
    const fetchFaq = async () => {
      try{
        const response = await fetch("//localhost:8080/faq/list");
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.json();
        console.log(data);
        setFaqList(data);
      } catch(error) {
        console.error("Fetch Failed");
      }
    }

    fetchFaq();
  },[]);
  return (
    <div>
      <Container style={{ backgroundColor: "RGB(240, 240, 240)" }}>
        <Container style={{ height: "80px" }} />
        <Row className="justify-content-md-center">
          <Col md="8" style={{ borderBottom: "3px solid #d8d8d8" }}>
            <div md="auto">
              <h1 style={{ fontWeight: "650" }}>자주 묻는 질문</h1>
              <p style={{ float: "right", fontSize: "14px" }}>
                Home {`>`} 고객센터 {`>`} 자주 묻는 질문
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md="8">
            <Accordion>
              {faqList.map((faq, index) => (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header>{faq.title}</Accordion.Header>
                  <Accordion.Body>
                    {faq.content}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
        <Container style={{ height: "80px" }} />
      </Container>
    </div>
  );
};

export default Faq;
