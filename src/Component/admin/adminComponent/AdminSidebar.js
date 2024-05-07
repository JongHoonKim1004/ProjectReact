import React from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";

const AdminSidebar = () => {
  return (
    <div>
      <Sidebar>
        <Menu>
          <MenuItem>대시보드</MenuItem>
          <MenuItem>설문조사 관리</MenuItem>
          <MenuItem>1:1 문의 관리</MenuItem>
          <MenuItem>관리자 설정</MenuItem>
        </Menu>
        <Menu>
          <SubMenu label="이용자 관리">
            <MenuItem>1</MenuItem>
          </SubMenu>
          <SubMenu label="사업자 관리">
            <MenuItem>1</MenuItem>
          </SubMenu>
          <SubMenu label="공지사항 관리">
            <MenuItem>1</MenuItem>
          </SubMenu>
          <SubMenu label="자주묻는 질문 관리">
            <MenuItem>1</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;
