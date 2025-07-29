import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOfferData } from "../types/TOfferData.type";

interface OfferState {
  offers: TOfferData[];
}

const initialState: OfferState = {
  offers: [],
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<TOfferData[]>) => {
      state.offers = action.payload;
    },
    clearOffers: (state) => {
      state.offers = [];
    },
  },
});

export const { setOffers, clearOffers } = offersSlice.actions;
export default offersSlice.reducer;
