import React from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div>
      <Sidebar>
        <Menu>
          <MenuItem component={<Link to={'/admin'}/>}>대시보드</MenuItem>
          <MenuItem component={<Link to={'/admin/survey/list'}/>}>설문조사 관리</MenuItem>
          <MenuItem>1:1 문의 관리</MenuItem>
          <MenuItem component={<Link to={"/admin/users/list"}/>}>이용자 관리</MenuItem>
        </Menu>
        <Menu>
          <SubMenu label="관리자 설정">
            <MenuItem component={<Link to={'/admin/admin/list'}/>}>관리자 목록</MenuItem>
            <MenuItem component={<Link to={'/admin/admin/create'}/>}>새 관리자 생성</MenuItem>
          </SubMenu>
          <SubMenu label="사업자 관리">
            <MenuItem component={<Link to={'/admin/member/list'}/>}>사업자 목록</MenuItem>
            <MenuItem component={<Link to={'/admin/member/create'}/>}>새 사업자 등록</MenuItem>
          </SubMenu>
          <SubMenu label="공지사항 관리">
            <MenuItem component={<Link to={'/admin/notice/list'}/>}>공지사항 목록</MenuItem>
            <MenuItem component={<Link to={'/admin/notice/create'}/>}>새 공지사항 작성</MenuItem>
          </SubMenu>
          <SubMenu label="자주묻는 질문 관리">
            <MenuItem>자주묻는 질문 목록</MenuItem>
            <MenuItem>새로운 질문 작성</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;
