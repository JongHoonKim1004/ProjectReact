import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setLoginType, setToken, setUser, setUserPoint } from '../../authSlice';


// 쿼리스트링 추출
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const GoogleLoginDirect = () => {
    // useNavigate
  const navigate = useNavigate();

  // redux
  const { token, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // query 설정
  const query = useQuery();
  const accessToken = query.get("accessToken");
  const jwt = query.get("token");

  useEffect(() => {
    if (accessToken) {
        console.log('Access Token:', accessToken);
        
        if (accessToken) localStorage.setItem('accessToken', accessToken);
    }
}, [accessToken]);

  useEffect(() => {
    if(jwt){
      console.log("jwt: " + jwt);

      const fetchGoogleUser = async () => {
        // 사용자 정보 호출
        const decoded = jwt_decode(jwt);
        const userId = decoded.sub;
        
        const response2 = await fetch(`http://localhost:8080/users/read/${userId}`);
        const data2 = await response2.json();
        const response1 = await fetch(`http://localhost:8080/users/point/find/${userId}`);
        const data1 = await response1.json();
        dispatch(setUser(data2));
        dispatch(setUserPoint(data1));

        dispatch(setToken(jwt));
        dispatch(setLoginType('google'));

        window.close();
        if (window.opener && !window.opener.closed) {
          window.opener.location.href = "/";
        }
      }

      fetchGoogleUser();
    }
    
  },[jwt]);
  return (
    <div>
      
    </div>
  );
};
export default GoogleLoginDirect;