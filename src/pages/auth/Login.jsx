import React from "react";
import LoginImage from "../../assets/svg/LoginImage";
import Form from "./components/Form";

export default function Login() {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex min-w-1/2 gap-10 h-fit items-center">
        <div className="w-full h-full">
          <LoginImage width={350} />
        </div>
        <div className="w-full h-full flex items-start justify-start">
          <div className="max-w-md w-full space-y-8">
            <div>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold">Login</p>
                <div className="px-2 py-1 text-xs font-semibold text-white bg-primary rounded-full">
                  Admin
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Please login to your account
              </p>
              <Form onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
