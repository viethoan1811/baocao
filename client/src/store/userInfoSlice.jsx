import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status: false
}

export const userInfoSlide = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        updateUserInfo: (state, action) => {
            state.status = true;

        },
        resetUserInfo: (state) => {
           state.status = false;
        },

    },
})

// Action creators are generated for each case reducer function
export const {updateUserInfo, resetUserInfo} = userInfoSlide.actions

export default userInfoSlide.reducer