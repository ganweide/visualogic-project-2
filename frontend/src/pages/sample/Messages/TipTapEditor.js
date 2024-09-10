// Local Imports
import './styles.css'
import ResizableImageExtension from './ResizableImageExtension'

// TipTap Editor Imports
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'

// React Imports
import React, { useState } from 'react'

// Remix Icons Imports
import { 
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiParagraph,
  RiH1,
  RiH2,
  RiH3,
  RiListUnordered,
  RiListOrdered,
  RiDoubleQuotesL,
  RiSeparator,
  RiTextWrap,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiTableLine,
  RiInsertColumnLeft,
  RiInsertColumnRight,
  RiInsertRowTop,
  RiInsertRowBottom,
  RiMergeCellsHorizontal,
  RiSplitCellsHorizontal,
  RiDeleteColumn,
  RiDeleteRow,
  RiDeleteBin5Line,
  RiFileImageLine,
} from 'react-icons/ri';

// Material Design Icons Imports
import {
  MdOutlinePreview,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";

// Boostrap Icons Imports
import {
  BsFiletypeJson,
  BsFiletypeHtml,
} from "react-icons/bs";

// Github Octicons Icons Imports
import {
  GoColumns,
  GoSidebarCollapse,
  GoSidebarExpand,
} from "react-icons/go";

// Material UI Imports
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Tabs,
  Tab,
  Grid,
  TextField,
} from "@mui/material";

