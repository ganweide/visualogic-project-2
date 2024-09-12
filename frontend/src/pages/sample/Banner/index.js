import axios from "axios";
import React, { useState, useEffect, useCallback } from 'react';
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
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Switch,
  ListItem,
  ListItemText,
  Menu,
  List,
  IconButton,
  TablePagination,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Styles from "./style";
const useStyles = makeStyles(Styles);
const bannerURL = "http://localhost:5000/api/banner"

const Banner = () => {
  const classes = useStyles();
  const tableHead = ["Name", "Effective Date", "End Date", "View", "Order", "Status", ""];
  const [bannerDatabase, setBannerDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);

  // Filtering Bar
  const [name, setName]  = useState("");
  const [status, setStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("");

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

  // Paginations
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
  const [addNewBannerDialogOpen, setAddNewBannerDialogOpen] = useState(false);
  const handleOpenAddNewBannerDialog = () => {
    setAddNewBannerDialogOpen(true);
  }

  const handleCloseAddNewBannerDialog = () => {
    setAddNewBannerDialogOpen(false);
  }

  const handleSaveNewBanner = async () => {
    try {
      const data = {
        image: dialogImage,
        alwaysCheckbox: dialogAlwaysCheckbox,
        displayStartDate: dialogDisplayStartDate,
        displayEndDate: dialogDisplayEndDate,
        order: dialogSortOrder,
        activeSwitch: dialogActiveSwitch,
      };

      const response = await axios.post(bannerURL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const newBanner = response.data;
      alert('Banner created successfully!');
      console.log('New Banner added:', newBanner);
      setRefreshTable(response.data);
      handleCloseAddNewBannerDialog();
    } catch (error) {
      alert('Failed to save Banner');
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
                {bannerDatabase.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{textAlign: "left"}}>{row.image}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.displayStartDate}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.displayEndDate}</TableCell>
                    <TableCell style={{textAlign: "left"}}>View Image</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.order}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.activeSwitch ? "Active" : "Inactive"}</TableCell>
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
              count={bannerDatabase.length}
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
    </Box>
  )
}

export default Banner