import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
  const {data} = await axios.get('/posts')
  return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags',async ()=>{
  const {data} = await axios.get('/tags')
  return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost',async (id)=>{
  return axios.delete(`posts/${id}`)
})

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    Status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers:{
    //
    [fetchPosts.pending]: (state,actions)=>{
      state.posts.items = []
      state.posts.status='loading'
    },
    [fetchPosts.fulfilled]: (state,actions)=>{
      state.posts.items = actions.payload
      state.posts.status='loaded'
    },
    [fetchPosts.rejected]: (state,actions)=>{
      state.posts.items = []
      state.posts.status='error'
    },
    //
    [fetchTags.pending]: (state,actions)=>{
      state.tags.items = []
      state.tags.status='loading'
    },
    [fetchTags.fulfilled]: (state,actions)=>{
      state.tags.items = actions.payload
      state.tags.status='loaded'
    },
    [fetchTags.rejected]: (state,actions)=>{
      state.tags.items = []
      state.tags.status='error'
    },
    //
    [fetchRemovePost.pending]:(state,action)=>{
      state.posts.items = state.posts.items.filter(a =>a._id !== action.meta.arg)
    },
  }
});

export const postsReducer = postsSlice.reducer;
