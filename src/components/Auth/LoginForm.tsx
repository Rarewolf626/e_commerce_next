"use client";
import { FieldValues } from "react-hook-form";
import useLoginStore from "../hooks/useLoginStore";
import useRegisterStore from "../hooks/useRegisterStore";
import { Modal } from "../modals/Modals";
import { DialogFooter } from "../ui/dialog";
import UseForm from "../useForm/UseForm";
import { UseInputField } from "../useForm/UseInputField";
import { UsePasswordInput } from "../useForm/UsePasswordInput";
import { z } from "zod";
import { Button } from "../ui/button";
import LoadingButton from "../helperComponets/LoadingButton";
import { toast } from "sonner";
import { useState } from "react";
import { loginUser } from "@/actions/auth.action";
import { useAppDispatch } from "@/redux/hooks";
import { addUser } from "@/redux/slices/auth.slice";
import { saveAccessTokenInLocalStorage } from "@/helperUtils/localstorage";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginForm = () => {
  const { isOpen, onClose } = useLoginStore();
  const { onOpen } = useRegisterStore();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleRegisterModal = () => {
    onClose();
    onOpen();
  };

  const handleFormSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const res = await loginUser(data);

      if (res.data) {
        //  store user info in redux store:
        saveAccessTokenInLocalStorage(res.token);
        dispatch(
          addUser({
            token: res.token,
            user: res.data,
          })
        );
        toast.message(res.message);
        setIsLoading(false);
        onClose();
      } else {
        toast.message(res.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("login page error", error);
    }
  };

  return (
    <Modal
      description="Enter your credentials to login"
      isOpen={isOpen}
      onClose={onClose}
      title="Login"
    >
      <main className="overflow-y-auto max-h-[70vh] overflow-hidden px-2 ">
        <UseForm onFormSubmit={handleFormSubmit} schema={loginSchema}>
          <UseInputField
            key={"email"}
            name="email"
            type="text"
            placeholder="Enter your Email"
            label="Write you Email"
          />
          <UsePasswordInput
            key={"password"}
            name="password"
            placeholder="Enter your Password"
            label="Write you Password"
          />
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit" className="w-full">
              Submit
            </Button>
          )}
        </UseForm>
      </main>
      <DialogFooter className="text-center text-sm text-gray-600">
        Create an account?
        <span
          onClick={handleRegisterModal}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Register
        </span>
      </DialogFooter>
    </Modal>
  );
};

export default LoginForm;
