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
  Divider,
  Switch,
  IconButton,
  TablePagination,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Styles from "./style";

const branchURL = "http://localhost:5000/api/branches";
const useStyles = makeStyles(Styles);

const Branch = () => {
  const classes = useStyles();
  const tableHead = ["Area Name", "Branch Name", "Contact", "OR Code", "Order", "Status", ""];
  const [branchDatabase, setBranchDatabase] = useState([]);
  const [filteredBranchData, setFilteredBranchData] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);
  
  // Filtering Bar
  const [areaNameFilterItems, setAreaNameFilterItems] = useState([]);
  const [branchNameFilterItems, setBranchNameFilterItems] = useState([]);
  const [areaFilter, setAreaFilter]  = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [sortOrderFilter, setSortOrderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Add New Branch Dialog Constants
  const [dialogAreaName, setDialogAreaName]                       = useState("");
  const [dialogBranchName, setDialogBranchName]                   = useState("");
  const [dialogBranchCode, setDialogBranchCode]                   = useState("");
  const [dialogWhatsappNo, setDialogWhatsappNo]                   = useState("");
  const [dialogPaymentSecretKey, setDialogPaymentSecretKey]       = useState("");
  const [dialogStartOperatingHours, setDialogStartOperatingHours] = useState("");
  const [dialogEndOperatingHours, setDialogEndOperatingHours]     = useState("");
  const [dialogAddress, setDialogAddress]                         = useState("");
  const [dialogGoogleLink, setDialogGoogleLink]                   = useState("");
  const [dialogWazeLink, setDialogWazeLink]                       = useState("");
  const [dialogContact, setDialogContact]                         = useState("");
  const [dialogOrder, setDialogOrder]                             = useState("");
  const [dialogQRCode, setDialogQRCode]                           = useState("");
  const [dialogHQSwitch, setDialogHQSwitch]                       = useState(false);
  const [dialogTaxSwitch, setDialogTaxSwitch]                     = useState(false);
  const [dialogActiveSwitch, setDialogActiveSwitch]               = useState(true);

  // Retrieve Data
  useEffect(() => {
    try {
      axios.get(branchURL).then((response) => {
        setBranchDatabase(response.data);
        const latestBranch = response.data.length ? response.data[response.data.length - 1] : null;
        setDialogOrder(latestBranch ? latestBranch.order + 1 : 1);
        const area = response.data.map(data => data.areaName || 'null');
        const branch = response.data.map(data => data.branchName || 'null');

        const uniqueAreaName = ["All", ...new Set(area)];
        const uniqueBranchName = ["All", ...new Set(branch)];
        setAreaNameFilterItems(uniqueAreaName);
        setBranchNameFilterItems(uniqueBranchName);
      })
    } catch (error) {
      console.log(error)
    }
  }, [refreshTable]);

  // Filtering Bar
  useEffect(() => {
    let filtered = [...branchDatabase];

    if (areaFilter && areaFilter !== 'All') {
      filtered = filtered.filter((item) => item.areaName.includes(areaFilter));
    }

    if (branchFilter && branchFilter !== 'All') {
      filtered = filtered.filter((item) => item.branchName.includes(branchFilter));
    }

    if (statusFilter && statusFilter !== 'All') {
      filtered = filtered.filter((item) => (statusFilter === 'active' ? item.activeSwitch : !item.activeSwitch));
    }

    if (sortOrderFilter === 'Ascending') {
      filtered.sort((a, b) => a.order - b.order);
    } else if (sortOrderFilter === 'Descending') {
      filtered.sort((a, b) => b.order - a.order);
    }

    setFilteredBranchData(filtered);
  }, [branchDatabase, areaFilter, branchFilter, sortOrderFilter, statusFilter]);

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
        areaName: dialogAreaName,
        branchName: dialogBranchName,
        branchCode: dialogBranchCode,
        whatsappNo: dialogWhatsappNo,
        paymentSecretKey: dialogPaymentSecretKey,
        startOperatingHours: dialogStartOperatingHours,
        endOperatingHours: dialogEndOperatingHours,
        address: dialogAddress,
        googleLink: dialogGoogleLink,
        wazeLink: dialogWazeLink,
        contact: dialogContact,
        order: dialogOrder,
        qrCode: dialogQRCode,
        hqSwitch: dialogHQSwitch,
        taxSwitch: dialogTaxSwitch,
        activeSwitch: dialogActiveSwitch,
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
          {/* Filter Bar */}
          <Grid item xs={3} md={3}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="area-select">Filtered by Area</InputLabel>
              <Select
                labelId ="area-select"
                id      ="area-select"
                value   ={areaFilter}
                label   ="Filtered by Area"
                onChange={(e) => {setAreaFilter(e.target.value)}}
              >
                {areaNameFilterItems.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={3}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="branch-select">Filter by Branch</InputLabel>
              <Select
                labelId ="branch-select"
                id      ="branch-select"
                value   ={branchFilter}
                label   ="Filter by Branch"
                onChange={(e) => {setBranchFilter(e.target.value)}}
              >
                {branchNameFilterItems.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={3}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="sort-Order-select">Sort by Order</InputLabel>
              <Select
                labelId ="sort-Order-select"
                id      ="sort-Order-select"
                value   ={sortOrderFilter}
                label   ="Sort by Order"
                onChange={(e) => {setSortOrderFilter(e.target.value)}}
              >
                <MenuItem value="Ascending">Ascending</MenuItem>
                <MenuItem value="Descending">Descending</MenuItem>
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
                {filteredBranchData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
                  <TableRow key={index}>
                    <TableCell style={{textAlign: "left"}}>{data.areaName}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{data.branchName}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{data.contact}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{data.qrCode}</TableCell>
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
              count={filteredBranchData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
                onChange={(e) => setDialogBranchCode(e.target.value)}
                margin="dense"
                label="Branch Code"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogBranchCode}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
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
              <TextField
                margin="dense"
                label="Sort Order"
                type="text"
                fullWidth
                disabled
                variant="outlined"
                value={dialogOrder}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={6} md={6}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6} md={6}>
                  <Typography>HQ</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Switch
                    checked={dialogHQSwitch}
                    onChange={handleClickSwitchHQ}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={6}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6} md={6}>
                  <Typography>SST (Service Tax, Sales Tax)</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Switch
                    checked={dialogTaxSwitch}
                    onChange={handleClickSwitchTax}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={12}>
                  <Typography variant='h3'>Branch QR Code</Typography>
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
                    {dialogQRCode ? (
                      <img
                        src={dialogQRCode}
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
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6} md={6}>
                  <Typography>Active/InActive</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
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
          <Button onClick={handleSaveNewBranch}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Branch