import {createSlice} from '@reduxjs/toolkit';

export const checklistSlice = createSlice({
  name: 'checklist',
  initialState: {
    checklist: null,
  },
  reducers: {
    getList: (state, action) => {
      state.checklist = action.payload;
    },
    cleanList: state => {
      state.checklist = null;
    },
    getSection: (state, action) => {
      let checklists = state.checklist.map(chl => {
        if (chl.id === action.payload.checklist_id) {
          chl.sections = action.payload.sections;
        }
        return chl;
      });
      state.checklist = checklists;
    },
    getSectionQuestions: (state, action) => {
      let checklists = state.checklist.map(chl => {
        if (chl.id === action.payload.checklist_id) {
          chl.sections = chl.sections.map(sct => {
            if (sct.id === action.payload.section_id) {
              sct.questions = action.payload.questions;
            }
            return sct;
          });
        }
        return chl;
      });
      state.checklist = checklists;
    },
  },
});

export const {getList, cleanList, getSection} = checklistSlice.actions;

export default checklistSlice.reducer;
