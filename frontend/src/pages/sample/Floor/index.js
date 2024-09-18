import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Switch,
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


const floorURL = "http://localhost:5000/api/floor";
const branchURL = "http://localhost:5000/api/branches";

const Floor = () => {
  const [floorDatabase, setFloorDatabase] = useState([]);
  const [branchDatabase, setBranchDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);

  // Add New Floor Dialog Contants
  const [dialogFloorNumber, setDialogFloorNumber] = useState("");
  const [dialogBranch, setDialogBranch] = useState("");
  const [dialogFloorDetail, setDialogFloorDetail] = useState("");
  const [dialogPicture, setDialogPicture] = useState("");
  const [dialogOrder, setDialogOrder] = useState("");
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(true);

  const [filters, setFilters] = useState({
    branchName: { value: null, matchMode: 'contains' },
    floorNo: { value: null, matchMode: 'equals' },
    floorDetails: { value: null, matchMode: 'contains' },
    floorOrder: { value: null, matchMode: 'equals' },
    floorStatus: { value: null, matchMode: 'equals' },
  });

  // Fetch floor and branch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [floorResponse, branchResponse] = await Promise.all([
          axios.get(floorURL),
          axios.get(branchURL)
        ])
        setBranchDatabase(branchResponse.data)
        const transformedFloorData = floorResponse.data.map(floor => ({
          ...floor,
          branchName: branchResponse.data.find(branch => branch._id === floor.branchName)?.branchName || 'Unknown Branch'
        }));
        setFloorDatabase(transformedFloorData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refreshTable]);

  // Datatable Templates
  const statusBodyTemplate = (rowData) => {
    return rowData.floorStatus ? 'Active' : 'Inactive';
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown 
        value={filters.floorStatus.value}
        options={[
          { label: 'Active', value: true },
          { label: 'Inactive', value: false },
        ]} 
        onChange={(e) => {
          setFilters(prevFilters => ({
            ...prevFilters,
            floorStatus: { value: e.value, matchMode: 'equals' }
          }));
        }} 
        placeholder="Select Floor"
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
  const [addNewFloorDialogOpen, setAddNewFloorDialogOpen] = useState(false);
  const handleOpenAddNewFloorDialog = () => {
    setAddNewFloorDialogOpen(true);
  };

  const handleCloseAddNewFloorDialog = () => {
    setDialogFloorNumber("");
    setDialogBranch("")
    setDialogFloorDetail("")
    setDialogPicture("")
    setDialogOrder("")
    setDialogActiveSwitch(true);
    setAddNewFloorDialogOpen(false);
  };

  const handleSaveNewFloor = async () => {
    try {
      const data = {
        floorNo: dialogFloorNumber,
        branchName: dialogBranch,
        floorDetail: dialogFloorDetail,
        floorImage: dialogPicture,
        floorOrder: dialogOrder,
        floorStatus: dialogActiveSwitch,
      };

      const response = await axios.post(floorURL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('New floor added: ',response.data);
      setRefreshTable(response.data);
      setSnackbarMessage('Floor saved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleCloseAddNewFloorDialog();
    } catch (error) {
      console.error('Error: ', error);
      setSnackbarMessage('Error saving floor');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingFloorId, setEditingFloorId] = useState(null);
  const handleOpenEditDialog = (rowData) => {
    setEditingFloorId(rowData._id);
    setDialogFloorNumber(rowData.floorNo);
    setDialogBranch(branchDatabase.find(branch => branch.branchName === rowData.branchName)._id);
    setDialogFloorDetail(rowData.floorDetail);
    setDialogPicture(rowData.floorImage);
    setDialogOrder(rowData.floorOrder);
    setDialogActiveSwitch(rowData.floorStatus);
    setEditDialogOpen(true);
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setDialogFloorNumber("");
    setDialogBranch("")
    setDialogFloorDetail("")
    setDialogPicture("")
    setDialogOrder("")
    setDialogActiveSwitch(true);
  }

  const handleSaveEditFloor = async () => {
    try {
      const updatedFloorData = {
        floorNo: dialogFloorNumber,
        branchName: dialogBranch,
        floorDetail: dialogFloorDetail,
        floorImage: dialogPicture,
        floorOrder: dialogOrder,
        floorStatus: dialogActiveSwitch,
      };
  
      const response = await axios.put(`${floorURL}/${editingFloorId}`, updatedFloorData);
      
      if (response.status === 200) {
        console.log('Floor updated successfully');
        setRefreshTable(prev => !prev);
        setSnackbarMessage('Edited branvh saved successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleCloseEditDialog();
      } else {
        console.error('Failed to update floor');
        setSnackbarMessage('Error saving floor');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating floor:', error);
    }
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingFloor, setDeletingFloor] = useState(null);
  const handleOpenDeleteDialog = (rowData) => {
    setDeletingFloor(rowData);
    setDeleteDialogOpen(true);
  }

  const handleCloseDeleteDialog = () => {
    setDeletingFloor(null);
    setDeleteDialogOpen(false);
  }

  const handleDeleteFloor = async () => {
    try {
      await axios.delete(`${floorURL}/${deletingFloor._id}`);
      setSnackbarMessage('Floor deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setRefreshTable(prev => !prev);
    } catch (error) {
      console.error('Error deleting floor:', error);
      setSnackbarMessage('Error deleting floor');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      handleCloseDeleteDialog();
    }
  }

  // Switch Actions
  const handleActiveSwitchChange = (e) => {
    setDialogActiveSwitch(e.target.checked);
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
          <Grid item xs={12} md={12}>
            {/* Add Floor Button */}
            <Box 
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="h1">Floor Management</Typography>
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={handleOpenAddNewFloorDialog}
              >
                Add Floor
              </Button>
            </Box>
            {/* Floor Filters */}
          </Grid>
          {/* Floor Table */}
          <Grid item xs={12} md={12}>
            <DataTable 
              value={floorDatabase} 
              paginator 
              rows={10} 
              dataKey="id" 
              filters={filters} 
              filterDisplay="row" 
              loading={floorDatabase.length === 0}
              emptyMessage="No branch found."
            >
              <Column
                field="branchName"
                header="Branch"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="floorNo"
                header="Floor Number"
                filter
                filterPlaceholder="Filter by No"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="floorDetail"
                header="Floor Detail"
                filter
                filterPlaceholder="Filter by Detail"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="floorOrder"
                header="Order"
                filter
                filterPlaceholder="Filter by Order"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="floorStatus"
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
      {/* Dialog Add New Floor */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open={addNewFloorDialogOpen}
        onClose={handleCloseAddNewFloorDialog}
      >
        <DialogTitle>
          <Typography>Add New Floor</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Floor Number"
                variant="outlined"
                fullWidth
                value={dialogFloorNumber}
                onChange={(e) => setDialogFloorNumber(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={12}>
              <TextField
                label="Floor Detail"
                variant="outlined"
                fullWidth
                value={dialogFloorDetail}
                onChange={(e) => setDialogFloorDetail(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={12}>
              <TextField
                label="Order"
                variant="outlined"
                fullWidth
                value={dialogOrder}
                onChange={(e) => setDialogOrder(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
          <Button onClick={handleCloseAddNewFloorDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveNewFloor} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Edit Floor */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open={editDialogOpen}
      >
        <DialogTitle>
          <Typography>Edit Floor</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Floor Number"
                variant="outlined"
                fullWidth
                value={dialogFloorNumber}
                onChange={(e) => setDialogFloorNumber(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={12}>
              <TextField
                label="Floor Detail"
                variant="outlined"
                fullWidth
                value={dialogFloorDetail}
                onChange={(e) => setDialogFloorDetail(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={12}>
              <TextField
                label="Order"
                variant="outlined"
                fullWidth
                value={dialogOrder}
                onChange={(e) => setDialogOrder(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
          <Button onClick={handleSaveEditFloor} color="primary">
            Save
          </Button>
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
          <Typography>Are you sure you want to delete the floor: {deletingFloor?.floorNo}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleDeleteFloor}>Delete</Button>
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

export default Floor;
