import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name : "counter",
    initialState : {
        counters : {},
    },
    reducers : {

        increment : (state, action) => {
         const id = action.payload
         if (!state.counters[id]) {
            state.counters[id] = 0
         }
         state.counters[id] += 1
        },

        dicrement : (state, action) => {
            const id = action.payload
            if (!state.counters[id]) {
                state.counters[id] = 0
            }
            state.counters[id] -= 1
        },

        incrementByAmount : (state, action) => {
           const {id , amount} = action.payload
           if (!state.counters[id]) {
            state.counters[id] = 0
           }
           state.counters[id] += amount
        },

        resetAmount : (state, action) => {
            const id = action.payload
            state.counters[id] = 0
        }
        
    }
})

export const {increment, dicrement, incrementByAmount, resetAmount} = counterSlice.actions

export default counterSlice.reducer