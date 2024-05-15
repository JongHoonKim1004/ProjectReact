import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminVocList = () => {
  // useNavigate
  const navigation = useNavigate();

  // useState
  const [vocList, setVocList] = useState([]);
  const [replyList, setReplyList] = useState([]);

  // fetch
  useEffect(() => {
    const fetchServer = async () => {
      try{
        const response = await fetch("//localhost:8080/voc/list/all");
        if(!response.ok){
          console.error("Network is not good");
        }

        const data = await response.json();
        console.log(data);
        setVocList(data);
      } catch(error){
        console.error("Fetch Failed", error);
      }
    }

    fetchServer();
  },[]);

  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>1:1 문의 목록</h1>
      </div>
      <Row className="p-5">
        <Col>
          <Row  className="p-2">
            <Table className='bg-white'>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th>답변여부</th>
                </tr>
              </thead>
            </Table>
          </Row>
        </Col>
      </Row>
    </main>

  );
};

export default AdminVocList;