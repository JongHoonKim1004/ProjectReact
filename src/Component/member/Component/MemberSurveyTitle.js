import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ClassicEditor from '../../../ckeditor/build/ckeditor';
import { useNavigate } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker';
import { addDays } from 'date-fns';

const MemberSurveyTitle = () => {
  // useNavigate
  const navigate = useNavigate();

  // state 설정
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [surveyMember, setSurveyMember] = useState("");
  const [startDate, setStartDate] = useState();
  const [formattedStartDate, setFormattedStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [formattedEndDate, setFormattedEndDate]= useState();
  const [pointAtLeast, setPointAtLeast] = useState(0);
  const [point, setPoint] = useState(100);

  // onChange
  const handleStartDate = (date) => {
    setStartDate(date);
    setFormattedStartDate(formatDate(date));
  }
  const handleEndDate = (date) => {
    setEndDate(date);
    setFormattedEndDate(formatDate(date));
  }
  const handlePointAtLeast = (e) => {
    if(parseInt(e.target.value) < 0){
      alert("더 이상 낮출 수 없습니다.");
      return false;
    }
    if(parseInt(e.target.value) >= point){
      alert("최소 지급 포인트는 최대 지급 포인트보다\n크거나 같을 수 없습니다");
      return false;
    }

    setPointAtLeast(parseInt(e.target.value));
  }
  const handlePoint = (e) => {
    let pointInt = parseInt(e.target.value);
    if(pointInt < 0){
      alert("더 이상 낮출 수 없습니다");
      
      return false;
    }
    if(pointInt <= pointAtLeast){
      alert("최대 지급 포인트는 최소 지급 포인트보다\n작거나 같을 수 없습니다");
      return false;
    }

    setPoint(pointInt);
  }

  // 날짜 input 변경
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = '' + d.getFullYear();

    if(month.length < 2){
      month = '0' + month;
    }
    if(day.length < 2){
      day = '0' + day;
    }

    return [year, month, day].join('');
  }

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // 미입력 확인
    if(name.trim() == "" ||
      description.trim() == "" ||
      startDate == null ||
      endDate == null
    ){
      alert("입력되지 않은 사항이 있습니다");
      return false;
    }

    // 제출 전 날짜 설정 확인
    if(parseInt(formattedStartDate) > parseInt(formattedEndDate)){
      alert("날짜 설정이 잘못 되었습니다.\n다시 한 번 확인해주세요");
      return false;
    }

    var survey = {
      name: name,
      description: description,
      surveyember: surveyMember,
      point: point,
      pointAtLeast: pointAtLeast,
      startDate: formattedStartDate,
      endDate: formattedEndDate
    }
    
    console.log(survey);
    // 서버에서 설문조사 메타데이터 처리

    // 서버 처리 과정 넣으면 이 부분 콜백에 넣기
    navigate("/member/survey/create/sno");
  }
  return (
    <main className="p-5">
      <div style={{ padding: "16px 24px", color: "#44596e" }}>
        <h1>새 설문조사 생성</h1>
        <p>신중하게 작성해주세요. 작성 후에 내용 변경이 불가할 수 있습니다.</p>
      </div>
      <Row className="p-5 justify-content-md-center">
        <Col md="8">
          <Row className="p-5 bg-white">
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="3">설문조사명</Form.Label>
                <Col sm="9">
                  <Form.Control name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">설명</Form.Label>
                <Col sm="9">
                  <CKEditor 
                    editor={ClassicEditor}
                    config={{
                      toolbar: [
                        'heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
                        'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
                        'undo', 'redo', 'imageUpload'
                      ],
                      image: {
                        toolbar: [
                          'imageTextAlternative', 'imageStyle:full', 'imageStyle:side'
                        ]
                      },
                      simpleUpload: {
                        uploadUrl: 'http://example.com/image/upload', // 서버의 이미지 업로드 URL
                        headers: {
                          'X-CSRF-TOKEN': 'CSFR-Token',
                          Authorization: 'Bearer <JSON Web Token>'
                        }
                      }
                    }}
                    data=""
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                      setDescription(data);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="3">사업자</Form.Label>
                <Col sm="9">
                  <Form.Control name="surveyMember" id="surveyMember" value={"surveyMember"} readOnly aria-describedby='memberHelp'/>
                  <Form.Text id="memberHelp">이 부분은 별도로 설정하지 않으셔도 됩니다</Form.Text>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3 pt-5'>
                <Form.Label column sm="3">설문 시작일</Form.Label>
                <Col sm="9">
                  <ReactDatePicker
                    dateFormat={'yyyy-MM-dd'} 
                    selected={startDate} 
                    onChange={handleStartDate} 
                    className="form-control"
                    maxDate={addDays(new Date(), 0)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm="3">설문 종료일</Form.Label>
                <Col sm="9">
                  <ReactDatePicker
                    dateFormat={'yyyy-MM-dd'} 
                    selected={endDate} 
                    onChange={handleEndDate} 
                    className="form-control"
                    maxDate={addDays(new Date(), 0)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-4 pt-5'>
                <Form.Label column sm="3">최소 지급 포인트</Form.Label>
                <Col sm="9">
                  <Form.Control name="pointAtLeast" id="pointAtLeast" type="number" value={pointAtLeast} onChange={handlePointAtLeast} step={10} style={{textAlign: "right"}} aria-describedby='atLeastHelp'/>
                  <Form.Text  id="atLeastHelp">조기 종료 조건으로 조사가 종료될 경우 지급될 포인트 입니다.</Form.Text>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-5'>
                <Form.Label column sm="3">최대 지급 포인트</Form.Label>
                <Col sm="9">
                  <Form.Control name="point" id="point" type="number" value={point} onChange={handlePoint} step={10} style={{textAlign: "right"}}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-2 pt-5'>
                <Col>
                  <h6 className='h6' style={{textAlign: "center", fontSize: "14px"}}>
                    해당 페이지에서 이동 후 중간에 페이지를 닫으면 설문 등록이 되지 않을 수 있습니다
                  </h6>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Col></Col>
                <Col>
                  <div  className='d-grid'>
                    <Button type="submit" variant='primary' size='lg'>등록하기</Button>
                  </div>
                </Col>
                <Col></Col>
              </Form.Group>
            </Form>
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default MemberSurveyTitle;