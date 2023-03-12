import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const getComments = createAsyncThunk("posts/getComments", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data = await res.json();
  return data;
});

const commentEntity = createEntityAdapter({
  selectId: (comment) => comment.id,
});

const commentSlice = createSlice({
  name: "comment",
  initialState: commentEntity.getInitialState({
    loading: "idel",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        commentEntity.addMany(state, action.payload);
        state.loading = "completed";
      }
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.loading = "rejected";
    });
  },
});

export const {
  selectAll: selectAllComments,
  selectById: selectByIdComments,
  selectEntities: selectEntitiesComments,
  selectIds: selectIdsComments,
  selectTotal: selectTotalComments,
} = commentEntity.getSelectors((store) => store.comments);

export default commentSlice.reducer;
