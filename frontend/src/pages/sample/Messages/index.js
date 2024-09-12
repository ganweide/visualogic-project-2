import axios from "axios";
import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
  IconButton,
  TablePagination,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import TipTapEditor from "./TipTapEditor";
import Styles from "./style";
const useStyles = makeStyles(Styles);
const messageURL = "http://localhost:5000/api/message"

const Messages = () => {
  const classes = useStyles();
  const tableHead = ["Message", "Type", "View", "Order", "Status", ""];
  const [messageDatabase, setMessageDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);
  
  // Filtering Bar
  const [messageFilter, setMessageFilter]  = useState("");
  const [typeFilter, setTypeFilter]  = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrderFilter, setSortOrderFilter] = useState("");
  
  // Add New Message Dialog Constants
  const [dialogMessageType, setDialogMessageType] = useState("");
  const [dialogMessage, setDialogMessage] = useState([]);
  const [dialogImage, setDialogImage] = useState("");
  const [dialogAlwaysCheckbox, setDialogAlwaysCheckbox] = useState(false);
  const [dialogDisplayStartDate, setDialogDisplayStartDate] = useState("");
  const [dialogDisplayEndDate, setDialogDisplayEndDate] = useState("");
  const [dialogSortOrder, setDialogSortOrder] = useState("");
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(true);

  // Retrieve Data
  useEffect(() => {
    try {
      axios.get(messageURL).then((response) => {
        setMessageDatabase(response.data);
      })
    } catch (error) {
      console.log(error)
    }
  }, [refreshTable]);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  
  // Dialog Actions
  const [addNewMessageDialogOpen, setAddNewMessageDialogOpen] = useState(false);
  const handleOpenAddNewMessageDialog = () => {
    setAddNewMessageDialogOpen(true);
  }

  const handleCloseAddNewMessageDialog = () => {
    setAddNewMessageDialogOpen(false);
  }

  const handleCreateNewMessage = async () => {
    try {
      const data = {
        messageType: dialogMessageType,
        message: dialogMessage,
        image: dialogImage,
        alwaysCheckbox: dialogAlwaysCheckbox,
        displayStartDate: dialogDisplayStartDate,
        displayEndDate: dialogDisplayEndDate,
        order: dialogSortOrder,
        activeSwitch: dialogActiveSwitch,
      };

      const response = await axios.post(messageURL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const newMessage = response.data;
      alert('Message created successfully!');
      console.log('New Message added:', newMessage);
      setRefreshTable(response.data);
      handleCloseAddNewMessageDialog();
    } catch (error) {
      alert('Failed to save Message');
      console.error('Error:', error);
    }
  }

  // Image Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
    setDialogImage(URL.createObjectURL(image));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

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
          {/* Filter Bar */}
          <Grid item xs={3} md={3}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="message-select">Filtered by Message</InputLabel>
              <Select
                labelId ="message-select"
                id      ="message-select"
                value   ={messageFilter}
                label   ="Filtered by Message"
                onChange={(e) => {setMessageFilter(e.target.value)}}
              >
                <MenuItem value="Hi">Hi</MenuItem>
                <MenuItem value="Bye">Bye</MenuItem>
                <MenuItem value="See you">See you</MenuItem>
                <MenuItem value="Please">Please</MenuItem>
                <MenuItem value="Enjoy">Enjoy</MenuItem>
                <MenuItem value="Focus">Focus</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={3}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="type-select">Filtered by Type</InputLabel>
              <Select
                labelId ="type-select"
                id      ="type-select"
                value   ={typeFilter}
                label   ="Filtered by Type"
                onChange={(e) => {setTypeFilter(e.target.value)}}
              >
                <MenuItem value="Welcome">Welcome</MenuItem>
                <MenuItem value="Greeting">Greeting</MenuItem>
                <MenuItem value="Wishes">Wishes</MenuItem>
                <MenuItem value="Booking">Booking</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={3}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="sort-order-select">Sort by Order</InputLabel>
              <Select
                labelId ="sort-order-select"
                id      ="sort-order-select"
                value   ={sortOrderFilter}
                label   ="Sort by Order"
                onChange={(e) => {setSortOrderFilter(e.target.value)}}
              >
                <MenuItem value="ascending">Ascending</MenuItem>
                <MenuItem value="descending">Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={3}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="status-select">Filtered by Status</InputLabel>
              <Select
                labelId ="status-select"
                id      ="status-select"
                value   ={statusFilter}
                label   ="Filtered by Status"
                onChange={(e) => {setStatusFilter(e.target.value)}}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Table */}
          <Grid item xs={12} md={12}>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHeadRow}>
                  {tableHead.map((prop) => (
                    <TableCell
                      className ={classes.tableCell + classes.tableHeadCell}
                      key       ={prop}
                      style     ={{
                        textAlign: "left",
                      }}
                    >
                      {prop}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {messageDatabase.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
                  <TableRow key={index}>
                    <TableCell style={{textAlign: "left"}}>{data.message}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{data.messageType}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{data.image}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{data.order}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{data.activeSwitch ? "active" : "inactive"}</TableCell>
                    <TableCell style={{textAlign: "center"}}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={messageDatabase.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Card>
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
                    {...getRootProps()}
                    sx={{
                      border: '2px dashed #cccccc',
                      borderRadius: '4px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: isDragActive ? '#eeeeee' : '#fafafa',
                    }}
                  >
                    <input {...getInputProps()} />
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
    </Box>
  )
}

export default Messages