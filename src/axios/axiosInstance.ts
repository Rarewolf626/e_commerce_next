/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    getAccessTokenFromLocalStorage,
    saveAccessTokenInLocalStorage,
} from "@/helperUtils/localstorage";
import axios, { AxiosResponse } from "axios";

export type GenericResProps<T> = {
    status: number;
    success: boolean;
    message: string;
    data: T;
    token: string;
};

export type GenericErrorProps = {
    status: number;
    success: false;
    message: string;
    error: any;
};

// utils/axiosInstance.ts

const axiosInstance = axios.create({
    baseURL: process.env.SERVER_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessTokenFromLocalStorage();
        config.headers["Authorization"] = token;
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {

        // Transform the response data while keeping the original AxiosResponse structure
        const transformedResponse: AxiosResponse<GenericResProps<any>> = {
            ...response,
            data: {
                status: response.status,
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                token: response.data.accessToken,
            },
        };
        return transformedResponse;
    },
    async (error) => {
        console.log(error);

        const originalRequest = error.config;
        if (error.response?.data?.message === "jwt expired") {
            console.log("JWT expired, attempting to refresh token");

            try {
                // Fetch the refresh token from cookies

                // Request to refresh the token
                const refreshResponse = await axios.get(
                    `${process.env.SERVER_URL}/auth/refresh-token`,

                    {
                        withCredentials: true,
                    }
                );

                console.log("refresh token generate", refreshResponse.data);

                // Save new access token
                saveAccessTokenInLocalStorage(refreshResponse.data.accessToken);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        const errorResponse: GenericErrorProps = {
            status: error.response?.data?.status || 500,
            success: error.response?.data?.success || false,
            message: error.response?.data?.message || "Something happened",
            error: error.response?.data?.error || null,
        };
        return Promise.reject(errorResponse);
    }
);

export default axiosInstance;
