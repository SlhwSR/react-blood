import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductionList } from "@/service/modules/productionPlan";
export const getGoodsList = () => (dispatch) => {
  getProductionList().then((res) => {
    dispatch(saveOne(res.data.data));
  });
  // dispatch(saveOne(goods))
};
const GoodList = createSlice({
  name: "medicalGoods",
  initialState: {
    goodlist: [],
    mapList: [],
  },
  reducers: {
    add: (state, action) => {
      state.goodlist.push(action.payload);
    },
    deleteOne: (state, action) => {
      // console.log("哈哈"+ action.payload);
      state.goodlist.splice(action.payload - 1, 1);
    },
    updateOne: (state, action) => {
      state.goodlist[action.payload.key - 1] = action.payload;
    },
    saveOne: (state, action) => {
      state.goodlist = action.payload;
    },
  },
});
export const { add, deleteOne, updateOne, saveOne } = GoodList.actions;
export default GoodList.reducer;
