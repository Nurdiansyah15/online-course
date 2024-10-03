import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/input";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

// Schema untuk validasi menggunakan zod
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  about: z.string().min(1, "About is required"),
  price: z.number().min(0, "Price must be positive").optional(),
  level: z.string().min(1, "Level is required"),
  status: z.enum(["Active", "Inactive"]),
  totalEnrollment: z
    .number()
    .min(0, "Total Enrollment must be a positive number"),
});

export default function EditForm({ course, onCancel }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: course,
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold mb-2 text-primary">Edit Course</h2>

      <div className="mb-4">
        <label className="block mb-2 text-black" htmlFor="title">
          Title:
        </label>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              id="name"
              placeholder="Enter course name"
              aria-invalid={!!errors.name}
            />
          )}
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
        {/* Menampilkan error untuk title */}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-black" htmlFor="about">
          About:
        </label>
        <Controller
          name="about"
          control={control}
          render={({ field }) => <Textarea id="about" {...field} />}
        />
        {errors.about && <p className="text-danger">{errors.about.message}</p>}
        {/* Menampilkan error untuk about */}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-black" htmlFor="price">
          Price:
        </label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => <Input type="number" id="price" {...field} />}
        />
        {errors.price && <p className="text-danger">{errors.price.message}</p>}
        {/* Menampilkan error untuk price */}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-black" htmlFor="level">
          Level:
        </label>
        <Controller
          name="level"
          control={control}
          render={({ field }) => <Input type="text" id="level" {...field} />}
        />
        {errors.level && <p className="text-danger">{errors.level.message}</p>}
        {/* Menampilkan error untuk level */}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-black" htmlFor="status">
          Status:
        </label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <select
              id="status"
              {...field}
              className="w-full p-3 rounded-xl text-black bg-zinc-100 hover:bg-zinc-200"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          )}
        />
        {errors.status && (
          <p className="text-danger">{errors.status.message}</p>
        )}
        {/* Menampilkan error untuk status */}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-black" htmlFor="totalEnrollment">
          Total Enrollment:
        </label>
        <Controller
          name="totalEnrollment"
          control={control}
          render={({ field }) => (
            <Input type="number" id="totalEnrollment" {...field} />
          )}
        />
        {errors.totalEnrollment && (
          <p className="text-danger">{errors.totalEnrollment.message}</p>
        )}
        {/* Menampilkan error untuk totalEnrollment */}
      </div>

      <div className="flex justify-start mt-8">
        <button
          type="submit"
          disabled={!isDirty}
          className={`w-fit px-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mr-2 ${
            !isDirty && "opacity-50"
          }`}
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-fit px-4 bg-gray-300 text-black p-2 rounded hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
