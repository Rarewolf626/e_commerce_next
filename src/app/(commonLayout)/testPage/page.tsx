/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axiosInstance from "@/axios/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const textApi = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/testing");
      if (res && res.data) {
        setData(res.data.data);
      } else {
      }
    } catch (error: any) {
      if (error) {
        toast.error(error.message);
      } else {
        console.log("you code has problem");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    textApi();
  }, []);

  return <div>{loading ? "loading" : <>{data}</>}</div>;
};
export default Page;
