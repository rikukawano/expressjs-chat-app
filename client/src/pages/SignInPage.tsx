import React from "react";
import { SignIn } from "@clerk/clerk-react";

const SignInPage: React.FC = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <SignIn afterSignInUrl='/'/>
    </div>
  );
};

export default SignInPage;
