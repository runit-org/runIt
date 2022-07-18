import ReactQuill from "react-quill";

const Font = ReactQuill.Quill.import("formats/font");
Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"];
ReactQuill.Quill.register(Font, true);

export const QuillFormatting = () => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // [{ 'font': [] }],
      // [{ font: Font.whitelist }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      // [{ align: [] }],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ script: "sub" }, { script: "super" }],
    ],
  };

  const formats = [
    "header",
    "code-block",
    "align",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "background",
    "code",
    "script",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
  ];

  var setting = [formats, modules];

  return setting;
};
