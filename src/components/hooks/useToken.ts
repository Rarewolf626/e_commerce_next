import { useAppSelector } from "@/redux/hooks";

export const useToken = () => {
    const token = useAppSelector((state) => state.auth.auth?.token);
    return token;
};
