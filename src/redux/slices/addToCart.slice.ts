/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Define cart item type
export type TCartItems = {
    _id: string;
    photo: string;
    name: string;
    category: string;
    stock: number;
    price: number;
    quantity: number;
};

// Define cart type
type TCart = {
    userId: string;
    total: number; // `total` should be a number for calculations
    cartItems: TCartItems[];
    lovedProducts: string[]; // Array of product IDs
};

// Initial state
const initialState: TCart = {
    userId: "",
    total: 0,
    cartItems: [],
    lovedProducts: [],
};

// Create cart slice
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Add item to cart
        addItemToCart: (state, action: PayloadAction<TCartItems>) => {
            const itemExists = state.cartItems.find(
                (item) => item._id === action.payload._id
            );

            if (itemExists) {
                toast.warning("Already added");
            } else {
                state.cartItems.push(action.payload);
                state.lovedProducts.push(action.payload._id); // Add product ID to lovedProducts
                toast.success("Item added to cart");
            }
        },

        // Remove item from cart by productId
        removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload.id
            );
            state.lovedProducts = state.lovedProducts.filter(
                (id) => id !== action.payload.id
            );
            toast.success("Item removed from cart");
        },

        // Increase item quantity in cart
        increaseQuantityReducer: (state, action: PayloadAction<{ id: string }>) => {
            const item = state.cartItems.find(
                (item) => item._id === action.payload.id
            );

            if (item) {
                if (item.quantity < item.stock) {
                    item.quantity += 1;
                }
                else {
                    return
                }
            }
        },

        // Decrease item quantity in cart
        decreaseQuantityReducer: (state, action: PayloadAction<{ id: string }>) => {
            const item = state.cartItems.find(
                (item) => item._id === action.payload.id
            );

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    return
                }
            }
        },


        // Calculate total price and quantity
        calculateTotal: (state) => {
            const { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const itemTotal = cartItem.price * cartItem.quantity;
                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartItem.quantity;
                    return cartTotal;
                },
                { total: 0, quantity: 0 }
            );

            state.total = total; // Updating the total in state
        },
    },
});

// Export actions
export const { addItemToCart, removeItemFromCart, calculateTotal, increaseQuantityReducer, decreaseQuantityReducer } =
    cartSlice.actions;

// Export the reducer
export default cartSlice;
