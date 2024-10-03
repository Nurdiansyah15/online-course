import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Button, Checkbox, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Define validation schema using Zod
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().regex(/^\d+$/, "Price must be a number"),
  level: z.string().min(1, "Level is required"),
  categories: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().url("Invalid image URL"),
  active: z.boolean(),
});

export default function CreateForm({ onSubmit }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      {/* Name and Price (One Column) */}
      <div className="space-y-4">
        <div className="mb-5">
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
                placeholder="Enter course name"
                aria-invalid={!!errors.name}
              />
            )}
          />
          {errors.name && (
            <p className="text-danger text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Price
          </label>
          <Controller
            name="price"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                id="price"
                placeholder="Enter price"
                aria-invalid={!!errors.price}
              />
            )}
          />
          {errors.price && (
            <p className="text-danger text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
      </div>

      {/* Level and Categories (One Column) */}
      <div className="space-y-4">
        <div className="mb-5">
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Level
          </label>
          <Controller
            name="level"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select level"
                aria-invalid={!!errors.level}
              >
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </Select>
            )}
          />
          {errors.level && (
            <p className="text-danger text-sm mt-1">{errors.level.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Categories
          </label>
          <Controller
            name="categories"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select category"
                aria-invalid={!!errors.categories}
              >
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </Select>
            )}
          />
          {errors.categories && (
            <p className="text-danger text-sm mt-1">
              {errors.categories.message}
            </p>
          )}
        </div>
      </div>

      {/* Description (Full Width) */}
      <div className="col-span-2 mb-5">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              id="description"
              placeholder="Enter description"
              aria-invalid={!!errors.description}
            />
          )}
        />
        {errors.description && (
          <p className="text-danger text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Image URL (Full Width) */}
      <div className="col-span-2 mb-5">
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Image URL
        </label>
        <Controller
          name="imageUrl"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              id="imageUrl"
              placeholder="Enter image URL"
              aria-invalid={!!errors.imageUrl}
            />
          )}
        />
        {errors.imageUrl && (
          <p className="text-danger text-sm mt-1">{errors.imageUrl.message}</p>
        )}
      </div>

      {/* Active Checkbox */}
      <div className="col-span-2 mb-5">
        <Controller
          name="active"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox {...field} id="active" aria-invalid={!!errors.active}>
              Active
            </Checkbox>
          )}
        />
      </div>

      {/* Submit Button */}
      <div className="col-span-2">
        <Button type="submit" color="primary" className="w-full">
          Add
        </Button>
      </div>
    </form>
  );
}
