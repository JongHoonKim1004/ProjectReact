import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Dashboard from "./adminComponent/Dashboard";
import AdminSidebar from "./adminComponent/AdminSidebar";
import { Col, Row } from "react-bootstrap";
import AdminSurveyList from "./adminComponent/AdminSurveyList";
import AdminSurveyRead from "./adminComponent/AdminSurveyRead";
import AdminUsersList from "./adminComponent/AdminUsersList";
import AdminUsersRead from "./adminComponent/AdminUsersRead";
import AdminAdminList from "./adminComponent/AdminAdminList";
import AdminAdminRead from "./adminComponent/AdminAdminRead";
import AdminAdminCreate from "./adminComponent/AdminAdminCreate";
import AdminMemberList from "./adminComponent/AdminMemberList";
import AdminMemberRead from "./adminComponent/AdminMemberRead";
import AdminMemberCreate from "./adminComponent/AdminMemberCreate";
import AdminNoticeList from "./adminComponent/AdminNoticeList";
import AdminNotiveRead from "./adminComponent/AdminNotiveRead";
import AdminNoticeCreate from "./adminComponent/AdminNoticeCreate";
import AdminFaqList from "./adminComponent/AdminFaqList";
import AdminFaqRead from "./adminComponent/AdminFaqRead";
import AdminFaqCreate from "./adminComponent/AdminFaqCreate";
import AdminLogin from "./AdminLogin";
import { useSelector } from "react-redux";
import AdminVocList from "./adminComponent/AdminVocList";

const AdminMain = () => {
  // useNavigate
  const navigation = useNavigate();

  // redux 
  const { admin, token  } = useSelector(state => state.auth);

  useEffect(() => {
    // 관리자 로그인 여부 확인
    if(token == null){
      navigation('/admin/login', {replace: false});
    } else {
      if(admin == null){
        alert("잘못된 접근입니다");
        navigation('/', {replace: false});
      }
    }
  },[]);

  
  return (
    <div >
      <AdminNavbar/>
      <Row style={{minHeight: "946px"}}>
        <Col className="px-0" md="2" style={{backgroundColor: "RGB(235, 235, 235)"}}>
          <AdminSidebar/>
        </Col>
        <Col className="px-0" md="10" style={{ backgroundColor: "RGB(235, 235, 235)" }}>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            

            {/** 설문조사 관리 탭 */}
            <Route path="/survey/list" element={<AdminSurveyList/>}/>
            <Route path="/survey/read" element={<AdminSurveyRead/>}/>

            {/** 1:1 문의 관리 탭 */}
            <Route path="/voc/list" element={<AdminVocList/>}/>


            {/** 이용자 관리 탭 */}
            <Route path="/users/list" element={<AdminUsersList/>}/>
            <Route path="/users/read/:usersId" element={<AdminUsersRead/>}/>

            {/** 관리자 설정 탭 */}
            <Route path="/admin/list" element={<AdminAdminList/>}/>
            <Route path="/admin/read/:adminId" element={<AdminAdminRead/>}/>
            <Route path="/admin/create" element={<AdminAdminCreate/>}/>

            {/** 사업자 관리 탭 */}
            <Route path="/member/list" element={<AdminMemberList/>}/>
            <Route path="/member/read/:memberId" element={<AdminMemberRead/>}/>
            <Route path="/member/create" element={<AdminMemberCreate/>}/>

            {/** 공지사항 관리 탭 */}
            <Route path="/notice/list" element={<AdminNoticeList/>}/>
            <Route path="/notice/read/:id" element={<AdminNotiveRead/>}/>
            <Route path="/notice/create" element={<AdminNoticeCreate/>}/>
            {/** 자주묻는 질문 관리 탭 */}
            <Route path="/faq/list" element={<AdminFaqList/>}/>
            <Route path="/faq/read/:faqId" element={<AdminFaqRead/>}/>
            <Route path="/faq/create" element={<AdminFaqCreate/>}/>
          </Routes>
        </Col>
      </Row>
    </div>
  );
};

export default AdminMain;
