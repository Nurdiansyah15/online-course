import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Editor from "../../../components/editor/Editor";
import { useState } from "react";

// Define Zod schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  content: z.string().min(1, "Content is required"),
});

export default function CreateSyllabiForm({ onCancel, onSubmit }) {
  const [triggerClear, setTriggerClear] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleClearEditor = () => {
    setTriggerClear(true);
  };

  const handleReset = () => {
    handleClearEditor();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Name
        </label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              id="name"
              placeholder="Enter name"
              className="w-full"
              status={errors.name ? "error" : "default"}
              helperText={errors.name?.message}
            />
          )}
        />
      </div>
      {errors.name && (
        <p className="text-danger mt-2 text-sm">{errors.name.message}</p>
      )}

      {/* Content Field */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2 mt-4"
        >
          Content
        </label>
        <div className="w-full p-5 rounded-lg bg-zinc-100">
          <Editor
            id={"syllabi-creator"}
            onChange={(data) => {
              setValue("content", JSON.stringify(data));
            }}
            triggerClear={triggerClear}
            setTriggerClear={setTriggerClear}
          />
        </div>
        <Controller
          name="content"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea
              {...field}
              id="content"
              placeholder="Enter content"
              className="w-full hidden"
              status={errors.content ? "error" : "default"}
              helperText={errors.content?.message}
              rows={5}
            />
          )}
        />
      </div>
      {errors.content && (
        <p className="text-danger mt-2 text-sm">{errors.content.message}</p>
      )}

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-8">
        <Button auto flat color="default" onClick={handleReset} type="button">
          Clear
        </Button>
        <Button auto color="danger" onClick={onCancel}>
          Cancel
        </Button>
        <Button auto type="submit" color="primary">
          Save
        </Button>
      </div>
    </form>
  );
}
