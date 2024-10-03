import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Form({ onSubmit }) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1"
                aria-invalid={!!errors.email}
              />
            )}
          />
          {errors.email && (
            <p className="text-danger text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                id="password"
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="mt-1"
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                aria-invalid={!!errors.password}
              />
            )}
          />
          {errors.password && (
            <p className="text-danger text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <Button color="primary" className="w-fit" type="submit">
        Login
      </Button>
    </form>
  );
}
