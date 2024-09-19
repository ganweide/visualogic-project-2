import axios from "axios";
import React, { useState, useEffect, useCallback } from 'react';
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
    roomOrder: { value: null, matchMode: 'equals' },
    roomStatus: { value: null, matchMode: 'equals' },
  });

  // Add New Banner Dialog Constants
  const [dialogImage, setDialogImage] = useState("");
  const [dialogAlwaysCheckbox, setDialogAlwaysCheckbox] = useState(false);
  const [dialogDisplayStartDate, setDialogDisplayStartDate] = useState("");
  const [dialogDisplayEndDate, setDialogDisplayEndDate] = useState("");
  const [dialogSortOrder, setDialogSortOrder] = useState("");
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(true);

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
        alwaysStatus: dialogAlwaysCheckbox,
        startDate: dialogDisplayStartDate,
        endDate: dialogDisplayEndDate,
        bannerOrder: dialogSortOrder,
        bannerStatus: dialogActiveSwitch,
      };

      const response = await axios.post(bannerURL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

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
          {/* Filter Bar */}
          <Grid item xs={3} md={3}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="name-select">Filtered by Name</InputLabel>
              <Select
                labelId ="name-select"
                id      ="name-select"
                value   ={name}
                label   ="Filtered by Name"
                onChange={(e) => {setName(e.target.value)}}
              >
                <MenuItem value="test.jpg">test.jpg</MenuItem>
                <MenuItem value="john.jpg">john.jpg</MenuItem>
                <MenuItem value="jane.jpg">jane.jpg</MenuItem>
                <MenuItem value="james.jpg">james.jpg</MenuItem>
                <MenuItem value="mary.jpg">mary.jpg</MenuItem>
                <MenuItem value="alice.jpg'">alice.jpg</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={3}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="sort-order-select">Sort by Order</InputLabel>
              <Select
                labelId ="sort-order-select"
                id      ="sort-order-select"
                value   ={sortOrder}
                label   ="Sort by Order"
                onChange={(e) => {setSortOrder(e.target.value)}}
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
                value   ={status}
                label   ="Filtered by Status"
                onChange={(e) => {setStatus(e.target.value)}}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
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
                field="branchName"
                header="Branch"
                filter
                filterPlaceholder="Filter by Branch"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="startDate"
                header="Effective Date"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="endDate"
                header="End Date"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="bannerImageUrl"
                header="View"
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
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={addNewBannerDialogOpen}
        onClose           ={handleCloseAddNewBannerDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Create Role</Typography>
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
          <Button onClick={handleSaveNewBanner}>Save</Button>
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