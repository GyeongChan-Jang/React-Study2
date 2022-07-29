import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const useSign = createAsyncThunk('user/signup', async (signupInfo: UserSign) => {
  const reponseData = await
})