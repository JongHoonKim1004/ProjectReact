import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearToken } from '../../authSlice';
import { clearQuestion } from '../../surveySlice';

// 쿼리스트링 추출
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

// 본 메서드
const NaverLogoutResult = () => {
  // useNavigate
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);
  const { question, currentIndex } = useSelector(state => state.survey);

  // query
  const query = useQuery();
  const logout = query.get("logout");

  useEffect(() => {
    if(logout == "success"){
      alert("로그아웃이 정상적으로 완료되었습니다\n감사합니다");
      dispatch(clearToken());
      if(localStorage.getItem("accessToken")){
        localStorage.removeItem("accessToken");
      }
      if(localStorage.getItem("token")){
        localStorage.removeItem("token");
      }
      if(question){
        dispatch(clearQuestion());
      }

      window.close();
      if (window.opener && !window.opener.closed) {
        window.opener.location.href = "/";
      }
    }
  },[logout]);


  // 내용은 작성하기 않고 서버 응답만 받아서 처리 후 종료
  return (
    <div>
      
    </div>
  );
};

export default NaverLogoutResult;