import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/users";
import commentReducer from "./reducers/comments";
import postApi from "../api/postApi";

const store = configureStore({
  reducer: {
    users: userReducer,
    comments: commentReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(postApi.middleware),
});

export default store;
