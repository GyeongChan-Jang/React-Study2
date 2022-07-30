import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '../firebase'

interface UserSign {
  userData: {
    email: string
    password: string
    returnSecureToken: boolean
  }
}
export interface UserPayload {
  email: string
  refreshToken: string
  expiresIn: string
  expirationDate: number
}

interface UserState {
  loading: boolean
  error: string | undefined
  userData: {
    email: string
    refreshToken: string
    expiresIn: string
    displayName?: string
    expirationDate: number
  }
}

const initialState: UserState = {
  loading: false,
  error: '',
  userData: {
    email: '',
    refreshToken: '',
    expiresIn: '',
    expirationDate: 0
  }
}

export const userSign = createAsyncThunk<UserPayload, UserSign>(
  'user/signup',
  async (signupInfo: UserSign) => {
    const responseData = await createUserWithEmailAndPassword(
      auth,
      signupInfo.userData.email,
      signupInfo.userData.password
    )

    const tokenExpiration: number = new Date().getTime() + 100000

    const data: UserPayload = {
      email: responseData.user.email!,
      refreshToken: responseData.user.refreshToken,
      expiresIn: '3600',
      expirationDate: tokenExpiration
    }
    return data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedin(state: UserState, action: PayloadAction<UserState['userData']>) {
      state.userData = {
        email: action.payload.email,
        refreshToken: action.payload.email,
        expiresIn: action.payload.expiresIn,
        expirationDate: new Date().getTime() + 50000
      }
    },
    logout(state: UserState) {
      localStorage.removeItem('user')
      state.error = undefined
      state.loading = false
      state.userData = {
        email: '',
        refreshToken: '',
        expiresIn: '',
        expirationDate: 0
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userSign.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    })
    builder.addCase(userSign.rejected, (state, action) => {
      if (action.payload) {
        state.loading = false
        // state.error = action.payload.message
      } else {
        state.loading = false
        state.error = 'something wrong'
      }
    })
    builder.addCase(userSign.pending, (state, action) => {
      state.loading = true
    })
  }
})

export const userSignReducer = userSlice.reducer
