import React, { Suspense } from "react";
import LoginForm from "./components/login-form";

const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
