import React from "react";
import MemberNavbar from "./MemberNavbar";
import { Col, Row } from "react-bootstrap";
import MemberSidebar from "./MemberSidebar";
import { Route, Routes } from "react-router-dom";
import Dahboard from "./Component/Dahboard";
import MemberInfoModify from "./Component/MemberInfoModify";
import MemberPointLog from "./Component/MemberPointLog";
import MemberSurveyList from "./Component/MemberSurveyList";
import MemberSurveyRead from "./Component/MemberSurveyRead";
import MemberSurveyParicipate from "./Component/MemberSurveyParicipate";
import MemberPointCharge from "./Component/MemberPointCharge";
import MemberSurveyTitle from "./Component/MemberSurveyTitle";
import MemberSurveyQuestion from "./Component/MemberSurveyQuestion";

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

            {/** 사업자 설문조사 관련 페이지 */}
            <Route path="/survey/list" element={<MemberSurveyList/>}/>
            <Route path="/survey/read/:surveyId" element={<MemberSurveyRead/>}/>
            <Route path="/survey/participate" element={<MemberSurveyParicipate/>}/>
            <Route path="/survey/create" element={<MemberSurveyTitle/>}/>
            <Route path="/survey/create/sno/:sno" element={<MemberSurveyQuestion/>}/>

            {/** 사업자 포인트 이력 페이지 */}
            <Route path="/point/log" element={<MemberPointLog/>}/>
            <Route path="/point/charge" element={<MemberPointCharge/>}/>
          </Routes>
        </Col>
      </Row>
    </div>
  );
};

export default MemberMain;
