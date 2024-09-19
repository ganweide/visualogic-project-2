import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Switch,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const roomURL = "http://localhost:5000/api/room";
const floorURL = "http://localhost:5000/api/floor";
const branchURL = "http://localhost:5000/api/branches";

const Room = () => {
  const [roomDatabase, setRoomDatabase] = useState([]);
  const [floorDatabase, setFloorDatabase] = useState([]);
  const [branchDatabase, setBranchDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);

  const [filters, setFilters] = useState({
    branchName: { value: null, matchMode: 'contains' },
    floorNo: { value: null, matchMode: 'equals' },
    roomNo: { value: null, matchMode: 'equals' },
    roomPersonNo: { value: null, matchMode: 'equals' },
    roomGender: { value: null, matchMode: 'contains' },
    roomOrder: { value: null, matchMode: 'equals' },
    roomStatus: { value: null, matchMode: 'equals' },
  });

  // Dialog Add New
  const [dialogRoomNumber, setDialogRoomNumber] = useState("");
  const [dialogFloor, setDialogFloor] = useState("");
  const [dialogBranch, setDialogBranch] = useState("");
  const [dialogNumberOfPerson, setDialogNumberOfPerson] = useState("");
  const [dialogGender, setDialogGender] = useState("");
  const [dialogPicture, setDialogPicture] = useState("");
  const [dialogOrder, setDialogOrder] = useState("");
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(true);

  // Fetch Room Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomResponse, floorResponse, branchResponse] = await Promise.all([
          axios.get(roomURL),
          axios.get(floorURL),
          axios.get(branchURL),
        ])
        setFloorDatabase(floorResponse.data);
        setBranchDatabase(branchResponse.data);
        const transformedRoomData = roomResponse.data.map(room => ({
          ...room,
          branchName: branchResponse.data.find(branch => branch._id === room.branchName)?.branchName || 'Unknown Branch',
          floorNo: floorResponse.data.find(floor => floor._id === room.floorNo)?.floorNo || 'Unknown Floor',
        }))
        setRoomDatabase(transformedRoomData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [refreshTable]);

  // Datatable Templates
  const statusBodyTemplate = (rowData) => {
    return rowData.roomStatus ? 'Active' : 'Inactive';
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown 
        value={filters.roomStatus.value}
        options={[
          { label: 'Active', value: true },
          { label: 'Inactive', value: false },
        ]} 
        onChange={(e) => {
          setFilters(prevFilters => ({
            ...prevFilters,
            roomStatus: { value: e.value, matchMode: 'equals' }
          }));
        }} 
        placeholder="Select Room"
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
  const [openAddNewRoom, setOpenAddNewRoom] = useState(false);
  const handleOpenAddNewRoom = () => {
    setOpenAddNewRoom(true);
  };
  const handleCloseAddNewRoom = () => {
    setDialogRoomNumber("");
    setDialogFloor("");
    setDialogBranch("");
    setDialogNumberOfPerson("");
    setDialogGender("");
    setDialogPicture("");
    setDialogOrder("");
    setDialogActiveSwitch(true);
    setOpenAddNewRoom(false);
  };

  const handleSaveNewRoom = async () => {
    try{
    const data = {
      roomNo: dialogRoomNumber,
      floorNo: dialogFloor,
      branchName: dialogBranch,
      roomPersonNo: dialogNumberOfPerson,
      roomGender: dialogGender,
      roomFloorUrl: dialogPicture,
      roomOrder: dialogOrder,
      roomStatus: dialogActiveSwitch,
    };

    const response = await axios.post(roomURL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

      console.log('New room added: ',response.data);
      setRefreshTable(response.data);
      setSnackbarMessage('Room saved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleCloseAddNewRoom();
    } catch (error) {
      console.error('Error: ', error);
      setSnackbarMessage('Error saving room');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const handleOpenEditDialog = (rowData) => {
    setEditingRoomId(rowData._id);
    setDialogRoomNumber(rowData.roomNo);
    setDialogFloor(floorDatabase.find(floor => floor.floorNo === rowData.floorNo)._id);
    setDialogBranch(branchDatabase.find(branch => branch.branchName === rowData.branchName)._id);
    setDialogNumberOfPerson(rowData.roomPersonNo);
    setDialogGender(rowData.roomGender);
    setDialogPicture(rowData.roomFloorUrl);
    setDialogOrder(rowData.roomOrder);
    setDialogActiveSwitch(rowData.roomStatus);
    setEditDialogOpen(true);
  }

  const handleCloseEditDialog = () => {
    setDialogRoomNumber("");
    setDialogFloor("");
    setDialogBranch("");
    setDialogNumberOfPerson("");
    setDialogGender("");
    setDialogPicture("");
    setDialogOrder("");
    setDialogActiveSwitch(true);
    setEditDialogOpen(false);
  }

  const handleSaveEditRoom = async () => {
    try {
      const updatedRoomData = {
        roomNo: dialogRoomNumber,
        floorNo: dialogFloor,
        branchName: dialogBranch,
        roomPersonNo: dialogNumberOfPerson,
        roomGender: dialogGender,
        roomFloorUrl: dialogPicture,
        roomOrder: dialogOrder,
        roomStatus: dialogActiveSwitch,
      };
  
      const response = await axios.put(`${roomURL}/${editingRoomId}`, updatedRoomData);
      
      if (response.status === 200) {
        console.log('Room updated successfully');
        setRefreshTable(prev => !prev);
        setSnackbarMessage('Edited room saved successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleCloseEditDialog();
      } else {
        console.error('Failed to update room');
        setSnackbarMessage('Error saving room');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating room:', error);
    }
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingRoom, setDeletingRoom] = useState(null);
  const handleOpenDeleteDialog = (rowData) => {
    setDeletingRoom(rowData);
    setDeleteDialogOpen(true);
  }

  const handleCloseDeleteDialog = () => {
    setDeletingRoom(null);
    setDeleteDialogOpen(false);
  }

  const handleDeleteRoom = async () => {
    try {
      await axios.delete(`${roomURL}/${deletingRoom._id}`);
      setSnackbarMessage('Room deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setRefreshTable(prev => !prev);
    } catch (error) {
      console.error('Error deleting room:', error);
      setSnackbarMessage('Error deleting room');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      handleCloseDeleteDialog();
    }
  }

  // Switch Actions
  const handleActiveSwitchChange = () => {
    setDialogActiveSwitch(!dialogActiveSwitch);
  };

  // Image Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setDialogPicture(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  const dropzoneProps = getRootProps();
  const inputProps = getInputProps();

  return (
    <Box>
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          {/* Header */}
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h1">Room Table</Typography>
              {/* Add Floor Button */}
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={handleOpenAddNewRoom}
              >
                Add Room
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <DataTable 
              value={roomDatabase} 
              paginator 
              rows={10} 
              dataKey="id" 
              filters={filters} 
              filterDisplay="row" 
              loading={roomDatabase.length === 0}
              emptyMessage="No room found."
            >
              <Column
                field="branchName"
                header="Branch"
                filter
                filterPlaceholder="Filter by Branch"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="floorNo"
                header="Floor No."
                filter
                filterPlaceholder="Filter by No"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="roomNo"
                header="Room No."
                filter
                filterPlaceholder="Filter by No"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="roomPersonNo"
                header="No. of Persons"
                filter
                filterPlaceholder="Filter by No"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="roomGender"
                header="Gender"
                filter
                filterPlaceholder="Filter by Gender"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="roomOrder"
                header="Order"
                filter
                filterPlaceholder="Filter by Order"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="roomStatus"
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
      {/* Add New Room Dialog */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={openAddNewRoom}
        onClose={handleCloseAddNewRoom}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Add New Room</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Branch</InputLabel>
                <Select
                  value={dialogBranch}
                  onChange={(e) => setDialogBranch(e.target.value)}
                  label="Branch"
                >
                  {branchDatabase.map((branch) => (
                    <MenuItem key={branch._id} value={branch._id}>
                      {branch.branchName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Floor</InputLabel>
                <Select
                  value={dialogFloor}
                  onChange={(e) => setDialogFloor(e.target.value)}
                  label="Floor"
                >
                  {floorDatabase.map((floor) => (
                    <MenuItem key={floor._id} value={floor._id}>
                      {floor.floorNo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="Room No"
                variant="outlined"
                fullWidth
                value={dialogRoomNumber}
                onChange={(e) => setDialogRoomNumber(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="No of Person"
                variant="outlined"
                fullWidth
                value={dialogNumberOfPerson}
                onChange={(e) => setDialogNumberOfPerson(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Gender</InputLabel>
                <Select
                value={dialogGender}
                onChange={(e) => setDialogGender(e.target.value)}
                label="Gender"
                >
                  <MenuItem value="Both">Both</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box
                {...dropzoneProps}
                sx={{
                  border: "2px dashed #ddd",
                  borderRadius: "4px",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: isDragActive ? '#eeeeee' : '#fafafa',
                }}
              >
                <input {...inputProps} />
                {dialogPicture ? (
                  <img
                    src={dialogPicture}
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
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Order"
                variant="outlined"
                fullWidth
                value={dialogOrder}
                onChange={(e) => setDialogOrder(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box display="flex" alignItems="center" mt={2}>
                <Typography>Active</Typography>
                <Switch
                  checked={dialogActiveSwitch}
                  onChange={handleActiveSwitchChange}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddNewRoom} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveNewRoom} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Room Dialog */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={editDialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Edit Room</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Branch</InputLabel>
                <Select
                  value={dialogBranch}
                  onChange={(e) => setDialogBranch(e.target.value)}
                  label="Branch"
                >
                  {branchDatabase.map((branch) => (
                    <MenuItem key={branch._id} value={branch._id}>
                      {branch.branchName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Floor</InputLabel>
                <Select
                  value={dialogFloor}
                  onChange={(e) => setDialogFloor(e.target.value)}
                  label="Floor"
                >
                  {floorDatabase.map((floor) => (
                    <MenuItem key={floor._id} value={floor._id}>
                      {floor.floorNo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="Room No"
                variant="outlined"
                fullWidth
                value={dialogRoomNumber}
                onChange={(e) => setDialogRoomNumber(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="No of Person"
                variant="outlined"
                fullWidth
                value={dialogNumberOfPerson}
                onChange={(e) => setDialogNumberOfPerson(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Gender</InputLabel>
                <Select
                value={dialogGender}
                onChange={(e) => setDialogGender(e.target.value)}
                label="Gender"
                >
                  <MenuItem value="Both">Both</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box
                {...dropzoneProps}
                sx={{
                  border: "2px dashed #ddd",
                  borderRadius: "4px",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: isDragActive ? '#eeeeee' : '#fafafa',
                }}
              >
                <input {...inputProps} />
                {dialogPicture ? (
                  <img
                    src={dialogPicture}
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
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Order"
                variant="outlined"
                fullWidth
                value={dialogOrder}
                onChange={(e) => setDialogOrder(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box display="flex" alignItems="center" mt={2}>
                <Typography>Active</Typography>
                <Switch
                  checked={dialogActiveSwitch}
                  onChange={handleActiveSwitchChange}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEditRoom} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Delete Floor */}
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
          <Typography>Are you sure you want to delete the room: {deletingRoom?.roomNo}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleDeleteRoom}>Delete</Button>
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
  );
};
export default Room;