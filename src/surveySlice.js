import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  question: null,
  currentIndex: 0,
}

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
      state.currentIndex = 0;
    },
    incrementIndex: (state) => {
      state.currentIndex += 1;
    },
    clearQuestion: (state, action) => {
      state.question = null;
      state.currentIndex = 0;
    }
  }
})


export const {setQuestion, incrementIndex, clearQuestion} = surveySlice.actions;
export default surveySlice.reducer;