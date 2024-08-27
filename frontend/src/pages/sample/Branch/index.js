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

const useStyles = makeStyles(Styles);

const Role = () => {
  const classes = useStyles();
  const tableHead = ["Area Name", "Branch Name", "Contact", "OR Code", "Order", "Status", ""];
  const [area, setArea]  = useState("");
  const [branch, setBranch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [status, setStatus] = useState("");

  // Add New Branch Dialog constants
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

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = [
    { area: 'Cheras', branch: 'HQ', contact: '', qrCode: 's3bucket_imageLink1', order: '1', status: 'Inactive' },
    { area: 'Puchong', branch: 'Branch 1', contact: '', qrCode: 's3bucket_imageLink2', order: '2', status: 'Active' },
    { area: 'Puchong', branch: 'Branch 2', contact: '', qrCode: 's3bucket_imageLink3', order: '3', status: 'Active' },
    { area: 'Subang', branch: 'Branch 3', contact: '', qrCode: 's3bucket_imageLink4', order: '4', status: 'Active' },
    { area: 'Subang', branch: 'Branch 4', contact: '', qrCode: 's3bucket_imageLink5', order: '5', status: 'Inactive' },
    { area: 'Cheras', branch: 'Branch 5', contact: '', qrCode: 's3bucket_imageLink6', order: '6', status: 'Active' },
  ];
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

  const handleSaveNewBranch = () => {
    setAddNewBranchDialogOpen(false);
  }

  // Image Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
    setDialogQRCode(URL.createObjectURL(image));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  // Switch Action
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
          <Grid item xs={2} md={2}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="area-select">Filtered by Area</InputLabel>
              <Select
                labelId ="area-select"
                id      ="area-select"
                value   ={area}
                label   ="Filtered by Area"
                onChange={(e) => {setArea(e.target.value)}}
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
          <Grid item xs={2} md={2}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="branch-select">Filter by Branch</InputLabel>
              <Select
                labelId ="branch-select"
                id      ="branch-select"
                value   ={branch}
                label   ="Filter by Branch"
                onChange={(e) => {setBranch(e.target.value)}}
              >
                <MenuItem value="Subang">Subang</MenuItem>
                <MenuItem value="Cheras">Cheras</MenuItem>
                <MenuItem value="Puchong">Puchong</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} md={2}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="sort-Order-select">Sort by Order</InputLabel>
              <Select
                labelId ="sort-Order-select"
                id      ="sort-Order-select"
                value   ={sortOrder}
                label   ="Sort by Order"
                onChange={(e) => {setSortOrder(e.target.value)}}
              >
                <MenuItem value="Ascending">Ascending</MenuItem>
                <MenuItem value="Descending">Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} md={2}>
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{textAlign: "left"}}>{row.area}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.branch}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.contact}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.qrCode}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.order}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.status}</TableCell>
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
              count={rows.length}
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

export default Role