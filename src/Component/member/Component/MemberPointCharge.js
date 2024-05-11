import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MemberPointCharge = () => {
  // useNavigate 설정
  const navigate = useNavigate();

  // 결제 금액 설정
  const [price, setPrice] = useState(0);

  // 총 금액 설정
  const [total, setTotal] = useState(0);

  // 결제금액 변경시 총 포인트도 변경되도록
  const handlePrice = (e) => {
    let newPrice = parseInt(e.target.value) || 0;
    setPrice(newPrice);

    let totalPoint = newPrice + 10000;
    setTotal(totalPoint);
  }
  
  // 결제 모듈 호출
  function onClickPayment() {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp77306658');

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'nice',                           // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
      amount: price,                                 // 결제금액
      name: '포인트 충전',                  // 주문명
      buyer_name: '홍길동',                           // 구매자 이름
      buyer_tel: '01012341234',                     // 구매자 전화번호
      buyer_email: 'example@example',               // 구매자 이메일
      buyer_addr: '신사동 661-16',                    // 구매자 주소
      buyer_postcode: '06018',                      // 구매자 우편번호
      
    }

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const {
      success,
      merchant_uid,
      error_msg
      
    } = response;

    if (success) {
      alert('결제에 성공했습니다');

      // 서버로 사업자 포인트 충전 요청 보내기

      navigate('/member/point/log');
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>사업자 포인트 충전</h1>
      </div>
      <Row className="p-5 justify-content-md-center">
        <Col md="8">
          <Row className="p-5 bg-white">
            <Form className="p-3">
              <Form.Group as={Row} className="mb-5">
                <Col>
                  <p className="h2 mb-3" style={{textAlign: "center"}}>포인트를 충전합니다</p>
                  <p className="h6" style={{textAlign: "center"}}>중간에 페이지를 이동할 경우 오류가 생길 수 있습니다</p>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3 pt-3">
                <Form.Label column sm="3">현재 포인트 잔액</Form.Label>
                <Col sm="9">
                  <InputGroup>
                    <Form.Control type="number" readOnly value={"10000"} style={{textAlign: "right"}}/>
                    <InputGroup.Text>포인트</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">충전할 포인트</Form.Label>
                <Col sm="9">
                  <InputGroup>
                    <Form.Control style={{textAlign: "right"}} type="number" step={1000} defaultValue={0} value={price} onChange={handlePrice}/>
                    <InputGroup.Text>포인트</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3 pt-3">
                <Form.Label column sm="3">결제시 총 포인트</Form.Label>
                <Col sm="9">
                  <InputGroup>
                    <Form.Control type="number" readOnly style={{textAlign: "right"}} value={total} />
                    <InputGroup.Text>포인트</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3 pt-5">
                <Col sm="10"></Col>
                <Col ms="2">
                  <Button variant="primary" type="button" onClick={onClickPayment}>충전하기</Button>
                </Col>
              </Form.Group>
            </Form>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default MemberPointCharge;
