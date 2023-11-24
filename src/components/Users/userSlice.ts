import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { getUsersFromLS } from "../../utils/getUsersFromLS";

interface userState {
    localUsers: User[];
    users: User[];
    popupOpen: boolean;
    changeUser: boolean;
    selctedUserIndex: number;
    currentCard: number;
}

const initialState: userState = {
    localUsers: getUsersFromLS(),
    users: [
        {
            id: 1,
            firstName: "Steve",
            lastName: "Jobs",
            index: 0,
        },
        {
            id: 2,
            firstName: "Senior",
            lastName: "Saez",
            index: 1,
        },
        {
            id: 3,
            firstName: "Roney",
            lastName: "Coleman",
            index: 2,
        },
    ],
    popupOpen: false,
    changeUser: false,
    selctedUserIndex: 0,
    currentCard: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.localUsers.push(action.payload);
        },
        deleteUser: (state, action) => {
            console.log(action.payload);
            state.localUsers = state.localUsers.filter(
                (el) => el.id !== action.payload
            );
        },
        togglePopup: (state) => {
            state.popupOpen = !state.popupOpen;
        },
        toggleChangeUser: (state, action) => {
            state.changeUser = action.payload;
        },
        changeUserData: (state, action) => {
            state.localUsers[action.payload.index] = action.payload.data;
        },
        selectUser: (state, action) => {
            state.selctedUserIndex = action.payload;
        },
        userListFilter: (state, action) => {
            [
                state.localUsers[action.payload],
                state.localUsers[state.currentCard],
            ] = [
                state.localUsers[state.currentCard],
                state.localUsers[action.payload],
            ];
        },
        setCurrentCard: (state, action) => {
            state.currentCard = action.payload;
        },
    },
});

export default userSlice.reducer;

export const {
    addUser,
    deleteUser,
    toggleChangeUser,
    togglePopup,
    selectUser,
    changeUserData,
    userListFilter,
    setCurrentCard,
} = userSlice.actions;
