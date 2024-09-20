import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
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
  Divider,
  Switch,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

const branchURL = "http://localhost:5000/api/branches";
const staffURL = "http://localhost:5000/api/staff";

const Branch = () => {
  const [branchDatabase, setBranchDatabase] = useState([]);
  const [staffDatabase, setStaffDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);

  // Add New Branch Dialog Constants
  const [dialogAreaName, setDialogAreaName]                       = useState("");
  const [dialogBranchName, setDialogBranchName]                   = useState("");
  const [dialogBranchCode, setDialogBranchCode]                   = useState("");
  const [dialogWhatsappNo, setDialogWhatsappNo]                   = useState("");
  const [dialogPaymentSecretKey, setDialogPaymentSecretKey]       = useState("");
  const [dialogAPIKey, setDialogAPIKey]                           = useState("");
  const [dialogStartOperatingHours, setDialogStartOperatingHours] = useState("");
  const [dialogEndOperatingHours, setDialogEndOperatingHours]     = useState("");
  const [dialogAddress, setDialogAddress]                         = useState("");
  const [dialogGoogleLink, setDialogGoogleLink]                   = useState("");
  const [dialogWazeLink, setDialogWazeLink]                       = useState("");
  const [dialogContact, setDialogContact]                         = useState("");
  const [dialogOrder, setDialogOrder]                             = useState("");
  const [dialogImageUrl, setDialogImageUrl]                       = useState("");
  const [dialogImageData, setDialogImageData]                     = useState("");
  const [dialogHQSwitch, setDialogHQSwitch]                       = useState(false);
  const [dialogTaxSwitch, setDialogTaxSwitch]                     = useState(false);
  const [dialogTaxPercent, setDialogTaxPercent]                   = useState("");
  const [dialogOwnBranchPercent, setDialogOwnBranchPercent]       = useState("");
  const [dialogActiveSwitch, setDialogActiveSwitch]               = useState(true);

  const [filters, setFilters] = useState({
    areaName: { value: null, matchMode: 'contains' },
    branchName: { value: null, matchMode: 'contains' },
    branchOrder: { value: null, matchMode: 'equals' },
    branchStatus: { value: null, matchMode: 'equals' },
  });

  // Retrieve Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [staffResponse, branchResponse] = await Promise.all([
          axios.get(staffURL),
          axios.get(branchURL)
        ]);

        setStaffDatabase(staffResponse.data);
        const transformedBranchData = branchResponse.data.map(branch => ({
          ...branch,
          staffName: staffResponse.data.find(staff => staff._id === branch.staffName)?.staffName || 'Unknown Staff',
        }));
        setBranchDatabase(transformedBranchData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refreshTable]);

  // Datatable Templates
  const statusBodyTemplate = (rowData) => {
    return rowData.branchStatus ? 'Active' : 'Inactive';
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown 
        value={filters.branchStatus.value}
        options={[
          { label: 'Active', value: true },
          { label: 'Inactive', value: false },
        ]} 
        onChange={(e) => {
          setFilters(prevFilters => ({
            ...prevFilters,
            branchStatus: { value: e.value, matchMode: 'equals' }
          }));
        }} 
        placeholder="Select Branch"
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
  const [addNewBranchDialogOpen, setAddNewBranchDialogOpen] = useState(false);
  const handleOpenAddNewBranchDialog = () => {
    setAddNewBranchDialogOpen(true);
  }

  const handleCloseAddNewBranchDialog = () => {
    setDialogAreaName("");
    setDialogBranchName("");
    setDialogBranchCode("");
    setDialogWhatsappNo("");
    setDialogPaymentSecretKey("");
    setDialogAPIKey("");
    setDialogStartOperatingHours("");
    setDialogEndOperatingHours("");
    setDialogAddress("");
    setDialogGoogleLink("");
    setDialogWazeLink("");
    setDialogContact("");
    setDialogOrder("");
    setDialogImageUrl("");
    setDialogImageData("");
    setDialogHQSwitch(false);
    setDialogTaxSwitch(false);
    setDialogTaxPercent("");
    setDialogOwnBranchPercent("");
    setDialogActiveSwitch(true);
    setAddNewBranchDialogOpen(false);
  }

  const handleSaveNewBranch = async () => {
    try {
      const data = {
        branchCode: dialogBranchCode,
        branchName: dialogBranchName,
        areaName: dialogAreaName,
        branchAddress: dialogAddress,
        googleLink: dialogGoogleLink,
        wazeLink: dialogWazeLink,
        operatingStart: dialogStartOperatingHours,
        operatingEnd: dialogEndOperatingHours,
        whatsappNo: dialogWhatsappNo,
        staffName: dialogContact,
        paymentKey: dialogPaymentSecretKey,
        apiKey: dialogAPIKey,
        taxStatus: dialogTaxSwitch,
        taxPercent: dialogTaxPercent,
        branchPercent: dialogOwnBranchPercent,
        imageUrl: dialogImageUrl,
        imageData: dialogImageData,
        hqStatus: dialogHQSwitch,
        branchOrder: dialogOrder,
        branchStatus: dialogActiveSwitch,
      };

      const response = await axios.post('http://localhost:5000/api/branches', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      console.log('New branch added: ',response.data);
      setRefreshTable(response.data);
      setSnackbarMessage('Branch saved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleCloseAddNewBranchDialog();
    } catch (error) {
      console.error('Error: ', error);
      setSnackbarMessage('Error saving branch');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingBranchId, setEditingBranchId] = useState(null);
  const handleOpenEditDialog = (rowData) => {
    setEditingBranchId(rowData._id);
    setDialogAreaName(rowData.areaName);
    setDialogBranchName(rowData.branchName);
    setDialogBranchCode(rowData.branchCode);
    setDialogWhatsappNo(rowData.whatsappNo);
    setDialogPaymentSecretKey(rowData.paymentKey);
    setDialogAPIKey(rowData.apiKey);
    setDialogStartOperatingHours(rowData.operatingStart);
    setDialogEndOperatingHours(rowData.operatingEnd);
    setDialogAddress(rowData.branchAddress);
    setDialogGoogleLink(rowData.googleLink);
    setDialogWazeLink(rowData.wazeLink);
    setDialogContact(staffDatabase.find(staff => staff.staffName === rowData.staffName)._id);
    setDialogOrder(rowData.branchOrder);
    setDialogImageUrl(rowData.imageUrl);
    setDialogImageData(rowData.imageData);
    setDialogHQSwitch(rowData.hqStatus);
    setDialogTaxSwitch(rowData.taxStatus);
    setDialogTaxPercent(rowData.taxPercent);
    setDialogOwnBranchPercent(rowData.branchPercent);
    setDialogActiveSwitch(rowData.branchStatus);
    setEditDialogOpen(true);
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditingBranchId(null);
    setDialogAreaName("");
    setDialogBranchName("");
    setDialogBranchCode("");
    setDialogWhatsappNo("");
    setDialogPaymentSecretKey("");
    setDialogAPIKey("");
    setDialogStartOperatingHours("");
    setDialogEndOperatingHours("");
    setDialogAddress("");
    setDialogGoogleLink("");
    setDialogWazeLink("");
    setDialogContact("");
    setDialogOrder("");
    setDialogImageUrl("");
    setDialogImageData("");
    setDialogHQSwitch(false);
    setDialogTaxSwitch(false);
    setDialogTaxPercent("");
    setDialogOwnBranchPercent("");
    setDialogActiveSwitch(true);
  }

  const handleSaveEditBranch = async () => {
    try {
      const updatedBranchData = {
        branchCode: dialogBranchCode,
        branchName: dialogBranchName,
        areaName: dialogAreaName,
        branchAddress: dialogAddress,
        googleLink: dialogGoogleLink,
        wazeLink: dialogWazeLink,
        operatingStart: dialogStartOperatingHours,
        operatingEnd: dialogEndOperatingHours,
        whatsappNo: dialogWhatsappNo,
        staffName: dialogContact,
        paymentKey: dialogPaymentSecretKey,
        apiKey: dialogAPIKey,
        taxStatus: dialogTaxSwitch,
        taxPercent: dialogTaxPercent,
        branchPercent: dialogOwnBranchPercent,
        imageUrl: dialogImageUrl,
        imageData: dialogImageData,
        hqStatus: dialogHQSwitch,
        branchOrder: dialogOrder,
        branchStatus: dialogActiveSwitch,
      };
  
      const response = await axios.put(`${branchURL}/${editingBranchId}`, updatedBranchData);
      
      if (response.status === 200) {
        console.log('Branch updated successfully');
        setRefreshTable(prev => !prev);
        setSnackbarMessage('Edited branvh saved successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleCloseEditDialog();
      } else {
        console.error('Failed to update branch');
        setSnackbarMessage('Error saving branch');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating branch:', error);
    }
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingBranch, setDeletingBranch] = useState(null);
  const handleOpenDeleteDialog = (rowData) => {
    setDeletingBranch(rowData);
    setDeleteDialogOpen(true);
  }

  const handleCloseDeleteDialog = () => {
    setDeletingBranch(null);
    setDeleteDialogOpen(false);
  }

  const handleDeleteBranch = async () => {
    try {
      await axios.delete(`${branchURL}/${deletingBranch._id}`);
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
  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
    setDialogImageUrl(URL.createObjectURL(image));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  // Switch Actions
  const handleClickSwitchHQ = (e) => {
    setDialogHQSwitch(e.target.checked);
  }

  const handleClickSwitchTax = (e) => {
    setDialogTaxSwitch(e.target.checked);
  }

  const handleClickSwitchActiveInactive = (e) => {
    setDialogActiveSwitch(e.target.checked);
  }

  return (
    <Box>
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          {/* Header */}
          <Grid item xs={12} md={12}>
            <Box 
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="h1">Branch Table</Typography>
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={handleOpenAddNewBranchDialog}
              >
                Add New
              </Button>
            </Box>
          </Grid>
          {/* Table */}
          <Grid item xs={12} md={12}>
            <DataTable 
              value={branchDatabase} 
              paginator 
              rows={10} 
              dataKey="id" 
              filters={filters} 
              filterDisplay="row" 
              loading={branchDatabase.length === 0}
              emptyMessage="No branch found."
            >
              <Column
                field="areaName"
                header="Area"
                filter
                filterPlaceholder="Filter by Area"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="branchName"
                header="Branch"
                filter
                filterPlaceholder="Filter by Branch"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="staffName"
                header="Contact"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="imageUrl"
                header="QR Code"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="branchOrder"
                header="Order"
                filter
                filterPlaceholder="Filter by Order"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="branchStatus"
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
      {/* Dialog Add New Branch */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={addNewBranchDialogOpen}
        onClose           ={handleCloseAddNewBranchDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Create Branch</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography>Branch Information</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogBranchCode(e.target.value)}
                margin="dense"
                label="Branch Code"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogBranchCode}
                inputProps={{ maxLength: 10 }}
                helperText="Only allows 10 characters"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogBranchName(e.target.value)}
                margin="dense"
                label="Branch Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogBranchName}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogAreaName(e.target.value)}
                margin="dense"
                label="Area Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogAreaName}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogAddress(e.target.value)}
                margin="dense"
                label="Address"
                type="text"
                fullWidth
                multiline
                row={3}
                variant="outlined"
                value={dialogAddress}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogGoogleLink(e.target.value)}
                margin="dense"
                label="Google Link"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogGoogleLink}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogWazeLink(e.target.value)}
                margin="dense"
                label="Waze Link"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogWazeLink}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography>Operating Hours</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setDialogStartOperatingHours(e.target.value)}
                margin="dense"
                label="Operating Hours From"
                type="time"
                fullWidth
                variant="outlined"
                value={dialogStartOperatingHours}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setDialogEndOperatingHours(e.target.value)}
                margin="dense"
                label="Operating Hours To"
                type="time"
                fullWidth
                variant="outlined"
                value={dialogEndOperatingHours}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography>Contact Information</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogWhatsappNo(e.target.value)}
                margin="dense"
                label="Whatsapp No."
                type="text"
                fullWidth
                variant="outlined"
                value={dialogWhatsappNo}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="contact-select">Contact</InputLabel>
                <Select
                  labelId ="contact-select"
                  id      ="contact-select"
                  value   ={dialogContact}
                  label   ="Contact"
                  onChange={(e) => {setDialogContact(e.target.value)}}
                >
                  {staffDatabase.length > 0 ? (
                    staffDatabase.map((staff) => (
                      <MenuItem key={staff._id} value={staff._id}>
                        {staff.staffName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No staffs set up yet</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography>Payment Information</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogPaymentSecretKey(e.target.value)}
                margin="dense"
                label="Secret Key (Payment)"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogPaymentSecretKey}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogAPIKey(e.target.value)}
                margin="dense"
                label="API Key (Payment)"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogAPIKey}
              />
            </Grid>
            <Grid item container xs={12} md={12} alignItems="center" spacing={2}>
              <Grid item xs={6} md={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography>SST (Service Tax, Sales Tax)</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={dialogTaxSwitch}
                      onChange={handleClickSwitchTax}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {dialogTaxSwitch && (
                <Grid item xs={6} md={6}>
                  <TextField
                    onChange={(e) => setDialogTaxPercent(e.target.value)}
                    margin="dense"
                    label="Tax Percent %"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={dialogTaxPercent}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setDialogOwnBranchPercent(e.target.value)}
                margin="dense"
                label="Own Branch Percent %"
                type="number"
                fullWidth
                variant="outlined"
                value={dialogOwnBranchPercent}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={12}>
                  <Typography>Branch Image</Typography>
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
                    {dialogImageUrl ? (
                      <img
                        src={dialogImageUrl}
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
              <Typography>Other Settings</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography>HQ</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={dialogHQSwitch}
                    onChange={handleClickSwitchHQ}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={6}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography>Active/Inactive</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={dialogActiveSwitch}
                    onChange={handleClickSwitchActiveInactive}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                margin="dense"
                label="Sort Order"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogOrder}
                onChange={(e) => setDialogOrder(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveNewBranch}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Edit Branch */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={editDialogOpen}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Edit Branch</Typography>
        </DialogTitle>
        <DialogContent dividers>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography>Branch Information</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogBranchCode(e.target.value)}
                margin="dense"
                label="Branch Code"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogBranchCode}
                inputProps={{ maxLength: 10 }}
                helperText="Only allows 10 characters"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogBranchName(e.target.value)}
                margin="dense"
                label="Branch Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogBranchName}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogAreaName(e.target.value)}
                margin="dense"
                label="Area Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogAreaName}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogAddress(e.target.value)}
                margin="dense"
                label="Address"
                type="text"
                fullWidth
                multiline
                row={3}
                variant="outlined"
                value={dialogAddress}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogGoogleLink(e.target.value)}
                margin="dense"
                label="Google Link"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogGoogleLink}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogWazeLink(e.target.value)}
                margin="dense"
                label="Waze Link"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogWazeLink}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography>Operating Hours</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setDialogStartOperatingHours(e.target.value)}
                margin="dense"
                label="Operating Hours From"
                type="time"
                fullWidth
                variant="outlined"
                value={dialogStartOperatingHours}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setDialogEndOperatingHours(e.target.value)}
                margin="dense"
                label="Operating Hours To"
                type="time"
                fullWidth
                variant="outlined"
                value={dialogEndOperatingHours}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography>Contact Information</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogWhatsappNo(e.target.value)}
                margin="dense"
                label="Whatsapp No."
                type="text"
                fullWidth
                variant="outlined"
                value={dialogWhatsappNo}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="contact-select">Contact</InputLabel>
                <Select
                  labelId ="contact-select"
                  id      ="contact-select"
                  value   ={dialogContact}
                  label   ="Contact"
                  onChange={(e) => {setDialogContact(e.target.value)}}
                >
                  {staffDatabase.length > 0 ? (
                    staffDatabase.map((staff) => (
                      <MenuItem key={staff._id} value={staff._id}>
                        {staff.staffName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No staffs set up yet</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography>Payment Information</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogPaymentSecretKey(e.target.value)}
                margin="dense"
                label="Secret Key (Payment)"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogPaymentSecretKey}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogAPIKey(e.target.value)}
                margin="dense"
                label="API Key (Payment)"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogAPIKey}
              />
            </Grid>
            <Grid item container xs={12} md={12} alignItems="center" spacing={2}>
              <Grid item xs={6} md={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography>SST (Service Tax, Sales Tax)</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={dialogTaxSwitch}
                      onChange={handleClickSwitchTax}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {dialogTaxSwitch && (
                <Grid item xs={6} md={6}>
                  <TextField
                    onChange={(e) => setDialogTaxPercent(e.target.value)}
                    margin="dense"
                    label="Tax Percent %"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={dialogTaxPercent}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setDialogOwnBranchPercent(e.target.value)}
                margin="dense"
                label="Own Branch Percent %"
                type="number"
                fullWidth
                variant="outlined"
                value={dialogOwnBranchPercent}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={12}>
                  <Typography>Branch Image</Typography>
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
                    {dialogImageUrl ? (
                      <img
                        src={dialogImageUrl}
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
              <Typography>Other Settings</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography>HQ</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={dialogHQSwitch}
                    onChange={handleClickSwitchHQ}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={6}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography>Active/Inactive</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={dialogActiveSwitch}
                    onChange={handleClickSwitchActiveInactive}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                margin="dense"
                label="Sort Order"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogOrder}
                onChange={(e) => setDialogOrder(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveEditBranch} variant="contained">Save</Button>
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
          <Typography>Are you sure you want to delete the branch: {deletingBranch?.branchName}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleDeleteBranch}>Delete</Button>
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

export default Branch