import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("posts/getUsers", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data;
});

const userEntity = createEntityAdapter({
  selectId: (user) => user.id,
});

const userSlice = createSlice({
  name: "user",
  initialState: userEntity.getInitialState({
    loading: "idel",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        userEntity.addMany(state, action.payload);
        state.loading = "completed";
      }
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = "rejected";
    });
  },
});

export const {
  selectAll: selectAllUsers,
  selectById: selectByIdUsers,
  selectEntities: selectEntitiesUsers,
  selectIds: selectIdsUsers,
  selectTotal: selectTotalUsers,
} = userEntity.getSelectors((store) => store.users);

export default userSlice.reducer;
