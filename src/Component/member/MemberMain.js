import React from "react";
import MemberNavbar from "./MemberNavbar";
import { Col, Row } from "react-bootstrap";
import MemberSidebar from "./MemberSidebar";
import { Route, Routes } from "react-router-dom";
import Dahboard from "./Component/Dahboard";
import MemberInfoModify from "./Component/MemberInfoModify";
import MemberPointLog from "./Component/MemberPointLog";

const MemberMain = () => {
  return (
    <div>
      <MemberNavbar />
      <Row style={{ minHeight: "946px" }}>
        <Col
          className="px-0"
          md="2"
          style={{ backgroundColor: "RGB(235, 235, 235)" }}
        >
          <MemberSidebar />
        </Col>
        <Col
          className="px-0"
          md="10"
          style={{ backgroundColor: "RGB(235, 235, 235)" }}
        >
          <Routes>
            {/** 사업자 페이지 메인 화면 */}
            <Route path="/" element={<Dahboard />} />

            {/** 사업자 정보 변경 페이지 */}
            <Route path="/infoModify" element={<MemberInfoModify/>}/>

            {/** 사업자 포인트 이력 페이지 */}
            <Route path="/point/log" element={<MemberPointLog/>}/>
          </Routes>
        </Col>
      </Row>
    </div>
  );
};

export default MemberMain;
