import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import { ChevronDown, Edit, Trash } from "lucide-react";
import { useState } from "react";
import CreateSyllabiForm from "./components/CreateSyllabiForm";
import DetailSyllabi from "./components/DetailSyllabi";
import EditForm from "./components/EditForm";

const course = {
  title: "Web Development Bootcamp",
  imageUrl:
    "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  about:
    "This is an intensive web development course covering HTML, CSS, JavaScript, and more. This is an intensive web development course covering HTML, CSS, JavaScript, and more .",
  price: 299,
  level: "Beginner",
  status: "Active",
  totalEnrollment: 120,
  materials: [
    {
      title: "Introduction to React",
      content: JSON.stringify({
        time: 1635603431943,
        blocks: [
          {
            id: "sheNwCUP5A",
            type: "header",
            data: {
              text: "Editor.js",
              level: 2,
            },
          },
          {
            id: "12iM3lqzcm",
            type: "paragraph",
            data: {
              text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
            },
          },
          {
            id: "fvZGuFXHmK",
            type: "header",
            data: {
              text: "Key features",
              level: 3,
            },
          },
          {
            id: "xnPuiC9Z8M",
            type: "list",
            data: {
              style: "unordered",
              items: [
                "It is a block-styled editor",
                "It returns clean data output in JSON",
                "Designed to be extendable and pluggable with a simple API",
              ],
            },
          },
          // Tambahkan block lainnya sesuai kebutuhan
        ],
      }),
    },
    {
      title: "Introduction to Next.js",
      content: JSON.stringify({
        time: 1727864501861,
        blocks: [
          {
            id: "sheNwCUP5A",
            type: "header",
            data: {
              text: "Editor.js",
              level: 2,
            },
          },
          {
            id: "12iM3lqzcm",
            type: "paragraph",
            data: {
              text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
            },
          },
          {
            id: "fvZGuFXHmK",
            type: "header",
            data: {
              text: "Key features",
              level: 3,
            },
          },
          {
            id: "xnPuiC9Z8M",
            type: "list",
            data: {
              style: "unordered",
              items: [
                "It is a block-styled editor",
                "It returns clean data output in JSON",
                "Designed to be extendable and pluggable with a simple API",
              ],
            },
          },
          // {
          //   id: "gL-GdMfDjp",
          //   type: "youtubeEmbed",
          //   data: {
          //     url: "https://www.youtube.com/watch?v=opI6dScRQzQ",
          //   },
          // },
        ],
        version: "2.30.6",
      }),
    },
  ],
};

export default function DetailCourse() {
  const {
    title,
    imageUrl,
    about,
    price,
    level,
    status,
    totalEnrollment,
    materials,
  } = course;

  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddSyllabiForm, setAddShowSyllabiForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditCourse() {
    setShowEditForm(!showEditForm);
    setIsEditing(!showEditForm);
  }

  function handleAddMaterial() {
    setAddShowSyllabiForm(!showAddSyllabiForm);
    setIsEditing(!showAddSyllabiForm);
  }

  function handleSubmitAddMaterial(formData) {
    console.log(formData);
    handleAddMaterial();
  }

  function handleDeleteCourse() {
    console.log("Delete course");
  }

  return (
    <div className="bg-white dark:bg-dark-3 rounded-lg shadow-md p-6 text-primary dark:text-white">
      <div className="flex justify-center my-10 gap-10">
        <div className="h-[300px] w-[300px] rounded-lg overflow-hidden dark:bg-dark-2">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="flex flex-col rounded-lg dark:bg-dark-2 w-2/3">
          {showEditForm ? (
            <EditForm course={course} onCancel={handleEditCourse} />
          ) : (
            <div>
              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <div className="flex  mb-5">
                <p className="text-gray-600 dark:text-gray-300">{about}</p>
              </div>
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Price:</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    ${price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Level:</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {level}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total Enrollment:</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {totalEnrollment}
                  </span>
                </div>
              </div>
            </div>
          )}

          {!showEditForm && (
            <div className="flex justify-end mt-4">
              <Tooltip content="Edit Course" delay={500}>
                <button
                  className="text-blue-500 hover:text-blue-700 mr-4"
                  onClick={handleEditCourse}
                  disabled={isEditing} // Disable jika sedang ada form yang dibuka
                >
                  <Edit size={24} />
                </button>
              </Tooltip>
              <Tooltip content="Delete Course" delay={500}>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={handleDeleteCourse}
                  disabled={isEditing} // Disable jika sedang ada form yang dibuka
                >
                  <Trash size={24} />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Materials</h2>
        {materials.length > 0 ? (
          materials.map((material, index) => (
            <div key={index} className="mb-2">
              <DetailSyllabi
                buttonDisabled={isEditing} // Matikan tombol edit ketika form lain dibuka
                material={material}
                setIsEditing={setIsEditing} // Berikan kontrol ke DetailSyllabi untuk mengatur state isEditing
              />
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-300">
            No materials available.
          </p>
        )}

        {showAddSyllabiForm && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls={`panel-add-content`}
              id={`panel-add-header`}
            >
              <h3 className="text-lg font-medium text-slate-500">
                Add New Material
              </h3>
            </AccordionSummary>
            <AccordionDetails>
              <CreateSyllabiForm
                onSubmit={handleSubmitAddMaterial}
                onCancel={handleAddMaterial}
                setIsEditing={setIsEditing} // Pastikan form add juga bisa mengatur state isEditing
              />
            </AccordionDetails>
          </Accordion>
        )}
      </div>

      {!showAddSyllabiForm && (
        <div className="flex justify-end">
          <Button
            color={"primary"}
            onClick={handleAddMaterial}
            disabled={isEditing}
          >
            Add Material
          </Button>
        </div>
      )}
    </div>
  );
}
