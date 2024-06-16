import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name : "filterProduct",
    initialState : {

    },
    reducers : {
        renderProduct : (state) => {

        },
        filterSearch : (state) => {

        },
        filterClick : (state) => {

        },
        filterMinMaxRange : (state) => {

        },
        

    }
})

export const {renderProduct, filterSearch, filterClick, filterMinMaxRange} = filterSlice.actions

export default filterSlice.reducer