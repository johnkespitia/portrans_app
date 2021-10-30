import {createSlice} from '@reduxjs/toolkit';

export const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    answers: [],
  },
  reducers: {
    saveAnswers: (state, action) => {
      if (state.answers === null) {
        state.answers = [];
      }
      let answerIndex = state.answers.findIndex(
        answ =>
          answ.id === action.payload.checklist_id &&
          answ.date_start === action.payload.date_start,
      );
      if (answerIndex >= 0) {
        state.answers[answerIndex].sections.push({
          id: action.payload.section_id,
          answers: action.payload.answers,
        });
      } else {
        state.answers.push({
          id: action.payload.checklist_id,
          date_start: action.payload.date_start,
          sections: [
            {
              id: action.payload.section_id,
              answers: action.payload.answers,
            },
          ],
        });
      }
    },
    syncAnswer: (state, action) => {
      let newAnswer = state.answers.map(
        answ =>
          answ.id !== action.payload.checklist_id &&
          answ.date_start !== action.payload.date_start,
      );
      state.answers = newAnswer;
    },
    cleanAnswers: state => {
      state.answers = null;
    },
  },
});

export const {saveAnswers, cleanAnswers} = answersSlice.actions;

export default answersSlice.reducer;
