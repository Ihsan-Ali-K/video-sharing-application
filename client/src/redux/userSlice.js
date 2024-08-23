import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {

            state.loading = true
        },
        loginSuccess: (state, action) => {

            state.loading = false;
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.loading = true

        },
        logout: (state, ) => {
            state.currentUser= null,
            state.loading= false,
            state.error= false
        },
        subscribe: (state, action) =>{
            if(state.currentUser){
                state.currentUser.subscribedUsers = [
                    ...state.currentUser.subscribedUsers,
                    action.payload
                    
                ]
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout, subscribe } = userSlice.actions

export default userSlice.reducer