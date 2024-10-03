import React, { useState } from "react";
import EditSyllabiForm from "./EditSyllabiForm";
import { Tooltip } from "@nextui-org/react";
import { ChevronDown, Edit, Trash } from "lucide-react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Preview from "../../../components/editor/Preview";

export default function DetailSyllabi({
  material,
  buttonDisabled,
  setIsEditing,
}) {
  const [showEditSyllabiForm, setEditShowSyllabiForm] = useState(false);

  function handleEditSyllabi() {
    setEditShowSyllabiForm(!showEditSyllabiForm);
    setIsEditing(!showEditSyllabiForm); // Mengatur state isEditing sesuai dengan form yang sedang aktif
  }

  function handleDeleteSyllabi() {
    console.log("Delete course");
  }

  function handleSubmitEditSyllabi(formData) {
    console.log(formData);
    handleEditSyllabi();
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ChevronDown />}
          aria-controls={`panel${material.title}-content`}
          id={`panel${material.title}-header`}
        >
          {showEditSyllabiForm ? (
            <h3 className="text-lg font-medium">Edit Material</h3>
          ) : (
            <h3 className="text-lg font-medium">{material.title}</h3>
          )}
        </AccordionSummary>
        <AccordionDetails>
          {showEditSyllabiForm ? (
            <EditSyllabiForm
              onCancel={handleEditSyllabi}
              material={material}
              onSubmit={handleSubmitEditSyllabi}
            />
          ) : (
            <div>
              <Preview
                id={material.title}
                data={JSON.parse(material.content)}
              />
              {!buttonDisabled && (
                <div className="flex justify-end mt-4">
                  <Tooltip content="Edit Material" delay={500}>
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-4"
                      onClick={handleEditSyllabi}
                    >
                      <Edit size={24} />
                    </button>
                  </Tooltip>
                  <Tooltip content="Delete Material" delay={500}>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={handleDeleteSyllabi}
                    >
                      <Trash size={24} />
                    </button>
                  </Tooltip>
                </div>
              )}
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
