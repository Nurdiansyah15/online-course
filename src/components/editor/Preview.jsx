import React, { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";

export default function Preview({ data, id }) {
  useEffect(() => {
    let previewEditor = null;

    if (data) {
      previewEditor = new EditorJS({
        holder: `preview-${id}`,
        tools: EDITOR_JS_TOOLS,
        data: data,
        readOnly: true,
      });
    }

    return () => {
      if (previewEditor) {
        previewEditor.destroy();
      }
    };
  }, [data]);

  return <div id={`preview-${id}`} />;
}
