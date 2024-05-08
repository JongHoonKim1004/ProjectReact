import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './Component/Main';


import Footer from './Component/Footer';
import Header from './Component/Header';
import MyInfo from './Component/MyInfo';
import MyPoint from './Component/MyPoint';
import MyPointLog from './Component/MyPointLog';
import MySurvey from './Component/MySurvey';
import MyVoc from './Component/MyVoc';
import Notice from './Component/Notice';
import Faq from './Component/Faq';
import Voc from './Component/voc';
import Login from './Component/Login';
import Register_terms from './Component/Register_terms';
import Register_forms from './Component/Register_forms';
import Register_result from './Component/Register_result';
import UsernameCheck from './Component/UsernameCheck';
import Post from './Component/daum/Post';
import AdminMain from './Component/admin/AdminMain';
import './font-awesome-4.7.0/css/font-awesome.css';


function App() {
  return (
    
      <div>
        {/* Routes 내부에 모든 Route를 포함 */}
        <Routes>
          <Route path="/" element={<HeaderAndFooter><Main /></HeaderAndFooter>} />
          {/** 로그인, 로그아웃 , 회원가입 등 */}
          <Route path="/login" element={<HeaderAndFooter><Login/></HeaderAndFooter>}/>
          <Route path="/register_terms" element={<HeaderAndFooter><Register_terms/></HeaderAndFooter>}/>
          <Route path='/register_forms' element={<HeaderAndFooter><Register_forms/></HeaderAndFooter>}/>
          <Route path="/register_result" element={<HeaderAndFooter><Register_result/></HeaderAndFooter>}/>

          {/** 회원가입 폼 내 아이디 중복확인, 주소 api */}
          <Route path="/idCheck" element={<UsernameCheck/>}/>
          <Route path="/addressSearch" element={<Post/>}/>

          {/** 마이페이지 */}
          <Route path="/myInfo" element={<HeaderAndFooter><MyInfo/></HeaderAndFooter>}/>
          <Route path="/myPoint" element={<HeaderAndFooter><MyPoint/></HeaderAndFooter>}/>
          <Route path="/myPointLog" element={<HeaderAndFooter><MyPointLog/></HeaderAndFooter>}/>
          <Route path="/mySurvey" element={<HeaderAndFooter><MySurvey/></HeaderAndFooter>}/>
          <Route path='/myVOC' element={<HeaderAndFooter><MyVoc/></HeaderAndFooter>}/>

          {/** 고객센터 */}
          <Route path='/notice' element={<HeaderAndFooter><Notice/></HeaderAndFooter>}/>
          <Route path="/faq" element={<HeaderAndFooter><Faq/></HeaderAndFooter>}/>
          <Route path="/voc" element={<HeaderAndFooter><Voc/></HeaderAndFooter>}/>


          {/** 관리자 페이지 전체 */}
          <Route path="/admin/*" element={<AdminMain/>}/>
        </Routes>
      </div>
    
  );
}

// 헤더와 푸터를 포함하는 레이아웃 컴포넌트
function HeaderAndFooter({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default App;
