import ReactQuill from "react-quill";

const Font = ReactQuill.Quill.import("formats/font");
Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"];
ReactQuill.Quill.register(Font, true);

var Block = ReactQuill.Quill.import("blots/block");
Block.tagName = "SPAN";
// Block.className = "d-block";
ReactQuill.Quill.register(Block, true);

export const QuillSetting = () => {
  const modules = {
    toolbar: [
      [
        // { header: [1, 2, 3, 4, 5, 6, false] },
        "bold",
        "italic",
        "underline",
        "link",
        // "blockquote",
        // "code-block",
        /*  { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" }, */
        { list: "ordered" },
        { list: "bullet" },
      ],
      // [{ 'font': [] }],
      // [{ font: Font.whitelist }],

      // [{ color: [] }, { background: [] }],
      // [{ align: [] }],

      [
        // { indent: "-1" },
        // { indent: "+1" },
      ],
      // ["link", "image", "video"],
      // [{ script: "sub" }, { script: "super" }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    // "header",
    "font",
    "bold",
    "italic",
    "underline",
    "code",
    "list",
    "bullet",
    "link",
    //  "script",
    //  "indent",
    //   "image",
    //   "video",
    //   "color",
    //   "code-block",
    //   "align",
    //   "strike",
    //   "blockquote",
    //   "background",
  ];

  return { formats, modules };
};
