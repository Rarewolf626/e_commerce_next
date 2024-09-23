/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/axios/axiosInstance";

export const createUser = async (payload: any) => {
    try {
        const res = await axiosInstance.post("/auth/create-user", payload);
        return res.data;
    } catch (error) {
        return error
    }
};
export const loginUser = async (payload: any) => {
    try {
        const res = await axiosInstance.post("/auth/login", payload);
        return res.data;
    } catch (error) {
        return error
    }
};