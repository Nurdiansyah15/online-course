import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import YoutubeEmbed from "editorjs-youtube-embed";
import Image from "@editorjs/image";

export const EDITOR_JS_TOOLS = {
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
      },
    },
  },
  table: Table,
  marker: Marker,
  image: Image,
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a header",
      level: [1, 2, 3, 4, 5, 6],
      defaultLevel: 1,
    },
  },
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  youtubeEmbed: YoutubeEmbed,
};
