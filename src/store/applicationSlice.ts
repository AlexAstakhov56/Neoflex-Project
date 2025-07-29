import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicationState {
  applicationId: number | null;
  currentStep: number;
  code: string;
}

const initialState: ApplicationState = {
  applicationId: null,
  currentStep: 1,
  code: "",
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplicationId: (state, action: PayloadAction<number>) => {
      state.applicationId = action.payload;
    },
    incrementStep: (state) => {
      state.currentStep += 1;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    resetApplicationState: (state) => {
      state.applicationId = null;
      state.currentStep = 1;
      state.code = "";
    },
  },
});

export const {
  setApplicationId,
  resetApplicationState,
  incrementStep,
  setStep,
  setCode,
} = applicationSlice.actions;

export default applicationSlice.reducer;