// Tab Panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // eslint-disable-next-line
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="button">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TipTapEditor = ({ message }) => {
  const [html, setHtml]                                   = useState("");
  const [json, setJson]                                   = useState("");
  const [openPreviewDialog, setOpenPreviewDialog]         = useState(false);
  const [openImageUploadDialog, setOpenImageUploadDialog] = useState(false);
  const [tab, setTab]                                     = useState(0);
  const [selectedImage, setSelectedImage]                 = useState(null);
  const [url, setUrl]                                     = useState("");
  const [width, setWidth]                                 = useState("");
  const [height, setHeight]                               = useState("");
  const [alt, setAlt]                                     = useState("");
  const [isDarkMode, setIsDarkMode]                       = useState(false);
  const [editor, setEditor]                               = useState(null);
  const [contentJson, setContentJson]                     = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLightMode = () => {
    setIsDarkMode(false);
  };

  const handleOpenImageUploadDialog = (editor) => {
    setOpenImageUploadDialog(true);
    setEditor(editor);
  }

  const handleCloseImageUploadDialog = () => {
    setOpenImageUploadDialog(false);
  }

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  
  const AWS = require('aws-sdk');

  // Configure AWS with your access key and secret access key
  AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'eu-central-1' // e.g., 'us-east-1'
  });

  // Create a new instance of the S3 class
  const s3 = new AWS.S3();

  const uploadImageToS3 = async (imageFile) => {
    try {
      const uploadParams = {
        Bucket: 'weide1234',
        Key: `images/${imageFile.name}`, // Specify the key (file name) under which the object will be stored in the bucket
        Body: imageFile, // The actual file data
        ContentType: imageFile.type // The content type of the file
      };
      const result = await s3.upload(uploadParams).promise();
  
      return result.Location;
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      // Handle error, e.g., show an error message to the user
      return '';
    }
  };

  const handleAddImage = async () => {
    if (selectedImage && tab === 0) {
      const imageDataUrl = await uploadImageToS3(selectedImage);  
      editor.chain().focus().setImage({ src: imageDataUrl }).run();
      setSelectedImage([]);
    } else if (url && tab === 1) {
      editor.chain().focus().setImage({ src: url, alt: alt, width: width, height: height }).run();
      setUrl("");
    }
    setOpenImageUploadDialog(false);
  }

  const handleOpenPreviewDialog = (editor) => {
    if (editor) {
      const editorContent = editor.getJSON(); // Get the JSON content of the editor
      setContentJson(editorContent); // Set the JSON content in state
      setOpenPreviewDialog(true); // Open the preview dialog
    }
  }

  const handleClosePreviewDialog = () => {
    setOpenPreviewDialog(false);
  }

  const CustomTableCell = TableCell.extend({
    addAttributes() {
      return {
        // extend the existing attributes …
        ...this.parent?.(),
  
        // and add a new one …
        backgroundColor: {
          default: null,
          parseHTML: element => element.getAttribute('data-background-color'),
          renderHTML: attributes => {
            return {
              'data-background-color': attributes.backgroundColor,
              style: `background-color: ${attributes.backgroundColor}`,
            }
          },
        },
      }
    },
  })

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    CustomTableCell,
    Image,
    ResizableImageExtension(openPreviewDialog),
  ]

  const MenuBar = () => {
    const { editor } = useCurrentEditor();
    if (!editor) {
      return null
    }
  
    const handleGetHtml = () => {
      if (editor) {
        const htmlContent = editor.getHTML();
        setHtml(htmlContent);
      }
    };

    const handleGetJson = () => {
      if (editor) {
        const jsonContent = editor.getJSON();
        setJson(jsonContent);
      }
    };

    return (
      <div className="editor-header">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`menu-item${editor.isActive('bold') ? ' is-active' : ''}`}
          title="Bold"
        >
          <RiBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`menu-item${editor.isActive('italic') ? ' is-active' : ''}`}
          title="Italic"
        >
          <RiItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`menu-item${editor.isActive('strike') ? ' is-active' : ''}`}
          title="Strike Through"
        >
          <RiStrikethrough />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`menu-item${editor.isActive('paragraph') ? ' is-active' : ''}`}
          title="Paragraph"
        >
          <RiParagraph />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`menu-item${editor.isActive('heading', { level: 1}) ? ' is-active' : ''}`}
          title="Heading 1"
        >
          <RiH1 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`menu-item${editor.isActive('heading', { level: 2}) ? ' is-active' : ''}`}
          title="Heading 2"
        >
          <RiH2 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`menu-item${editor.isActive('heading', { level: 3}) ? ' is-active' : ''}`}
          title="Heading 3"
        >
          <RiH3 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`menu-item${editor.isActive('bulletList') ? ' is-active' : ''}`}
          title="Bullet List"
        >
          <RiListUnordered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`menu-item${editor.isActive('orderedList') ? ' is-active' : ''}`}
          title="Ordered List"
        >
          <RiListOrdered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`menu-item${editor.isActive('blockquote') ? ' is-active' : ''}`}
          title="Quote"
        >
          <RiDoubleQuotesL />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="menu-item"
          title="Divider"
        >
          <RiSeparator />
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="menu-item"
          title="Break"
        >
          <RiTextWrap />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="menu-item"
          disabled={!editor.can().chain().focus().undo().run()}
          title="Undo"
        >
          <RiArrowGoBackLine />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="menu-item"
          disabled={!editor.can().chain().focus().redo().run()}
          title="Redo"
        >
          <RiArrowGoForwardLine />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className="menu-item"
          title="Table"
        >
          <RiTableLine />
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.can().addColumnBefore()}
          className="menu-item"
          title="Insert Left Column"
        >
          <RiInsertColumnLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()}
          className="menu-item"
          title="Insert Right Column"
        >
          <RiInsertColumnRight />
        </button>
        <button
          onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.can().addRowBefore()}
          className="menu-item"
          title="Insert Top Row"
        >
          <RiInsertRowTop />
        </button>
        <button
          onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()}
          className="menu-item"
          title="Insert Bottom Row"
        >
          <RiInsertRowBottom />
        </button>
        <button
          onClick={() => editor.chain().focus().mergeCells().run()} disabled={!editor.can().mergeCells()}
          className="menu-item"
          title="Merge Cells"
        >
          <RiMergeCellsHorizontal />
        </button>
        <button
          onClick={() => editor.chain().focus().splitCell().run()} disabled={!editor.can().splitCell()}
          className="menu-item"
          title="Split Cells"
        >
          <RiSplitCellsHorizontal />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()}
          className="menu-item"
          title="Delete Column"
        >
          <RiDeleteColumn />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()}
          className="menu-item"
          title="Delete Row"
        >
          <RiDeleteRow />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()}
          className="menu-item"
          title="Delete Table"
        >
          <RiDeleteBin5Line />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().insertTable({ rows: 1, cols: 2, withHeaderRow: false, borderStyle: 'dotted' }).run()}
          className="menu-item"
          title="Create Section"
        >
          <GoColumns />
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.can().addColumnBefore()}
          className="menu-item"
          title="Insert Left Section"
        >
          <GoSidebarExpand />
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()}
          className="menu-item"
          title="Insert Right Section"
        >
          <GoSidebarCollapse />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()}
          className="menu-item"
          title="Delete Section"
        >
          <RiDeleteColumn />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()}
          className="menu-item"
          title="Delete Container"
        >
          <RiDeleteBin5Line />
        </button>
        <div className="divider" />
        <button onClick={() => handleOpenImageUploadDialog(editor)} className="menu-item" title="Add Image">
          <RiFileImageLine />
        </button>
        <div className="divider" />
        <button onClick={handleGetHtml} className="menu-item" title="Show HTML">
          <BsFiletypeHtml />
        </button>
        <button onClick={handleGetJson} className="menu-item" title="Show HTML">
          <BsFiletypeJson />
        </button>
        <button onClick={() => handleOpenPreviewDialog(editor)} className="menu-item" title="Preview">
          <MdOutlinePreview />
        </button>
        <div className="divider" />
        <button onClick={toggleLightMode} className={`menu-item ${!isDarkMode ? 'is-active' : ''}`} title="Light Mode">
          <MdLightMode />
        </button>
        <button onClick={toggleDarkMode} className={`menu-item ${isDarkMode ? 'is-active' : ''}`} title="Dark Mode">
          <MdDarkMode />
        </button>
      </div>
    )
  }
  
  return (
    <div className={`editor${isDarkMode ? ' dark-mode' : ''}`}>
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={contentJson}
        onUpdate={({ editor }) => {
          message(editor.getHTML());
        }}
      />
      <div>{html}</div>
      <div>{json && JSON.stringify(json)}</div>
      {/* Insert Image Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={openImageUploadDialog}
        onClose           ={handleCloseImageUploadDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2">Add Image</Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ height: '325px' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChangeTab} aria-label="appointment-form-tab-panel">
              <Tab label="Local Device" {...a11yProps(0)} />
              <Tab label="From Web" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                margin      ="dense"
                id          ="image-input"
                type        ="file"
                variant     ="outlined"
                inputProps  ={{ accept: 'image/*' }}
                onChange    ={(e) => setSelectedImage(e.target.files[0])}
              />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  value     ={url}
                  onChange  ={(e) => setUrl(e.target.value)}
                  margin    ="dense"
                  label     ="URL"
                  type      ="text"
                  variant   ="outlined"
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  fullWidth
                  value     ={width}
                  onChange  ={(e) => setWidth(e.target.value)}
                  margin    ="dense"
                  label     ="Width"
                  type      ="text"
                  variant   ="outlined"
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  fullWidth
                  value     ={height}
                  onChange  ={(e) => setHeight(e.target.value)}
                  margin    ="dense"
                  label     ="Height"
                  type      ="text"
                  variant   ="outlined"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  value     ={alt}
                  onChange  ={(e) => setAlt(e.target.value)}
                  margin    ="dense"
                  label     ="Alt"
                  type      ="text"
                  variant   ="outlined"
                />
              </Grid>
            </Grid>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleAddImage}>
            <Typography variant="button">
              Add
            </Typography>
          </Button>
          <Button variant="outlined" onClick={handleCloseImageUploadDialog}>
            <Typography variant="button">
              Cancel
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      {/* Preview Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={openPreviewDialog}
        onClose           ={handleClosePreviewDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2">Preview</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <EditorProvider
            extensions={extensions}
            content={contentJson}
            editable={false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreviewDialog} variant="outlined">
            <Typography variant="button">
              Done
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TipTapEditor;