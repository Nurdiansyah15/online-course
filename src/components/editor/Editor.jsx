import React, { useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";

export default function Editor({
  initialData,
  onChange,
  className,
  id,
  triggerClear,
  triggerReset,
  setTriggerClear,
  setTriggerReset,
}) {
  const [editorInstance, setEditorInstance] = useState(null);

  // Inisialisasi EditorJS
  useEffect(() => {
    const editor = new EditorJS({
      holder: `editorjs-${id}`,
      tools: EDITOR_JS_TOOLS,
      data: initialData || {},
      autofocus: true,
      onChange: async () => {
        try {
          const data = await editor.save();
          onChange(data);
        } catch (error) {
          console.error("Saving failed:", error);
        }
      },
      placeholder: "Write your content here...",
    });

    setEditorInstance(editor);

    return () => {
      if (editorInstance) {
        editorInstance.isReady
          .then(() => {
            editorInstance.destroy();
          })
          .catch((e) => console.error("ERROR during editor cleanup:", e));
      }
    };
  }, []);

  // Handle Clear Trigger
  useEffect(() => {
    if (triggerClear && editorInstance) {
      editorInstance
        .clear()
        .then(() => {
          setTriggerClear(false);
        })
        .catch((e) => console.error("ERROR during clearing editor:", e));
    }
  }, [triggerClear, editorInstance]);

  // Handle Reset Trigger
  useEffect(() => {
    if (triggerReset && editorInstance) {
      editorInstance.isReady
        .then(() => {
          editorInstance.render(initialData);
          setTriggerReset(false);
        })
        .catch((e) => console.error("ERROR during resetting editor:", e));
    }
  }, [triggerReset, editorInstance]);

  return <div id={`editorjs-${id}`} className={className}></div>;
}
