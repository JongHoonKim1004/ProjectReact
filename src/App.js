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


function App() {
  return (
    
      <div>
        {/* Routes 내부에 모든 Route를 포함 */}
        <Routes>
          <Route path="/" element={<HeaderAndFooter><Main /></HeaderAndFooter>} />
          {/** 로그인, 로그아웃 , 회원가입 등 */}
          <Route path="/login" element={<HeaderAndFooter><Login/></HeaderAndFooter>}/>
          <Route path="/register_terms" element={<HeaderAndFooter><Register_terms/></HeaderAndFooter>}/>

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
