import React, { Suspense } from "react";
import RegisterForm from "./components/register-form";

const RegisterPage = () => {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
};

export default RegisterPage;
