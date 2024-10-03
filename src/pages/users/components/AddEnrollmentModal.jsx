import React, { useState } from "react";
import {
  Modal,
  Button,
  Input,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema untuk validasi
const enrollCourseSchema = z.object({
  course: z.string().nonempty("Please select a course"),
});

// Data enrolled courses
const enrolledCourses = [
  {
    title: "React for Beginners",
    status: "Enrolled",
    enrolledAt: "2024-01-01",
  },
  {
    title: "Advanced Node.js",
    status: "Completed",
    enrolledAt: "2023-11-01",
    completedAt: "2023-12-01",
  },
  // Add more courses here
];

const AddEnrollmentModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // React Hook Form setup with Zod validation
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(enrollCourseSchema),
    defaultValues: {
      course: "",
    },
  });

  // Filter courses berdasarkan searchTerm
  const filteredCourses = enrolledCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Course added:", data);
    setSearchTerm("");
    reset();
    onClose();
  };

  const onCloseInner = () => {
    setSearchTerm("");
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onCloseInner}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h2 className="text-xl font-semibold">Enroll Course</h2>
            </ModalHeader>
            <ModalBody>
              {/* Search Bar */}
              <Input
                placeholder="Search course..."
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />

              {/* List of Courses */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="course"
                  control={control}
                  render={({ field }) => (
                    <div className="mt-4 space-y-2">
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                          <div
                            key={course.title}
                            className="flex items-center justify-between"
                          >
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                value={course.title}
                                checked={field.value === course.title}
                                onChange={field.onChange}
                              />
                              <span>{course.title}</span>
                            </label>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No courses found.</p>
                      )}
                    </div>
                  )}
                />

                {/* Error message */}
                {errors.course && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.course.message}
                  </p>
                )}

                {/* Action buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                  <Button color="danger" variant="light" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Add
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddEnrollmentModal;
