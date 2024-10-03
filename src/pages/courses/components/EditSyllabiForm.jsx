import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Editor from "../../../components/editor/Editor";

// Define Zod schema
const formSchema = z.object({
  title: z.string().min(1, "Name is required"),
  content: z.string().min(1, "Content is required"),
});

export default function EditSyllabiForm({ material, onCancel, onSubmit }) {
  const [triggerReset, setTriggerReset] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: material?.title || "",
      content: material?.content || "",
    },
  });

  const handleResetEditor = () => {
    setTriggerReset(true);
  };

  const handleReset = () => {
    handleResetEditor();
    reset(material);
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
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="title"
              placeholder="Enter name"
              className="w-full"
              status={errors.title ? "error" : "default"}
              helperText={errors.title?.message}
            />
          )}
        />
      </div>
      {errors.title && (
        <p className="text-danger mt-2 text-sm">{errors.title.message}</p>
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
            id={`syllabi-${material.title}`}
            onChange={(data) => {
              setValue("content", JSON.stringify(data), { shouldDirty: true });
            }}
            initialData={JSON.parse(material.content)}
            triggerReset={triggerReset}
            setTriggerReset={setTriggerReset}
          />
        </div>
      </div>
      {errors.content && (
        <p className="text-danger mt-2 text-sm">{errors.content.message}</p>
      )}

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-8">
        <Button auto flat color="default" onClick={handleReset} type="button">
          Reset
        </Button>
        <Button auto color="danger" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          disabled={!isDirty}
          className={!isDirty ? "opacity-50 cursor-not-allowed" : ""}
          auto
          type="submit"
          color="primary"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
