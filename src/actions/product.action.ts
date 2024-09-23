import axiosInstance from "@/axios/axiosInstance";

export async function getAllProduct() {
    try {
        const res = await axiosInstance.get("/products");
        return res.data;
    } catch (error) {
        return error;
    }
}

export async function getSingleProduct(productId: string) {
    try {
        const response = await fetch(
            `http://localhost:8000/api/products/${productId}`
        );

        const result = await response.json();

        return result;
    } catch (error) {
        return "failed";
    }
}