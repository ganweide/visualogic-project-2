import axios from "axios";
import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  Switch,
  IconButton, Snackbar, Alert,
} from "@mui/material";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import TipTapEditor from "./TipTapEditor";

const messageURL = "http://localhost:5000/api/message"

const Messages = () => {
  const [messageDatabase, setMessageDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);

  const [filters, setFilters] = useState({
    messageText: { value: null, matchMode: 'contains' },
    messageType: { value: null, matchMode: 'contains' },
    messageOrder: { value: null, matchMode: 'equals' },
    messageStatus: { value: null, matchMode: 'equals' },
  });
  
  // Add New Message Dialog Constants
  const [dialogMessageType, setDialogMessageType] = useState("");
  const [dialogMessage, setDialogMessage] = useState([]);
  const [dialogImage, setDialogImage] = useState("");
  const [dialogImageData, setDialogImageData] = useState("");
  const [dialogAlwaysCheckbox, setDialogAlwaysCheckbox] = useState(false);
  const [dialogDisplayStartDate, setDialogDisplayStartDate] = useState("");
  const [dialogDisplayEndDate, setDialogDisplayEndDate] = useState("");
  const [dialogSortOrder, setDialogSortOrder] = useState("");
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(true);

  // Retrieve Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messageResponse] = await Promise.all([
          axios.get(messageURL),
        ]);

        const transformedMessageData = messageResponse.data.map(message => ({
          ...message,
          messageText: messageBodyTemplate(message.message),
        }));
        setMessageDatabase(transformedMessageData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refreshTable]);

  // Datatable Templates
  const messageBodyTemplate = (messageJson) => {
    const contentArray = messageJson.content || [];
    let text = '';

    for (const item of contentArray) {
      if (item.type === 'heading') {
        const texts = item.content || [];
        for (const textItem of texts) {
          if (textItem.type === 'text') {
            return textItem.text;
          }
        }
      }
    }

    for (const item of contentArray) {
      if (item.type !== 'heading') {
        const texts = item.content || [];
        for (const textItem of texts) {
          if (textItem.type === 'text') {
            text += textItem.text + ' ';
          }
        }
      }
    }

    text = text.trim();

    // If the message is too long, truncate to 20 characters and add "..."
    if (text.length > 20) {
      return text.substring(0, 20) + '...';
    }

    return text;
  };

  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.messageImageUrl} alt={rowData.messageImageDataUrl} style={{ width: '100px' }} />;
  };

  const statusBodyTemplate = (rowData) => {
    return rowData.messageStatus ? 'Active' : 'Inactive';
  };

  const statusFilterTemplate = (options) => {
    return (
        <Dropdown
            value={filters.messageStatus.value}
            options={[
              { label: 'Active', value: true },
              { label: 'Inactive', value: false },
            ]}
            onChange={(e) => {
              setFilters(prevFilters => ({
                ...prevFilters,
                messageStatus: { value: e.value, matchMode: 'equals' }
              }));
            }}
            placeholder="Select Banner"
        />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <IconButton color="success" onClick={() => handleOpenEditDialog(rowData)}>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6} md={6}>
            <IconButton color="error" onClick={() => handleOpenDeleteDialog(rowData)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
    );
  };

  // Alert Box
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  
  // Dialog Actions
  const [addNewMessageDialogOpen, setAddNewMessageDialogOpen] = useState(false);
  const handleOpenAddNewMessageDialog = () => {
    setAddNewMessageDialogOpen(true);
  }

  const handleCloseAddNewMessageDialog = () => {
    setDialogMessageType("");
    setDialogMessage("");
    setDialogImage("");
    setDialogImageData("");
    setDialogAlwaysCheckbox(false);
    setDialogDisplayStartDate("");
    setDialogDisplayEndDate("");
    setDialogSortOrder("");
    setDialogActiveSwitch(true);
    setAddNewMessageDialogOpen(false);
  }

  const handleCreateNewMessage = async () => {
    try {
      const data = {
        messageType: dialogMessageType,
        message: dialogMessage,
        messageImageUrl: dialogImage,
        messageImageDataUrl: dialogImageData,
        alwaysStatus: dialogAlwaysCheckbox,
        startDate: dialogDisplayStartDate,
        endDate: dialogDisplayEndDate,
        messageOrder: dialogSortOrder,
        messageStatus: dialogActiveSwitch,
      };

      const response = await axios.post(messageURL, data);
      console.log('New message added: ',response.data);
      setRefreshTable(response.data);
      setSnackbarMessage('Message saved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleCloseAddNewMessageDialog();
    } catch (error) {
      console.error('Error: ', error);
      setSnackbarMessage('Error saving message');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const handleOpenEditDialog = (rowData) => {
    setEditingMessageId(rowData._id);
    setDialogMessageType(rowData.messageType);
    setDialogMessage(rowData.message);
    setDialogImage(rowData.messageImageUrl);
    setDialogImageData(rowData.messageImageDataUrl);
    setDialogAlwaysCheckbox(rowData.alwaysStatus);
    setDialogDisplayStartDate(rowData.startDate);
    setDialogDisplayEndDate(rowData.endDate);
    setDialogSortOrder(rowData.messageOrder);
    setDialogActiveSwitch(rowData.messageStatus);
    setEditDialogOpen(true);
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditingMessageId(null);
    setDialogMessageType("");
    setDialogMessage("");
    setDialogImage("");
    setDialogImageData("");
    setDialogAlwaysCheckbox(false);
    setDialogDisplayStartDate("");
    setDialogDisplayEndDate("");
    setDialogSortOrder("");
    setDialogActiveSwitch(true);
  }

  const handleSaveEditMessage = async () => {
    try {
      const updatedMessageData = {
        messageType: dialogMessageType,
        message: dialogMessage,
        messageImageUrl: dialogImage,
        messageImageDataUrl: dialogImageData,
        alwaysStatus: dialogAlwaysCheckbox,
        startDate: dialogDisplayStartDate,
        endDate: dialogDisplayEndDate,
        messageOrder: dialogSortOrder,
        messageStatus: dialogActiveSwitch,
      };

      const response = await axios.put(`${messageURL}/${editingMessageId}`, updatedMessageData);

      if (response.status === 200) {
        console.log('Message updated successfully');
        setRefreshTable(prev => !prev);
        setSnackbarMessage('Edited message saved successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleCloseEditDialog();
      } else {
        console.error('Failed to update message');
        setSnackbarMessage('Error saving message');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingMessage, setDeletingMessage] = useState(null);
  const handleOpenDeleteDialog = (rowData) => {
    setDeletingMessage(rowData);
    setDeleteDialogOpen(true);
  }

  const handleCloseDeleteDialog = () => {
    setDeletingMessage(null);
    setDeleteDialogOpen(false);
  }

  const handleDeleteMessage = async () => {
    try {
      await axios.delete(`${messageURL}/${deletingMessage._id}`);
      setSnackbarMessage('Branch deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setRefreshTable(prev => !prev);
    } catch (error) {
      console.error('Error deleting branch:', error);
      setSnackbarMessage('Error deleting branch');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      handleCloseDeleteDialog();
    }
  }

  // Image Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setDialogImageData(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDialogImage(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  const dropzoneProps = getRootProps();
  const inputProps = getInputProps();

  // Switch Actions
  const handleClickSwitchActiveInactive = (e) => {
    setDialogActiveSwitch(e.target.checked)
  }

  return (
    <Box>
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box 
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="h1">Messages Table</Typography>
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={handleOpenAddNewMessageDialog}
              >
                Add New
              </Button>
            </Box>
          </Grid>
          {/* Table */}
          <Grid item xs={12} md={12}>
            <DataTable
              value={messageDatabase}
              paginator
              rows={10}
              dataKey="id"
              filters={filters}
              filterDisplay="row"
              loading={messageDatabase.length === 0}
              emptyMessage="No message found."
          >
              <Column
                field="messageText"
                header="Message"
                body={(data) => messageBodyTemplate(data.message)}
                filter
                filterPlaceholder="Filter by Message"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="messageType"
                header="Type"
                filter
                filterPlaceholder="Filter by Type"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="messageImageUrl"
                header="View"
                body={imageBodyTemplate}
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="messageOrder"
                header="Order"
                filter
                filterPlaceholder="Filter by Order"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="messageStatus"
                header="Status"
                body={statusBodyTemplate}
                filter
                filterElement={statusFilterTemplate}
                style={{ minWidth: '12rem' }}
              />
              <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} />
            </DataTable>
          </Grid>
        </Grid>
      </Card>
      {/* Dialog Add New Message */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={addNewMessageDialogOpen}
        onClose           ={handleCloseAddNewMessageDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Create Message</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="message-type-select">Message Type</InputLabel>
                <Select
                  labelId ="message-type-select"
                  id      ="message-type-select"
                  value   ={dialogMessageType}
                  label   ="Message Type"
                  onChange={(e) => {setDialogMessageType(e.target.value)}}
                >
                  <MenuItem value="Welcome">Welcome</MenuItem>
                  <MenuItem value="Greeting">Greeting</MenuItem>
                  <MenuItem value="Wishes">Wishes</MenuItem>
                  <MenuItem value="Booking">Booking</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <TipTapEditor message={setDialogMessage} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={12}>
                  <Typography variant='h3'>Image</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box
                    {...dropzoneProps}
                    sx={{
                      border: '2px dashed #cccccc',
                      borderRadius: '4px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: isDragActive ? '#eeeeee' : '#fafafa',
                    }}
                  >
                    <input {...inputProps} />
                    {dialogImage ? (
                      <img
                        src={dialogImage}
                        alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    ) : isDragActive ? (
                      <Typography>Drop the image here ...</Typography>
                    ) : (
                      <Typography>Drag &apos;n&apos; drop an image here, or click to select one</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={<Checkbox checked={dialogAlwaysCheckbox} onChange={(e) => setDialogAlwaysCheckbox(e.target.checked)} />}
                label="Always"
              />
            </Grid>
            {!dialogAlwaysCheckbox && (
              <>
                <Grid item xs={6} md={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setDialogDisplayStartDate(e.target.value)}
                    margin="dense"
                    label="Display From"
                    type="date"
                    fullWidth
                    variant="outlined"
                    value={dialogDisplayStartDate}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setDialogDisplayEndDate(e.target.value)}
                    margin="dense"
                    label="Display Until"
                    type="date"
                    fullWidth
                    variant="outlined"
                    value={dialogDisplayEndDate}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setDialogSortOrder(e.target.value)}
                margin="dense"
                label="Sort Order"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogSortOrder}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            {/* Active/InActive */}
            <Grid item xs={12} md={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Active/InActive</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Switch
                    checked={dialogActiveSwitch}
                    onChange={handleClickSwitchActiveInactive}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateNewMessage}>Create</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Edit Message */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={editDialogOpen}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Edit Message</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="message-type-select">Message Type</InputLabel>
                <Select
                  labelId ="message-type-select"
                  id      ="message-type-select"
                  value   ={dialogMessageType}
                  label   ="Message Type"
                  onChange={(e) => {setDialogMessageType(e.target.value)}}
                >
                  <MenuItem value="Welcome">Welcome</MenuItem>
                  <MenuItem value="Greeting">Greeting</MenuItem>
                  <MenuItem value="Wishes">Wishes</MenuItem>
                  <MenuItem value="Booking">Booking</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <TipTapEditor message={setDialogMessage} initialContent={dialogMessage} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={12}>
                  <Typography variant='h3'>Image</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box
                    {...dropzoneProps}
                    sx={{
                      border: '2px dashed #cccccc',
                      borderRadius: '4px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: isDragActive ? '#eeeeee' : '#fafafa',
                    }}
                  >
                    <input {...inputProps} />
                    {dialogImage ? (
                      <img
                          src={dialogImage}
                          alt="Preview"
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    ) : isDragActive ? (
                      <Typography>Drop the image here ...</Typography>
                    ) : (
                      <Typography>Drag &apos;n&apos; drop an image here, or click to select one</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={<Checkbox checked={dialogAlwaysCheckbox} onChange={(e) => setDialogAlwaysCheckbox(e.target.checked)} />}
                label="Always"
              />
            </Grid>
            {!dialogAlwaysCheckbox && (
                <>
                  <Grid item xs={6} md={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDialogDisplayStartDate(e.target.value)}
                      margin="dense"
                      label="Display From"
                      type="date"
                      fullWidth
                      variant="outlined"
                      value={dialogDisplayStartDate}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDialogDisplayEndDate(e.target.value)}
                      margin="dense"
                      label="Display Until"
                      type="date"
                      fullWidth
                      variant="outlined"
                      value={dialogDisplayEndDate}
                    />
                  </Grid>
                </>
            )}
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setDialogSortOrder(e.target.value)}
                margin="dense"
                label="Sort Order"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogSortOrder}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            {/* Active/InActive */}
            <Grid item xs={12} md={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Active/InActive</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Switch
                    checked={dialogActiveSwitch}
                    onChange={handleClickSwitchActiveInactive}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveEditMessage} variant="contained">Save</Button>
          <Button onClick={handleCloseEditDialog} color="error" variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Delete Branch */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={deleteDialogOpen}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Confirm Deletion</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>Are you sure you want to delete the message: {deletingMessage?.messageText}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleDeleteMessage}>Delete</Button>
          <Button variant="outlined" onClick={handleCloseDeleteDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for alerts */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Messages