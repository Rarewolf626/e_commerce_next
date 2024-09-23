"use client";

import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import useLoginStore from "@/components/hooks/useLoginStore";
import useRegisterStore from "@/components/hooks/useRegisterStore";
const AuthModal = () => {
  const { isOpen: register } = useRegisterStore();
  const { isOpen: login } = useLoginStore();
  return (
    <>
      {login && <LoginForm />}
      {register && <RegisterForm />}
    </>
  );
};
export default AuthModal;
