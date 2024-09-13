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
  TablePagination,
  InputAdornment,
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
    try {
      axios.get(branchURL).then((response) => {
        setBranchDatabase(response.data);
      })
    } catch (error) {
      console.log(error)
    }
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

  // Dialog Actions
  const [addNewBranchDialogOpen, setAddNewBranchDialogOpen] = useState(false);
  const handleOpenAddNewBranchDialog = () => {
    setAddNewBranchDialogOpen(true);
  }

  const handleCloseAddNewBranchDialog = () => {
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

      const newBranch = response.data;
      alert('Branch created successfully!');
      console.log('New branch added:', newBranch);
      setRefreshTable(response.data);
      handleCloseAddNewBranchDialog();
    } catch (error) {
      alert('Failed to save branch');
      console.error('Error:', error);
    }
  };

  // Image Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
    setDialogQRCode(URL.createObjectURL(image));
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
              <TextField
                onChange={(e) => setDialogContact(e.target.value)}
                margin="dense"
                label="Contact"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogContact}
              />
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
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveNewBranch}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Branch