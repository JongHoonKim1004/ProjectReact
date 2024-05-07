import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Dashboard from "./adminComponent/Dashboard";
import AdminSidebar from "./adminComponent/AdminSidebar";
import { Col, Row } from "react-bootstrap";

const AdminMain = () => {
  // navigation
  const navigation = useNavigate();

  return (
    <div>
      <AdminNavbar/>
      <Row>
        <Col md="2">
          <AdminSidebar/>
        </Col>
        <Col md="10">
          <Routes>
            <Route path="/" element={<Dashboard/>}/>

          </Routes>
        </Col>
      </Row>
    </div>
  );
};

export default AdminMain;
