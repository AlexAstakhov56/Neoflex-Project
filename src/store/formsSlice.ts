import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TFormsState = {
  isPrescoringPosted: boolean;
  isScoringPosted: boolean;
  isOfferChosen: boolean;
  isDocumentPosted: boolean;
  isSignPosted: boolean;
  isCodePosted: boolean;
};

const initialState: TFormsState = {
  isPrescoringPosted: false,
  isScoringPosted: false,
  isOfferChosen: false,
  isDocumentPosted: false,
  isSignPosted: false,
  isCodePosted: false,
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setPrescoringPosted: (state, action: PayloadAction<boolean>) => {
      state.isPrescoringPosted = action.payload;
    },
    setScoringPosted: (state, action: PayloadAction<boolean>) => {
      state.isScoringPosted = action.payload;
    },
    setOfferChosen: (state, action: PayloadAction<boolean>) => {
      state.isOfferChosen = action.payload;
    },
    setDocumentPosted: (state, action: PayloadAction<boolean>) => {
      state.isDocumentPosted = action.payload;
    },
    setSignPosted: (state, action: PayloadAction<boolean>) => {
      state.isSignPosted = action.payload;
    },
    setCodePosted: (state, action: PayloadAction<boolean>) => {
      state.isCodePosted = action.payload;
    },
    resetFormsState: (state) => {
      state.isPrescoringPosted = false;
      state.isScoringPosted = false;
      state.isOfferChosen = false;
      state.isDocumentPosted = false;
      state.isSignPosted = false;
      state.isCodePosted = false;
    },
  },
});

export const {
  setPrescoringPosted,
  setScoringPosted,
  setOfferChosen,
  setDocumentPosted,
  setSignPosted,
  setCodePosted,
  resetFormsState,
} = formsSlice.actions;
export default formsSlice.reducer;
