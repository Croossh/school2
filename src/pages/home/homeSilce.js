import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  first: true,
  initMoney: 50,
  selectMoney: 0,

  noMoney: false,
  isReceipt: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    init: (state, action) => {
      state.selectMoney = 0;
      state.noMoney = false;
      state.isReceipt = false;
    },
    // show
    changeInitMoney: (state, action) => {
      const { money } = action.payload;

      state.initMoney = money;
    },
    changeSelectMoney: (state, action) => {
      const { money } = action.payload;

      state.selectMoney = money;
    },
    setFirstToFalse: (state, action) => {
      state.first = false;
    },
    setInitMoney: (state, action) => {
      const { money } = action.payload;

      state.initMoney = money;
    },
    calculateMoney: (state, action) => {
      let temp1 = state.initMoney;
      let temp2 = state.selectMoney;

      if (temp1 - temp2 >= 0) {
        state.initMoney = temp1 - temp2;
      } else {
        state.noMoney = true;
      }
    },
    receiptToTrue: (state, action) => {
      state.isReceipt = false;
    },
  },
});

export const {
  init,
  changeInitMoney,
  changeSelectMoney,
  setFirstToFalse,
  setInitMoney,
  calculateMoney,
  receiptToTrue,
} = homeSlice.actions;

export default homeSlice.reducer;
