import React from "react";
import { useAuth } from "@/context/authContext";

const SignIn: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <button
        onClick={signInWithGoogle}
        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
