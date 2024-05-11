import React from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const MemberSidebar = () => {
  
  return (
    <div>
      <Sidebar>
        <Menu>
          <MenuItem component={<Link to={'/member'}/>}>대시보드</MenuItem>
          <MenuItem component={<Link to={"/member/infoModify"}/>}>사업자 정보 변경</MenuItem>
        </Menu>
        <Menu>
          <SubMenu label="설문조사 관리">
            <MenuItem component={<Link to={'/member/survey/list'}/>}>설문조사 목록</MenuItem>
            <MenuItem component={<Link to={'/member/survey/participate'}/>}>설문조사 참여인원 목록</MenuItem>
            <MenuItem component={<Link to={'/member/survey/create'}/>}>새 설문조사 생성</MenuItem>
          </SubMenu>
          <SubMenu label="포인트 관리">
            <MenuItem component={<Link to={'/member/point/log'}/>}>포인트 변경 이력</MenuItem>
            <MenuItem component={<Link to={'/member/point/charge'}/>}>포인트 충전</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MemberSidebar;