import {
    createSlice,
    createAsyncThunk
  } from '@reduxjs/toolkit'
  const userInfo = createSlice({
    name: "medicalGoods",
    initialState: {
      info: {},
    //   mapList: []
    },
    reducers: {
      saveInfo: (state, action) => {
        state.info={...action.payload}
      },
      deleteOne: (state, action) => {
        // console.log("哈哈"+ action.payload);
        state.info={}
      },
    }
  })
  export const { saveInfo,deleteOne } = userInfo.actions
  export default userInfo.reducer
  