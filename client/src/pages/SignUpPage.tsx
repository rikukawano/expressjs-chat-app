import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage: React.FC = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <SignUp afterSignUpUrl='/' />
    </div>
  );
};

export default SignUpPage;
