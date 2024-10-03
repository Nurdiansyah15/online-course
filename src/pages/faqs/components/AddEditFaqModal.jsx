import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema for validation
const faqSchema = z.object({
  question: z.string().nonempty("Question is required"),
  answer: z.string().nonempty("Answer is required"),
});

const AddEditFAQModal = ({ isOpen, onClose, initialData }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const watchAllFields = watch();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    if (initialData) {
      // Edit existing FAQ
      console.log("FAQ edited:", data);
    } else {
      // Add new FAQ
      console.log("FAQ added:", data);
    }
    reset();
    onClose();
  };

  const onCloseInner = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onCloseInner}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h2 className="text-xl font-semibold">
                {initialData ? "Edit FAQ" : "Add FAQ"}
              </h2>
            </ModalHeader>
            <ModalBody>
              {/* FAQ Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Question Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black mb-2">
                    Question
                  </label>
                  <Controller
                    name="question"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter the question"
                        fullWidth
                        status={errors.question ? "error" : "default"}
                      />
                    )}
                  />
                  {errors.question && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.question.message}
                    </p>
                  )}
                </div>

                {/* Answer Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black mb-2">
                    Answer
                  </label>
                  <Controller
                    name="answer"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter the answer"
                        fullWidth
                        status={errors.answer ? "error" : "default"}
                      />
                    )}
                  />
                  {errors.answer && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.answer.message}
                    </p>
                  )}
                </div>

                {/* Action buttons */}
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onClick={onClose}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    disabled={!isDirty} // Disable the save button if no changes
                  >
                    Save
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddEditFAQModal;
