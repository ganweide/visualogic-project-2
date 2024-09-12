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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Switch,
  Divider,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

import Styles from "./style";

const floorURL = "http://localhost:5000/api/floor";
const branchURL = "http://localhost:5000/api/branches";
const useStyles = makeStyles(Styles);

const Floor = () => {
  const classes = useStyles();
  const tableHead = ["Branch", "Floor Number", "Floor Detail", "Order", "Status", "Actions"];
  const [floorDatabase, setFloorDatabase] = useState([]);
  const [branchDatabase, setBranchDatabase] = useState([]);
  const [filteredFloorData, setFilteredFloorData] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);

  // Filtering Bar
  const [floorNumberFilter, setFloorNumberFilter] = useState("");
  const [floorDetailFilter, setFloorDetailFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [sortOrderFilter, setSortOrderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Add New Floor Dialog Contants
  const [dialogFloorNumber, setDialogFloorNumber] = useState("");
  const [dialogBranch, setDialogBranch] = useState("");
  const [dialogFloorDetail, setDialogFloorDetail] = useState("");
  const [dialogPicture, setDialogPicture] = useState("");
  const [dialogOrder, setDialogOrder] = useState("");
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(true);

  // Fetch floor and branch data from API
  useEffect(() => {
    axios.get(floorURL).then((response) => {
      setFloorDatabase(response.data);
    });
    axios.get(branchURL).then((response) => {
      setBranchDatabase(response.data);
    });
  }, [refreshTable]);

  // Handle filtering
  useEffect(() => {
    let filteredData = [...floorDatabase];

    if (floorNumberFilter) {
      filteredData = filteredData.filter((floor) =>
        (floor.floorNo || '').includes(floorNumberFilter)
      );
    }
    if (floorDetailFilter) {
      filteredData = filteredData.filter((floor) =>
        (floor.floorDetail || '').includes(floorDetailFilter)
      );
    }
    if (branchFilter) {
      filteredData = filteredData.filter((floor) => floor.branchName === branchFilter);
    }
    if (sortOrderFilter) {
      filteredData = filteredData.filter((floor) =>
        (floor.order || '').includes(sortOrderFilter)
      );
    }
    if (statusFilter) {
      filteredData = filteredData.filter((floor) =>statusFilter === "Active" ? floor.activeSwitch : !floor.activeSwitch);
    }

    setFilteredFloorData(filteredData);
  }, [
    floorNumberFilter,
    floorDetailFilter,
    branchFilter,
    sortOrderFilter,
    statusFilter,
    floorDatabase,
  ]);

  // Paginations
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Dialog Actions
  const [addNewFloorDialogOpen, setAddNewFloorDialogOpen] = useState(false);
  const handleOpenAddNewFloorDialog = () => {
    setAddNewFloorDialogOpen(true);
  };

  const handleCloseAddNewFloorDialog = () => {
    setAddNewFloorDialogOpen(false);
  };

  const handleSaveNewFloor = async () => {
    try {
      const data = {
        floorNo: dialogFloorNumber,
        branchName: dialogBranch,
        floorDetail: dialogFloorDetail,
        image: dialogPicture,
        order: dialogOrder,
        activeSwitch: dialogActiveSwitch,
      };

      const response = await axios.post(floorURL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const newFloor = response.data;
      alert('Floor created successfully!');
      console.log('New floor added:', newFloor);
      setRefreshTable(response.data);
      handleCloseAddNewFloorDialog();
    } catch (error) {
      alert('Failed to save branch');
      console.error('Error:', error);
    }
  };

  // Handle dialog input changes
  const handleDialogInputChange = (e, field) => {
    const value = e.target.value;
    switch (field) {
      case "floorNumber":
        setDialogFloorNumber(value);
        break;
      case "branch":
        setDialogBranch(value);
        break;
      case "floorDetail":
        setDialogFloorDetail(value);
        break;
      case "picture":
        setDialogPicture(value);
        break;
      case "order":
        setDialogOrder(value);
        break;
      default:
        break;
    }
  };

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
              <Typography variant="h1">Floor</Typography>
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
          <Grid item xs={2.4} sm={2}>
            <FormControl variant="outlined" fullWidth margin="dense">
              <InputLabel>Branch</InputLabel>
              <Select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                label="Branch"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {branchDatabase.map((branch) => (
                  <MenuItem key={branch.id} value={branch.branchName}>
                    {branch.branchName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2.4} sm={2}>
            <TextField
              margin="dense"
              label="Floor Number"
              variant="outlined"
              fullWidth
              value={floorNumberFilter}
              onChange={(e) => setFloorNumberFilter(e.target.value)}
            />
          </Grid>
          <Grid item xs={2.4} sm={2}>
            <TextField
              margin="dense"
              label="Floor Detail"
              variant="outlined"
              fullWidth
              value={floorDetailFilter}
              onChange={(e) => setFloorDetailFilter(e.target.value)}
            />
          </Grid>
          <Grid item xs={2.4} sm={2}>
            <TextField
              margin="dense"
              label="Order"
              variant="outlined"
              fullWidth
              value={sortOrderFilter}
              onChange={(e) => setSortOrderFilter(e.target.value)}
            />
          </Grid>
          <Grid item xs={2.4} sm={2}>
            <FormControl variant="outlined" fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Grid item xs={2.4} sm={2}>
            </Grid>
          </Grid>
          {/* Floor Table */}
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
                {filteredFloorData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((floor) => (
                    <TableRow key={floor.id}>
                      <TableCell>{floor.branchName}</TableCell>
                      <TableCell>{floor.floorNo}</TableCell>
                      <TableCell>{floor.floorDetail}</TableCell>
                      <TableCell>{floor.order}</TableCell>
                      <TableCell>
                        <Switch checked={floor.activeSwitch} disabled />
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredFloorData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Card>
      <Dialog
        fullWidth
        maxWidth="md"
        open={addNewFloorDialogOpen}
        onClose={handleCloseAddNewFloorDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2">Create Floor</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant='h4'>Floor Setup</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                label="Floor Number"
                variant="outlined"
                fullWidth
                value={dialogFloorNumber}
                onChange={(e) => handleDialogInputChange(e, "floorNumber")}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                label="Floor Detail"
                variant="outlined"
                fullWidth
                value={dialogFloorDetail}
                onChange={(e) => handleDialogInputChange(e, "floorDetail")}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant='h4'>Branch</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Branches</InputLabel>
                <Select
                  value={dialogBranch}
                  onChange={(e) => handleDialogInputChange(e, "branch")}
                  label="Branch"
                >
                  {branchDatabase.map((branch) => (
                    <MenuItem key={branch.id} value={branch.branchName}>
                      {branch.branchName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider/>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant='h4'>Floor Picture</Typography>
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
              <Divider/>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant='h4'>Others</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                label="Order"
                variant="outlined"
                fullWidth
                value={dialogOrder}
                onChange={(e) => handleDialogInputChange(e, "order")}
                margin="dense"
              />
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
            <Grid item xs={5} sm={5}>
              <Box display="flex" alignItems="center" mt={2}>
                <Typography>Active/Inactive</Typography>
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
    </Box>
  );
};

export default Floor;
