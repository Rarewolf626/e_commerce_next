"use client";
import { FieldValues } from "react-hook-form";
import useLoginStore from "../hooks/useLoginStore";
import useRegisterStore from "../hooks/useRegisterStore";
import { Modal } from "../modals/Modals";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import UseForm from "../useForm/UseForm";
import { UseInputField } from "../useForm/UseInputField";
import { UsePasswordInput } from "../useForm/UsePasswordInput";
import { UseFileField } from "../useForm/UseFileField";
import { convertFormData } from "@/helperUtils/convertFormData";
import { createUser } from "@/actions/auth.action";
import { toast } from "sonner";
import { useState } from "react";
import LoadingButton from "../helperComponets/LoadingButton";

const RegisterForm = () => {
  const { isOpen, onClose } = useRegisterStore();
  const { onOpen } = useLoginStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginModelOpen = () => {
    onClose();
    onOpen();
  };

  const handleFormSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const { photo, ...payload } = data;
      const formData = convertFormData({ payload: payload, file: photo });
      const res = await createUser(formData);
      if (res.data) {
        toast.message("User created successfully");
        setIsLoading(false);
        onClose();
        onOpen();
      } else {
        toast.message(res.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("register page error", error);
    }
  };

  return (
    <Modal
      description="Create your account"
      isOpen={isOpen}
      onClose={onClose}
      title="Register"
    >
      <main className="overflow-y-auto max-h-[70vh] overflow-hidden px-2 ">
        <UseForm onFormSubmit={handleFormSubmit}>
          <UseInputField
            key={"name"}
            name="name"
            type="text"
            placeholder="Enter your Name"
            label="Write you Name"
          />
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
          <UseFileField name="photo" type="file" label="Upload your photo" />
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button className="w-full" type="submit">
              Create Account
            </Button>
          )}
        </UseForm>
      </main>
      <DialogFooter>
        <p>
          Already have an account?
          <span
            onClick={handleLoginModelOpen}
            className="cursor-pointer text-blue-600"
          >
            Login
          </span>
        </p>
      </DialogFooter>
    </Modal>
  );
};

export default RegisterForm;
