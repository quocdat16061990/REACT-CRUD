import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../core/service/http'

const initialState = {
  postList: [],
  editingPost: null,
  loading: false,
  currentRequestId: undefined
};

export const getPostList = createAsyncThunk('post/getPostList', async (_, thunkAPI) => {
  const response = await http.get('posts', {
    signal: thunkAPI.signal
  });

  return response?.data;
});

export const createPost = createAsyncThunk('post/createPost', async (body, thunkAPI) => {
  const response = await http.post('posts', body, {
    signal: thunkAPI.signal
  });
  return response.data;
});

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async ({ postId, body }, thunkAPI) => {
    try {
      const response = await http.put(`posts/${postId}`, body, {
        signal: thunkAPI.signal
      });
      return response.data;
    } catch (error) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const deletePost = createAsyncThunk('post/deletePost', async (postId, thunkAPI) => {
  const response = await http.delete(`posts/${postId}`, {
    signal: thunkAPI.signal
  });
  return response.data;
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    startEditingPost: (state, action) => {
      const postId = action.payload;
      const foundPost = state.postList.find((post) => post.id === postId) || null;
      state.editingPost = foundPost;
    },
    cancelEditingPost: (state) => {
      state.editingPost = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postList.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postList.find((post, index) => {
          if (post.id === action.payload.id) {
            state.postList[index] = action.payload;
            return true;
          }
          return false;
        });
        state.editingPost = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.meta.arg;
        const deletePostIndex = state.postList.findIndex((post) => post.id === postId);
        if (deletePostIndex !== -1) {
          state.postList.splice(deletePostIndex, 1);
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        }
      )
      .addDefaultCase((state, action) => {});
  }
});

export const { startEditingPost, cancelEditingPost } = postSlice.actions;

const postReducer = postSlice.reducer;

export default postReducer;