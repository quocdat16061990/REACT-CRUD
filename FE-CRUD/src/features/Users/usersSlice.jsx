import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../core/service/http'

const initialState = {
    userList: [],
    editingUser: null,
    loading: false,
    currentRequestId: undefined
  };
  
  export const getUserList = createAsyncThunk('user/getUserList', async (_, thunkAPI) => {
    const response = await http.get('user', {
      signal: thunkAPI.signal
    });
  
    return response?.data;
  });
  
  export const createUser = createAsyncThunk('user/createUser', async (body, thunkAPI) => {
    const response = await http.post('user', body, {
      signal: thunkAPI.signal
    });
    return response.data;
  });
  
  export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ userId, body }, thunkAPI) => {
      try {
        const response = await http.put(`user/${userId}`, body, {
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
  
  export const deleteUser = createAsyncThunk('user/deleteUser', async (userId, thunkAPI) => {
    const response = await http.delete(`user/${userId}`, {
      signal: thunkAPI.signal
    });
    return response.data;
  });
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      startEditingUser: (state, action) => {
  
        const userId = action.payload;
        const foundUser = state.userList.find((user) => user.id === userId) || null;
        state.editingUser = foundUser;
  
  
      },
      cancelEditingUser: (state) => {
        state.editingUser = null;
      }
    },
    extraReducers(builder) {
      builder
        .addCase(getUserList.fulfilled, (state, action) => {
          state.userList = action.payload;
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.userList.push(action.payload)
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.userList.find((user, index) => {
            if (user.id === action.payload.id) {
              state.userList[index] = action.payload
              return true
            }
            return false
          })
          state.editingUser = null
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          const userId = action.meta.arg
          const deleteUserIndex = state.userList.findIndex((user) => user.id === userId)
          if (deleteUserIndex !== -1) {
            state.userList.splice(deleteUserIndex, 1)
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
        .addDefaultCase((state, action) => {
  
        });
    }
  });
  
  export const { startEditingUser, cancelEditingUser  } = userSlice.actions;
  
  const userReducer = userSlice.reducer;
  
  export default userReducer;

  