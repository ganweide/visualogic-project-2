import React, {useState, useEffect, useCallback} from 'react'
import { useDropzone } from 'react-dropzone';
import { 
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Switch,
  IconButton,
  DialogActions,
  Divider,
  Snackbar,
  Alert,
 } from '@mui/material'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import axios from 'axios';

const packageURL = 'http://localhost:5000/api/package';
const branchURL = 'http://localhost:5000/api/branches';

const Package = () => {
  const [packageDatabase, setPackageDatabase] = useState([]);
  const [branchDatabase, setBranchDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);

  const [filters, setFilters] = useState({
    packageName: { value: null, matchMode: 'contains' },
    packageCode: { value: null, matchMode: 'contains' },
    packagePrice: { value: null, matchMode: 'contains' },
    packageOrder: { value: null, matchMode: 'contains' },
    packageStatus: { value: null, matchMode: 'equals' }
  });
  // Add New Package Dialog Constants
  const [dialogPackageName, setDialogPackageName] = useState("");
  const [dialogPackageCode, setDialogPackageCode] = useState("");
  const [dialogPrice, setDialogPrice] = useState("");
  const [dialogCategory, setDialogCategory] = useState("");
  const [dialogPicture, setDialogPicture] = useState("");
  const [dialogPackageValidity, setDialogPackageValidity] = useState("");
  const [dialogOrder, setDialogOrder] = useState("1");
  const [dialogNumberOfTime, setDialogNumberOfTime] = useState("");
  const [dialogPromoTime, setDialogPromoTime] = useState("");
  const [dialogPromoPeriodFrom, setDialogPromoPeriodFrom] = useState("");
  const [dialogPromoPeriodTo, setDialogPromoPeriodTo] = useState("");
  const [dialogBranch, setDialogBranch] = useState("");
  const [dialogTransferableSwitch, setDialogTransferableSwitch] = useState(false);
  const [dialogIndividualPackageSwitch, setDialogIndividualPackageSwitch] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(true);
  const [isAllBranch, setIsAllBranch] = useState(false);
  const [isUnlimited, setIsUnlimited] = useState(false);

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
  // Fetch Package Data from API
  useEffect(() => {
    axios.get(packageURL)
    .then((response) => {
      setPackageDatabase(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data', error);
    });

    axios.get(branchURL).then((response) => {
      setBranchDatabase(response.data);
    });
  }, [refreshTable]);

  // Checkbox Actions
  const handleClickCheckboxPromotion = (event) => {
    setIsPromotion(event.target.checked);
  };

  const handleClickCheckboxAllBranch = () => {
    setDialogBranch("");  // Clear branch when "All Branch" is checked
    setIsAllBranch(!isAllBranch);
  };

  // Switch Actions
  const handleClickCheckboxUnlimited = () => {
    setDialogNumberOfTime("");  // Clear number of time when unlimited is checked
    setIsUnlimited(!isUnlimited);
  };

  const handleClickSwitchTransferable = () => {
    setDialogTransferableSwitch(!dialogTransferableSwitch);
  };

  const handleClickSwitchIndividualPackage = () => {
    setDialogIndividualPackageSwitch(!dialogIndividualPackageSwitch);
  };

  const handleClickSwitchActiveInactive = () => {
    setDialogActiveSwitch(!dialogActiveSwitch);
  };

  // Dialog Actions
  const [openAddNewPackage, setOpenAddNewPackage] = useState(false);
  const handleOpenAddNewPackage = () => {
    setOpenAddNewPackage(true);
  }

  const handleCloseAddNewPackage = () => {
    setOpenAddNewPackage(false);
  }

  const handleSaveNewPackage = async () => {
    try{
      const data = {
        packageName: dialogPackageName,
        packageCode: dialogPackageCode,
        packagePrice: dialogPrice,
        packageCategory: dialogCategory,
        packageImageURL: dialogPicture,
        packageOrder: dialogOrder,
        packageStatus: dialogActiveSwitch,
        packageAmount: dialogNumberOfTime,
        transferableStatus: dialogTransferableSwitch,
        individualPackageStatus: dialogIndividualPackageSwitch,
        packageValidity: dialogPackageValidity,
        promotionStatus: isPromotion,
        promotionAmount: dialogPromoTime,
        promotionStartDate: dialogPromoPeriodFrom,
        promotionEndDate: dialogPromoPeriodTo,
        allBranchStatus: isAllBranch,
        branchName: dialogBranch ? dialogBranch : null,
      };
      console.log(data);

      const response = await axios.post(packageURL, data);
      console.log('New package added: ',response.data);
      setRefreshTable(response.data);
      setSnackbarMessage('Role saved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleCloseAddNewPackage();
    } catch (error) {
      console.error('Error: ', error);
      setSnackbarMessage('Error saving package');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const handleOpenEditDialog = (rowData) => {
    setEditingPackageId(rowData._id);
    setDialogPackageName(rowData.packageName);
    setDialogPackageCode(rowData.packageCode);
    setDialogPrice(rowData.packagePrice);
    setDialogCategory(rowData.packageCategory);
    setDialogPicture(rowData.packageImageURL);
    setDialogPackageValidity(rowData.packageValidity);
    setDialogOrder(rowData.packageOrder);
    setDialogActiveSwitch(rowData.packageStatus);
    setDialogNumberOfTime(rowData.packageAmount);
    setDialogTransferableSwitch(rowData.transferableStatus);
    setDialogIndividualPackageSwitch(rowData.individualPackageStatus);
    setIsPromotion(rowData.promotionStatus);
    setDialogPromoTime(rowData.promotionAmount);
    setDialogPromoPeriodFrom(rowData.promotionStartDate);
    setDialogPromoPeriodTo(rowData.promotionEndDate);
    setIsAllBranch(rowData.allBranchStatus);
    setDialogBranch(rowData.branchName);
    setIsUnlimited(rowData.packageUnlimitedStatus);
    setEditDialogOpen(true);
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setDialogPackageName("");
    setDialogPackageCode("");
    setDialogPrice("");
    setDialogCategory("");
    setDialogPicture("");
    setDialogPackageValidity("");
    setDialogOrder("");
    setDialogNumberOfTime("");
    setDialogPromoTime("");
    setDialogPromoPeriodFrom("");
    setDialogPromoPeriodTo("");
    setDialogBranch("");
    setDialogTransferableSwitch(false);
    setDialogIndividualPackageSwitch(false);
    setIsPromotion(false);
    setDialogActiveSwitch(true);
    setIsAllBranch(false);
    setIsUnlimited(false);
  }

  const handleSaveEditPackage = async () => {
    try {
      const updatedPackageData = {
        packageName: dialogPackageName,
        packageCode: dialogPackageCode,
        packagePrice: dialogPrice,
        packageCategory: dialogCategory,
        packageImageURL: dialogPicture,
        packageOrder: dialogOrder,
        packageStatus: dialogActiveSwitch,
        packageAmount: dialogNumberOfTime,
        transferableStatus: dialogTransferableSwitch,
        individualPackageStatus: dialogIndividualPackageSwitch,
        packageValidity: dialogPackageValidity,
        promotionStatus: isPromotion,
        promotionAmount: dialogPromoTime,
        promotionStartDate: dialogPromoPeriodFrom,
        promotionEndDate: dialogPromoPeriodTo,
        allBranchStatus: isAllBranch,
        branchName: dialogBranch ? dialogBranch : null,
      };
  
      const response = await axios.put(`${packageURL}/${editingPackageId}`, updatedPackageData);
      
      if (response.status === 200) {
        console.log('Package updated successfully');
        setRefreshTable(prev => !prev);
        setSnackbarMessage('Edited package saved successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleCloseEditDialog();
      } else {
        console.error('Failed to update package');
        setSnackbarMessage('Error saving package');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating packge:', error);
    }
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingPackage, setDeletingPackage] = useState(null);
  const handleOpenDeleteDialog = (rowData) => {
    setDeletingPackage(rowData);
    setDeleteDialogOpen(true);
  }

  const handleCloseDeleteDialog = () => {
    setDeletingPackage(null);
    setDeleteDialogOpen(false);
  }

  const handleDeletePackage = async () => {
    try {
      await axios.delete(`${packageURL}/${deletingPackage._id}`);
      setSnackbarMessage('Package deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setRefreshTable(prev => !prev);
    } catch (error) {
      console.error('Error deleting package:', error);
      setSnackbarMessage('Error deleting package');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      handleCloseDeleteDialog();
    }
  }

  // Image Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
    setDialogPicture(URL.createObjectURL(image));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
   });

  // Datatable Templates
  const statusBodyTemplate = (rowData) => {
    return rowData.packageStatus ? 'Active' : 'Inactive';
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown 
        value={filters.packageStatus.value}
        options={[
          { label: 'Active', value: true },
          { label: 'Inactive', value: false },
        ]} 
        onChange={(e) => {
          setFilters(prevFilters => ({
            ...prevFilters,
            packageStatus: { value: e.value, matchMode: 'equals' }
          }));
        }} 
        placeholder="Select Status"
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


  return (
    <Box>
      <Card sx={{mt:2, p:5}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h1">Package Table</Typography>
              {/* Add Button */}
              <Button
              variant="outlined"
              startIcon={<PersonAddIcon/>}
              onClick={handleOpenAddNewPackage}
              >
                Add Package
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <DataTable 
              value={packageDatabase} 
              paginator 
              rows={10} 
              dataKey="id" 
              filters={filters} 
              filterDisplay="row" 
              loading={packageDatabase.length === 0}
              emptyMessage="No roles found."
            >
              <Column
                field="packageName"
                header="Package Name"
                filter
                filterPlaceholder="Filter by Name"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="packageCode"
                header="Package Code"
                filter
                filterPlaceholder="Filter by Code"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="packagePrice"
                header="Price"
                filter
                filterPlaceholder="Filter by Price"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="packageAmount"
                header="Number of Time"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="packageOrder"
                header="Order"
                filter
                filterPlaceholder="Filter by Order"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="packageStatus"
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
      {/* Add New Package Dialog */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={openAddNewPackage}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle>
          <Typography>Create Package</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Package Information</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
              label="Package Name"
              variant="outlined"
              fullWidth
              value={dialogPackageName}
              onChange={(e) => setDialogPackageName(e.target.value)}
              margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
              label="Package Code"
              variant="outlined"
              fullWidth
              value={dialogPackageCode}
              onChange={(e) => setDialogPackageCode(e.target.value)}
              margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
              label="Price(RM)"
              variant="outlined"
              fullWidth
              value={dialogPrice}
              onChange={(e) => setDialogPrice(e.target.value)}
              margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Category</InputLabel>{" "}
                <Select
                value={dialogCategory}
                onChange={(e) => setDialogCategory(e.target.value)}
                label="Category"
                >
                  <MenuItem value="">
                  <em>None</em>
                  </MenuItem>
                  <MenuItem value="Single Steam">Single Steam</MenuItem>
                  <MenuItem value="Voucher">Voucher</MenuItem>
                  <MenuItem value="Normal">Normal</MenuItem>
                  <MenuItem value="Promotion">Promotion</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item container xs={12} md={12} alignItems="center" spacing={2}>
              <Grid item xs={6} md={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography>Unlimited</Typography>
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isUnlimited}
                          onChange={handleClickCheckboxUnlimited}
                          name="unlimited"
                          value="unlimited"
                        />
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              {!isUnlimited && (
                <Grid item xs={6} md={6}>
                  <TextField
                    fullWidth
                    label="Number of Times"
                    type="number"
                    variant="outlined"
                    value={dialogNumberOfTime}
                    onChange={(e) => setDialogNumberOfTime(e.target.value)}
                    margin="dense"
                  />
                </Grid>
              )}
              <Grid item xs={6} md={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography>Transferable</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={dialogTransferableSwitch}
                      onChange={handleClickSwitchTransferable}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} md={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography>Individual Package</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={dialogIndividualPackageSwitch}
                      onChange={handleClickSwitchIndividualPackage}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} md={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Package Validity</InputLabel>{" "}
                  <Select
                  value={dialogPackageValidity}
                  onChange={(e) => setDialogPackageValidity(e.target.value)}
                  label="Category"
                  >
                    <MenuItem value="Life Time">Life Time</MenuItem>
                    <MenuItem value="1 Year">1 Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Promotion</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPromotion}
                    onChange={handleClickCheckboxPromotion}
                    name="promotion"
                    value="promotion"
                  />
                }
                label="Promotion"
              />
            </Grid>
            {isPromotion && (
              <>
                <Grid item xs={4} md={4}>
                  <TextField
                    label="Promo Time"
                    variant="outlined"
                    fullWidth
                    value={dialogPromoTime}
                    onChange={(e) => setDialogPromoTime(e.target.value)}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <TextField
                    label="Promo Period From"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    fullWidth
                    value={dialogPromoPeriodFrom}
                    onChange={(e) => setDialogPromoPeriodFrom(e.target.value)}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <TextField
                    label="Promo Period To"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    fullWidth
                    value={dialogPromoPeriodTo}
                    onChange={(e) => setDialogPromoPeriodTo(e.target.value)}
                    margin="dense"
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Branch</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAllBranch}
                    onChange={handleClickCheckboxAllBranch}
                    name="All Branch"
                    value="All Branch"
                  />
                }
                label="All Branch"
              />
            </Grid>
            {!isAllBranch && (
              <Grid item xs={12} md={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Branch</InputLabel>
                  <Select
                    value={dialogBranch}
                    onChange={(e) => setDialogBranch(e.target.value)}
                    label="Branch"
                  >
                    {branchDatabase.map((branch) => (
                      <MenuItem key={branch._id} value={branch.name}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Package Image</Typography>
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
              <Typography variant="h5">Other Settings</Typography>
            </Grid>
            <Grid item container xs={6} md={6} alignItems="center" spacing={2}>
              <Grid item xs={12} md={12}>
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
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="Order"
                variant="outlined"
                fullWidth
                type="number"
                value={dialogOrder}
                onChange={(e) => setDialogOrder(e.target.value)}
                margin="dense"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveNewPackage} variant="contained">Save</Button>
          <Button onClick={handleCloseAddNewPackage} color="error" variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Edit Package */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={editDialogOpen}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle>
          <Typography>Create Package</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Package Information</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
              label="Package Name"
              variant="outlined"
              fullWidth
              value={dialogPackageName}
              onChange={(e) => setDialogPackageName(e.target.value)}
              margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
              label="Package Code"
              variant="outlined"
              fullWidth
              value={dialogPackageCode}
              onChange={(e) => setDialogPackageCode(e.target.value)}
              margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
              label="Price(RM)"
              variant="outlined"
              fullWidth
              value={dialogPrice}
              onChange={(e) => setDialogPrice(e.target.value)}
              margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Category</InputLabel>{" "}
                <Select
                value={dialogCategory}
                onChange={(e) => setDialogCategory(e.target.value)}
                label="Category"
                >
                  <MenuItem value="">
                  <em>None</em>
                  </MenuItem>
                  <MenuItem value="Single Steam">Single Steam</MenuItem>
                  <MenuItem value="Voucher">Voucher</MenuItem>
                  <MenuItem value="Normal">Normal</MenuItem>
                  <MenuItem value="Promotion">Promotion</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item container xs={12} md={12} alignItems="center" spacing={2}>
              <Grid item xs={6} md={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography>Unlimited</Typography>
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isUnlimited}
                          onChange={handleClickCheckboxUnlimited}
                          name="unlimited"
                          value="unlimited"
                        />
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              {!isUnlimited && (
                <Grid item xs={6} md={6}>
                  <TextField
                    fullWidth
                    label="Number of Times"
                    type="number"
                    variant="outlined"
                    value={dialogNumberOfTime}
                    onChange={(e) => setDialogNumberOfTime(e.target.value)}
                    margin="dense"
                  />
                </Grid>
              )}
              <Grid item xs={6} md={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography>Transferable</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={dialogTransferableSwitch}
                      onChange={handleClickSwitchTransferable}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} md={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography>Individual Package</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={dialogIndividualPackageSwitch}
                      onChange={handleClickSwitchIndividualPackage}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} md={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Package Validity</InputLabel>
                  <Select
                  value={dialogPackageValidity}
                  onChange={(e) => setDialogPackageValidity(e.target.value)}
                  label="Package Validity"
                  >
                    <MenuItem value="Life Time">Life Time</MenuItem>
                    <MenuItem value="1 Year">1 Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Promotion</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPromotion}
                    onChange={handleClickCheckboxPromotion}
                    name="promotion"
                    value="promotion"
                  />
                }
                label="Promotion"
              />
            </Grid>
            {isPromotion && (
              <>
                <Grid item xs={4} md={4}>
                  <TextField
                    label="Promo Time"
                    variant="outlined"
                    fullWidth
                    value={dialogPromoTime}
                    onChange={(e) => setDialogPromoTime(e.target.value)}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <TextField
                    label="Promo Period From"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    fullWidth
                    value={dialogPromoPeriodFrom}
                    onChange={(e) => setDialogPromoPeriodFrom(e.target.value)}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <TextField
                    label="Promo Period To"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    fullWidth
                    value={dialogPromoPeriodTo}
                    onChange={(e) => setDialogPromoPeriodTo(e.target.value)}
                    margin="dense"
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Branch</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAllBranch}
                    onChange={handleClickCheckboxAllBranch}
                    name="All Branch"
                    value="All Branch"
                  />
                }
                label="All Branch"
              />
            </Grid>
            {!isAllBranch && (
              <Grid item xs={12} md={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Branch</InputLabel>
                  <Select
                    value={dialogBranch}
                    onChange={(e) => setDialogBranch(e.target.value)}
                    label="Branch"
                  >
                    {branchDatabase.map((branch) => (
                      <MenuItem key={branch.id} value={branch.name}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Package Image</Typography>
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
              <Typography variant="h5">Other Settings</Typography>
            </Grid>
            <Grid item container xs={6} md={6} alignItems="center" spacing={2}>
              <Grid item xs={12} md={12}>
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
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="Order"
                variant="outlined"
                fullWidth
                type="number"
                value={dialogOrder}
                onChange={(e) => setDialogOrder(e.target.value)}
                margin="dense"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveEditPackage} variant="contained">Save</Button>
          <Button onClick={handleCloseEditDialog} color="error" variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Delete Package */}
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
          <Typography>Are you sure you want to delete the role: {deletingPackage?.packageName}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleDeletePackage}>Delete</Button>
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

export default Package