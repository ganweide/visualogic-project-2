import axios from "axios";
import React, { useState, useEffect } from 'react';
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
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  Switch,
  IconButton,
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

const bannerURL = "http://localhost:5000/api/banner"

const Banner = () => {
  const [bannerDatabase, setBannerDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);

  const [filters, setFilters] = useState({
    bannerImageDataUrl: { value: null, matchMode: 'contains' },
    bannerOrder: { value: null, matchMode: 'equals' },
    bannerStatus: { value: null, matchMode: 'equals' },
  });

  // Add New Banner Dialog Constants
  const [dialogImage, setDialogImage] = useState("");
  const [dialogAlwaysCheckbox, setDialogAlwaysCheckbox] = useState(false);
  const [dialogDisplayStartDate, setDialogDisplayStartDate] = useState("");
  const [dialogDisplayEndDate, setDialogDisplayEndDate] = useState("");
  const [dialogSortOrder, setDialogSortOrder] = useState("");
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(true);
  const [dialogImageData, setDialogImageData] = useState("");

  // Retrieve Data
  useEffect(() => {
    try {
      axios.get(bannerURL).then((response) => {
        setBannerDatabase(response.data);
      })
    } catch (error) {
      console.log(error)
    }
  }, [refreshTable]);

  // Datatable Templates
  const effectiveDateBodyTemplate = (rowData) => {
    return rowData.alwaysStatus ? "Always" : rowData.startDate;
  };

  const endDateBodyTemplate = (rowData) => {
    return rowData.alwaysStatus ? "Always" : rowData.endDate;
  };

  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.bannerImageUrl} alt={rowData.bannerImageDataUrl} style={{ width: '100px' }} />;
  };

  const statusBodyTemplate = (rowData) => {
    return rowData.bannerStatus ? 'Active' : 'Inactive';
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown 
        value={filters.bannerStatus.value}
        options={[
          { label: 'Active', value: true },
          { label: 'Inactive', value: false },
        ]} 
        onChange={(e) => {
          setFilters(prevFilters => ({
            ...prevFilters,
            bannerStatus: { value: e.value, matchMode: 'equals' }
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
  const [addNewBannerDialogOpen, setAddNewBannerDialogOpen] = useState(false);
  const handleOpenAddNewBannerDialog = () => {
    setAddNewBannerDialogOpen(true);
  }

  const handleCloseAddNewBannerDialog = () => {
    setDialogImage("");
    setDialogImageData("");
    setDialogAlwaysCheckbox(false);
    setDialogDisplayStartDate("");
    setDialogDisplayEndDate("");
    setDialogSortOrder("");
    setDialogActiveSwitch(true);
    setAddNewBannerDialogOpen(false);
  }

  const handleSaveNewBanner = async () => {
    try {
      const data = {
        bannerImageUrl: dialogImage,
        bannerImageDataUrl: dialogImageData,
        alwaysStatus: dialogAlwaysCheckbox,
        startDate: dialogDisplayStartDate,
        endDate: dialogDisplayEndDate,
        bannerOrder: dialogSortOrder,
        bannerStatus: dialogActiveSwitch,
      };

      const response = await axios.post(bannerURL, data);
      console.log('New banner added: ',response.data);
      setRefreshTable(response.data);
      setSnackbarMessage('Banner saved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleCloseAddNewBannerDialog();
    } catch (error) {
      console.error('Error: ', error);
      setSnackbarMessage('Error saving banner');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState(null);
  const handleOpenEditDialog = (rowData) => {
    setEditingBannerId(rowData._id);
    setDialogImage(rowData.bannerImageUrl);
    setDialogAlwaysCheckbox(rowData.alwaysStatus);
    setDialogDisplayStartDate(rowData.startDate);
    setDialogDisplayEndDate(rowData.endDate);
    setDialogSortOrder(rowData.bannerOrder);
    setDialogActiveSwitch(rowData.bannerStatus);
    setEditDialogOpen(true);
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditingBannerId(null);
    setDialogImage("");
    setDialogAlwaysCheckbox(false);
    setDialogDisplayStartDate("");
    setDialogDisplayEndDate("");
    setDialogSortOrder("");
    setDialogActiveSwitch(true);
  }

  const handleSaveEditBanner = async () => {
    try {
      const updatedBannerData = {
        bannerImageUrl: dialogImage,
        alwaysStatus: dialogAlwaysCheckbox,
        startDate: dialogDisplayStartDate,
        endDate: dialogDisplayEndDate,
        bannerOrder: dialogSortOrder,
        bannerStatus: dialogActiveSwitch,
      };

      const response = await axios.put(`${bannerURL}/${editingBannerId}`, updatedBannerData);

      if (response.status === 200) {
        console.log('Banner updated successfully');
        setRefreshTable(prev => !prev);
        setSnackbarMessage('Edited banner saved successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleCloseEditDialog();
      } else {
        console.error('Failed to update banner');
        setSnackbarMessage('Error saving banner');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingBanner, setDeletingBanner] = useState(null);
  const handleOpenDeleteDialog = (rowData) => {
    setDeletingBanner(rowData);
    setDeleteDialogOpen(true);
  }

  const handleCloseDeleteDialog = () => {
    setDeletingBanner(null);
    setDeleteDialogOpen(false);
  }

  const handleDeleteBanner = async () => {
    try {
      await axios.delete(`${bannerURL}/${deletingBanner._id}`);
      setSnackbarMessage('Banner deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setRefreshTable(prev => !prev);
    } catch (error) {
      console.error('Error deleting banner:', error);
      setSnackbarMessage('Error deleting banner');
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
    setDialogActiveSwitch(e.target.checked);
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
              <Typography variant="h1">Banner Table</Typography>
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={handleOpenAddNewBannerDialog}
              >
                Add New
              </Button>
            </Box>
          </Grid>
          {/* Table */}
          <Grid item xs={12} md={12}>
            <DataTable 
              value={bannerDatabase} 
              paginator 
              rows={10} 
              dataKey="id" 
              filters={filters} 
              filterDisplay="row" 
              loading={bannerDatabase.length === 0}
              emptyMessage="No banner found."
            >
              <Column
                field="bannerImageDataUrl"
                header="Name"
                filter
                filterPlaceholder="Filter by Name"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="startDate"
                header="Effective Date"
                body={effectiveDateBodyTemplate}
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="endDate"
                header="End Date"
                body={endDateBodyTemplate}
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="bannerImageUrl"
                header="View"
                body={imageBodyTemplate}
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="bannerOrder"
                header="Order"
                filter
                filterPlaceholder="Filter by Order"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="bannerStatus"
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
      {/* Dialog Add New Staff */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={addNewBannerDialogOpen}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Create Banner</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={12}>
                  <Typography variant='h5'>Image</Typography>
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
          <Button onClick={handleSaveNewBanner} variant="contained">Save</Button>
          <Button onClick={handleCloseAddNewBannerDialog} color="error" variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Edit Banner */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={editDialogOpen}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Edit Banner</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
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
          <Button onClick={handleSaveEditBanner} variant="contained">Save</Button>
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
          <Typography>Are you sure you want to delete the banner: {deletingBanner?.bannerImageDataUrl}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleDeleteBanner}>Delete</Button>
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

export default Banner