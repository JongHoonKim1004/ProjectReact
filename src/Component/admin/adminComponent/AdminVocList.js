import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AdminVocList = () => {
  // useNavigate
  const navigation = useNavigate();

  // useState
  const [vocList, setVocList] = useState([]);
  

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
              <tbody>
                {vocList.map((voc, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={"/admin/voc/read/" + voc.vocId}>
                        {voc.title}
                      </Link>
                    </td>
                    <td>{voc.writer}</td>
                    <td>{formatDate(voc.regDate)}</td>
                    <td>{voc.reply ? "답변완료" : "답변대기"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Col>
      </Row>
    </main>

  );
};

export default AdminVocList;