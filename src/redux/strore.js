import { authReducer } from "./slices/auth";
import { postsReducer } from "./slices/posts";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
