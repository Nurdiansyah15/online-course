import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Textarea } from "@nextui-org/react";
import { MuiColorInput, matchIsValidColor } from "mui-color-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema for validation using zod
const settingSchema = z.object({
  appName: z.string().min(1, "Application name is required"),
  description: z.string().min(1, "Description is required"),
  primaryColor: z.string().min(1, "Primary color is required"),
  secondaryColor: z.string().min(1, "Secondary color is required"),
  tertiaryColor: z.string().min(1, "Tertiary color is required"),
  videoUrl: z.string().url("Please enter a valid video URL"),
  contactNumber: z.string().min(1, "WhatsApp number is required"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(1, "Address is required"),
  logo: z.any(),
});

const defaultValues = {
  appName: "",
  description: "",
  primaryColor: "#000000",
  secondaryColor: "#ffffff",
  tertiaryColor: "#ff0000",
  videoUrl: "",
  contactNumber: "",
  email: "",
  address: "",
  logo: null,
};

export default function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(settingSchema),
    defaultValues,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const values = watch();

  // Watch for changes in form values and determine if any field has been modified
  useEffect(() => {
    const hasChanged = Object.keys(defaultValues).some(
      (key) => values[key] !== defaultValues[key]
    );
    setIsChanged(hasChanged);
  }, [values]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleCancel = () => {
    reset(defaultValues); // Reset form to default values
    setLogoPreview(null); // Reset the logo preview as well
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
      {/* Column 1 */}
      <div>
        <h3 className="text-xl font-bold mb-2">Application Settings</h3>
        {/* Application Name Input */}
        <div className="mb-4">
          <label className="block mb-2 text-black">Application Name:</label>
          <Controller
            name="appName"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter application name" />
            )}
          />
          {errors.appName && (
            <p className="text-danger">{errors.appName.message}</p>
          )}
        </div>

        {/* Application Description */}
        <div className="mb-4">
          <label className="block mb-2 text-black">
            Application Description:
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Enter application description"
              />
            )}
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>

        {/* Color Pickers */}
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block mb-2 text-black">Primary Color:</label>
            <Controller
              name="primaryColor"
              control={control}
              rules={{ validate: matchIsValidColor }}
              render={({ field }) => <MuiColorInput {...field} format="hex" />}
            />
            {errors.primaryColor && (
              <p className="text-danger">{errors.primaryColor.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-black">Secondary Color:</label>
            <Controller
              name="secondaryColor"
              control={control}
              rules={{ validate: matchIsValidColor }}
              render={({ field }) => <MuiColorInput {...field} format="hex" />}
            />
            {errors.secondaryColor && (
              <p className="text-danger">{errors.secondaryColor.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-black">Tertiary Color:</label>
            <Controller
              name="tertiaryColor"
              control={control}
              rules={{ validate: matchIsValidColor }}
              render={({ field }) => <MuiColorInput {...field} format="hex" />}
            />
            {errors.tertiaryColor && (
              <p className="text-danger">{errors.tertiaryColor.message}</p>
            )}
          </div>
        </div>

        {/* Video URL Input */}
        <div className="mb-4">
          <label className="block mb-2 text-black">Video URL:</label>
          <Controller
            name="videoUrl"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter video URL" />
            )}
          />
          {errors.videoUrl && (
            <p className="text-danger">{errors.videoUrl.message}</p>
          )}
        </div>

        {/* Contact Information */}
        <h3 className="text-xl font-bold mb-2">Contact Information</h3>

        <div className="mb-4">
          <label className="block mb-2 text-black">WhatsApp Number:</label>
          <Controller
            name="contactNumber"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter WhatsApp number" />
            )}
          />
          {errors.contactNumber && (
            <p className="text-danger">{errors.contactNumber.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-black">Email:</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter email" />
            )}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-black">Address:</label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Textarea {...field} placeholder="Enter address" />
            )}
          />
          {errors.address && (
            <p className="text-danger">{errors.address.message}</p>
          )}
        </div>
      </div>

      {/* Column 2 */}
      <div>
        <h3 className="text-xl font-bold mb-2">Application Logo</h3>

        <div className="mb-4">
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e.target.files[0]);
                    handleLogoChange(e);
                  }}
                />
                {logoPreview && (
                  <div className="mt-4">
                    <p className="font-bold">Logo Preview:</p>
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="h-24"
                    />
                  </div>
                )}
              </div>
            )}
          />
          {errors.logo && <p className="text-danger">{errors.logo.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-start mt-8">
          <Button
            type="submit"
            color="primary"
            className="mr-4"
            disabled={!isChanged} // Disable save button if no changes
          >
            Save Changes
          </Button>
          {isChanged && (
            <Button
              type="button"
              color="default"
              onClick={handleCancel} // Show cancel button only if changes are made
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
