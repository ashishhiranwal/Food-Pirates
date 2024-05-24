import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [{id:'',price:0,quantity:0,name:'',pic:''}],
};
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1});
            }
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            if (state.items[index].quantity === 1) {
                state.items.splice(index, 1);
            } else {
                state.items[index].quantity--;
            }
        },
        emptyCart:(state,action)=>{
            state.items=[{id:'',price:0,quantity:0,name:'',pic:''}];
        }
    },
});

export const { addToCart, removeFromCart,emptyCart } = cartSlice.actions;
export default cartSlice.reducer;