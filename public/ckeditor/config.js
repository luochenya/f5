/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function(config) {
  // Define changes to default configuration here. For example:
  // config.language = 'fr';
  // config.uiColor = '#AADC6E';
  config.language = "zh-tw";
  //config.uiColor = '#F7B42C';
  config.height = 300;
  config.toolbarCanCollapse = true;
  config.toolbar = [
    { name: "document", items: ["Source"] },
    {
      name: "clipboard",
      items: [
        "Cut",
        "Copy",
        "Paste",
        "PasteText",
        "PasteFromWord",
        "-",
        "Undo",
        "Redo"
      ]
    },
    {
      name: "editing",
      items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"]
    },
    {
      name: "forms",
      items: [
        "Form",
        "Checkbox",
        "Radio",
        "TextField",
        "Textarea",
        "Select",
        "Button",
        "ImageButton",
        "HiddenField"
      ]
    },
    "/",
    {
      name: "basicstyles",
      items: [
        "Bold",
        "Italic",
        "Underline",
        "Strike",
        "Subscript",
        "Superscript",
        "-",
        "CopyFormatting",
        "RemoveFormat"
      ]
    },
    {
      name: "paragraph",
      items: [
        "NumberedList",
        "BulletedList",
        "-",
        "Outdent",
        "Indent",
        "-",
        "Blockquote",
        "CreateDiv",
        "-",
        "JustifyLeft",
        "JustifyCenter",
        "JustifyRight",
        "JustifyBlock",
        "-",
        "BidiLtr",
        "BidiRtl",
        "Language"
      ]
    },
    { name: "links", items: ["Link", "Unlink", "Anchor"] },
    {
      name: "insert",
      items: ["Table", "HorizontalRule", "Smiley", "SpecialChar", "PageBreak"]
    },
    {
      name: "insert",
      items: [
        "Image",
        "Flash",
        "Table",
        "HorizontalRule",
        "Smiley",
        "SpecialChar",
        "PageBreak",
        "Iframe"
      ]
    },
    "/",
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
    { name: "colors", items: ["TextColor", "BGColor"] },
    { name: "tools", items: ["Maximize", "ShowBlocks"] },
    { name: "about", items: ["About"] }
  ];
  //config.filebrowserImageUploadUrl = '/ad_min/manager/UploadImageUrl';
  //config.extraPlugins = 'image,uploadimage';
  //config.removePlugins = 'image';
  config.filebrowserBrowseUrl = '/assets/ckfinder/ckfinder.html';
  config.filebrowserImageBrowseUrl = '/assets/ckfinder/ckfinder.html?Type=Images';
  config.filebrowserFlashBrowseUrl = '/assets/ckfinder/ckfinder.html?Type=Flash';

  config.filebrowserUploadUrl = '/assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files';
  config.filebrowserImageUploadUrl = '/assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images';
  config.filebrowserFlashUploadUrl = '/assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash';
  config.removeDialogTabs = "image:advanced;";
  config.stylesSet = "my_styles";
};
