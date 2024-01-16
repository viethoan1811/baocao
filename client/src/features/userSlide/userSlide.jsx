import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    access_token: '',
    isAdmin: false,
    phone: '',
    id: '',
    sex: 'Nam',
    note: '',
    address: '' 
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {isAdmin, name = '', email = '', access_token , _id = '', phoneNumber = '',sex = "", note, address } = action.payload
            state.name = name;
            state.email = email;
            state.id = _id;
            state.phone = phoneNumber
            state.access_token = access_token;
            state.isAdmin= isAdmin;
            state.sex = sex;
            state.note = note;
            state.address = address  
        },
        resetUser: (state) => {
            state.name = "";
            state.email = "";
            state.access_token = "";
            state.id = "";
            state.phone = "";
            state.isAdmin= false;
            state.sex = 'Nam';
            state.note =  "";
            state.address =  ""
        },

    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer