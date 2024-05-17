import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { surveyEnd } from '../SurveyEnd';
import { setUserPoint } from '../../authSlice';

// 쿼리스트링
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

// 본 메서드
const SurveyResult = () => {
  // useNavigate
  const navigate = useNavigate();

  // redux 
  const dispatch = useDispatch();
  const { question, currentIndex } = useSelector(state => state.survey);
  const { user, userPoint, token } = useSelector(state => state.auth);

  // 쿼리스트링
  const query = useQuery();

  const isTerminate = query.get("isTerminate") === 'true';
  const surveyId = query.get("surveyId");
  const usersId = query.get("usersId");

  // useState
  const [point, setPoint] = useState(null);

  // 유저 검증 + 설문 완료 검증 및 포인트 지급
  useEffect(() => {
    const fetchDataAndHandleSurveyEnd = async () => {
      // 유저 검증
      if (!token) {
        alert("로그인 후 이용할 수 있습니다.");
        window.close();
        if (window.opener && !window.opener.closed) {
          window.opener.location.href = "/login";
        }
        return;
      }

      if (!question){
        alert("잘못된 접근입니다.");
        window.close();
        if (window.opener && !window.opener.closed) {
          window.opener.location.href = "/";
        }
        return;
      }

      if (token && !user) {
        alert("잘못된 접근입니다.");
        window.close();
        if (window.opener && !window.opener.closed) {
          window.opener.location.href = "/";
        }
        return;
      }

      // 포인트 적립 정보를 서버에서 가져오기
      try {
        const response = await fetch(`//localhost:8080/survey/read/${surveyId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch point data");
        }
        const data = await response.json();
        console.log(data);
        setPoint(isTerminate ? data.pointAtLeast : data.point);  // 서버에서 받은 포인트 정보 설정
        
      } catch (error) {
        console.error("Failed to fetch point data", error);
        alert("포인트 정보를 가져오는 데 실패했습니다.");
        window.close();
        return;
      }
      
      // 설문 조사 확인
      
      
    };

    fetchDataAndHandleSurveyEnd();
  },[]);

  useEffect(() => {
    if (point === null) return; // 아직 로딩 중이거나 point가 설정되지 않았으면 아무 작업도 하지 않음

    // 설문 조사 확인
    const handleSurveyEnd = async () => {
      if (isTerminate) {
        // 조기종료
        await surveyEnd(surveyId, usersId, token, isTerminate);
        dispatch(setUserPoint({
          pointId: userPoint.pointId,
          usersId: userPoint.usersId,
          pointTotal: userPoint.pointTotal + point,
          pointUsed: userPoint.pointUsed,
          pointBalance: userPoint.pointBalance + point
        }));
        alert(point + " 포인트 적립이 완료되었습니다\n감사합니다");
        window.close();
        if (window.opener && !window.opener.closed) {
          window.opener.location.href = "/";
        }
      }else if (!isTerminate) {
        // 정상 종료
        await surveyEnd(surveyId, usersId, token, isTerminate);
        dispatch(setUserPoint({
          pointId: userPoint.pointId,
          usersId: userPoint.usersId,
          pointTotal: userPoint.pointTotal + point,
          pointUsed: userPoint.pointUsed,
          pointBalance: userPoint.pointBalance + point
        }));
        alert(point + " 포인트 적립이 완료되었습니다\n감사합니다");
        window.close();
        if (window.opener && !window.opener.closed) {
          window.opener.location.href = "/";
        }
      }
    };

    handleSurveyEnd();
  }, [point]);


  // 화면은 작성하지 않고 서버로 요청 후 결과 확인 후 리디렉트
  return (
    <div>
      
    </div>
  );
};

export default SurveyResult;