import {createSlice} from '@reduxjs/toolkit';

export const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    answers: [],
  },
  reducers: {
    saveAnswers: (state, action) => {
      let answerIndex = state.answers.findIndex(
        answ => (answ.id = action.payload.checklist_id),
      );
      if (answerIndex >= 0) {
        state.answers[answerIndex].sections.push({
          id: action.payload.section_id,
          answers: action.payload.answers,
        });
      } else {
        state.answers.push({
          id: action.payload.checklist_id,
          sections: [
            {
              id: action.payload.section_id,
              answers: action.payload.answers,
            },
          ],
        });
      }
    },
  },
});

export const {saveAnswers} = answersSlice.actions;

export default answersSlice.reducer;
