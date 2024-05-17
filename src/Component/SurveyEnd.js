export const surveyEnd = async (surveyId, usersId, token, isTerminate) => {
  try {
    const endpoint = isTerminate
      ? `//localhost:8080/survey/end/${surveyId}/${usersId}/terminate`
      : `//localhost:8080/survey/end/${surveyId}/${usersId}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error("Network is not good");
    } else {
      alert("설문조사 응답으로 인한 포인트가 적립되었습니다.\n감사합니다");
    }
  } catch (error) {
    console.error("fetch error in survey end", error);
  }
}