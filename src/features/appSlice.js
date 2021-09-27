import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const appSlice = createSlice({
  name: 'app',
  initialState:{
      roomId: null,
  },
  
  //reducers are like our mutations 
  reducers: {
    enterRoom: (state,action) => {
      state.roomId = action.payload.roomId;
    },
  },
});


//exporting the reducers(actions) to be executed
export const { enterRoom } = appSlice.actions;


//selector allows to get the value of the states similar to 
// getters in VUE
export const selectRoomId = (state) => state.app.roomId;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default appSlice.reducer;