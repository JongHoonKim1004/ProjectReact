import React, { useEffect, useState } from 'react';
import { Col, Container, Pagination, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';



const Notice = () => {
  // useState
  const [noticeList, setNoticeList] = useState({});
  const [active, setActive] = useState(0);
  // 공지사항 목록 호출
  useEffect(() => {
    fetchNotice(active);
  }, [active]);

  const fetchNotice = async (page) => {
    try{
      const response = await fetch(`//localhost:8080/notice/list/page/${page}`);
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

  // 공지사항 페이지 버튼 클릭
  const handlePageChange = (pageNumber) => {
    setActive(pageNumber);
  };

  // 페이지 버튼 출력
  const renderPaginationItems = () => {
    const items = [];
    const totalPages = noticeList.totalPages;
    const currentPage = noticeList.number;

    const startPage = Math.max(0, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 5);

    for (let page = startPage; page < endPage; page++) {
      items.push(
        <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
          {page + 1}
        </Pagination.Item>
      );
    }

    return items;
  };

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
                      {Array.isArray(noticeList.content) ? noticeList.content.map((notice, index) => (
                        <tr style={{borderTop: "1px solid #d8d8d8"}} key={index}>
                          <td>{notice.id}</td>
                          <td>
                            <Link to={'/notice/read/' + notice.id} style={{color: "black", textDecoration: "none"}}>
                            {notice.title}
                            </Link>
                          </td>
                          <td>{formatDate(notice.regDate)}</td>
                        </tr>
                      )) : null}
                      
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col>
                {noticeList.totalPages > 1 && (
                  <Pagination>
                    <Pagination.First onClick={() => handlePageChange(0)} />
                    <Pagination.Prev onClick={() => handlePageChange(Math.max(0, active - 1))} />
                    {renderPaginationItems()}
                    <Pagination.Next onClick={() => handlePageChange(Math.min(noticeList.totalPages - 1, active + 1))} />
                    <Pagination.Last onClick={() => handlePageChange(noticeList.totalPages - 1)} />
                  </Pagination>
                  )}
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