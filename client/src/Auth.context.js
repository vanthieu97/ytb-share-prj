import React, { useReducer } from 'react'
import axios from './axios-settings'

const LOADING = 'LOADING'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const AUTH_FAIL = 'AUTH_FAIL'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'LOGOUT_FAIL'

const initialState = {
  loggedIn: false,
  loading: false,
  email: '',
  error: null,
}

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case LOADING:
      return { ...state, loading: true, error: null }
    case AUTH_SUCCESS:
      return { ...state, loading: false, loggedIn: payload.loggedIn, email: payload.email }
    case AUTH_FAIL:
      return { ...state, loading: false }
    case LOGIN_SUCCESS:
      return { ...state, loading: false, email: payload.email, loggedIn: true }
    case LOGIN_FAIL:
      return { ...state, loading: false, error: payload }
    case LOGOUT_SUCCESS:
      return { ...state, loading: false, email: null, loggedIn: false }
    case LOGOUT_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}

export const AuthContext = React.createContext(initialState)

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const auth = async () => {
    dispatch({ type: LOADING })
    try {
      const { data } = await axios.post('http://localhost:3018/auth')
      if (data && data.email) {
        dispatch({ type: AUTH_SUCCESS, payload: data })
      }
      dispatch({ type: AUTH_FAIL })
    } catch (error) {
      console.error('Auth error: ', error)
    }
  }

  const login = async (params) => {
    dispatch({ type: LOADING })
    try {
      const { data } = await axios.post('http://localhost:3018/auth/login', params, { withCredentials: true })
      dispatch({ type: LOGIN_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error })
    }
  }

  const logout = async () => {
    dispatch({ type: LOADING })
    try {
      await axios.post('http://localhost:3018/auth/logout')
      dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error })
    }
  }

  return <AuthContext.Provider value={{ state, auth, login, logout }}>{children}</AuthContext.Provider>
}

export default ContextProvider
