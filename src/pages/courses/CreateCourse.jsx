import React from "react";
import CreateForm from "./components/CreateForm";

export default function CreateCourse() {
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="bg-white dark:bg-dark-3 rounded-lg shadow-md p-6 text-primary dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      <CreateForm onSubmit={onSubmit} />
    </div>
  );
}
