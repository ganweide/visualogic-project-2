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
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import axios from "axios";

import Styles from "./style";

const floorURL = "http://localhost:5000/api/floor";
const branchURL = "http://localhost:5000/api/branches";
const useStyles = makeStyles(Styles);

const FloorTable = () => {
  const classes = useStyles();
  const [floorData, setFloorData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [filteredFloorData, setFilteredFloorData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [floorNumberFilter, setFloorNumberFilter] = useState("");
  const [floorDetailFilter, setFloorDetailFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [sortOrderFilter, setSortOrderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [addNewFloorDialogOpen, setAddNewFloorDialogOpen] = useState(false);
  const [dialogFloorNumber, setDialogFloorNumber] = useState("");
  const [dialogBranch, setDialogBranch] = useState("");
  const [dialogFloorDetail, setDialogFloorDetail] = useState("");
  const [dialogPicture, setDialogPicture] = useState("");
  const [dialogOrder, setDialogOrder] = useState("");
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(false);

  // Fetch floor and branch data from API
  useEffect(() => {
    axios.get(floorURL).then((response) => {
      setFloorData(response.data);
      setFilteredFloorData(response.data);
    });

    axios.get(branchURL).then((response) => {
      setBranchData(response.data);
    });
  }, []);

  // Handle filtering
  useEffect(() => {
    let filteredData = floorData;

    if (floorNumberFilter) {
      filteredData = filteredData.filter((floor) =>
        floor.floorNumber.includes(floorNumberFilter)
      );
    }
    if (floorDetailFilter) {
      filteredData = filteredData.filter((floor) =>
        floor.floorDetail.includes(floorDetailFilter)
      );
    }
    if (branchFilter) {
      filteredData = filteredData.filter(
        (floor) => floor.branch === branchFilter
      );
    }
    if (sortOrderFilter) {
      filteredData = filteredData.filter((floor) =>
        floor.order.toString().includes(sortOrderFilter)
      );
    }
    if (statusFilter) {
      filteredData = filteredData.filter((floor) =>
        statusFilter === "Active" ? floor.activeSwitch : !floor.activeSwitch
      );
    }

    setFilteredFloorData(filteredData);
  }, [
    floorNumberFilter,
    floorDetailFilter,
    branchFilter,
    sortOrderFilter,
    statusFilter,
    floorData,
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAddNewFloorDialog = () => {
    setAddNewFloorDialogOpen(true);
  };

  const handleCloseAddNewFloorDialog = () => {
    setAddNewFloorDialogOpen(false);
  };

  const handleSaveNewFloor = () => {
    // Prepare new floor data
    const newFloor = {
      floorNumber: dialogFloorNumber,
      branch: dialogBranch,
      floorDetail: dialogFloorDetail,
      picture: dialogPicture,
      order: dialogOrder,
      activeSwitch: dialogActiveSwitch,
    };

    // Post new floor data to API
    axios.post(floorURL, newFloor).then((response) => {
      setFloorData([...floorData, response.data]); // Update state with new floor
      setFilteredFloorData([...floorData, response.data]);
      handleCloseAddNewFloorDialog();
    });
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

  const handleActiveSwitchChange = (e) => {
    setDialogActiveSwitch(e.target.checked);
  };

  // UseDropzone hook
  const { getRootProps, getInputProps } = useDropzone({
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

  // Destructure getRootProps and getInputProps
  const dropzoneProps = getRootProps();
  const inputProps = getInputProps();

  return (
    <Box>
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          {/* Header */}
          <Grid item xs={12} md={12}>
            {/* Add Floor Button */}
            <Box display="flex" justifyContent="space-between" mb={2}>
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
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={2.4}>
                <TextField
                  label="Floor Number"
                  variant="outlined"
                  fullWidth
                  value={floorNumberFilter}
                  onChange={(e) => setFloorNumberFilter(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <TextField
                  label="Floor Detail"
                  variant="outlined"
                  fullWidth
                  value={floorDetailFilter}
                  onChange={(e) => setFloorDetailFilter(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Branch</InputLabel>
                  <Select
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                    label="Branch"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {branchData.map((branch) => (
                      <MenuItem key={branch.id} value={branch.name}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <TextField
                  label="Sort Order"
                  variant="outlined"
                  fullWidth
                  value={sortOrderFilter}
                  onChange={(e) => setSortOrderFilter(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {/* Floor Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Floor Number</TableCell>
                    <TableCell>Floor Detail</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Picture</TableCell>
                    <TableCell>Order</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredFloorData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((floor) => (
                      <TableRow key={floor.id}>
                        <TableCell>{floor.floorNumber}</TableCell>
                        <TableCell>{floor.floorDetail}</TableCell>
                        <TableCell>{floor.branch}</TableCell>
                        <TableCell>{floor.picture}</TableCell>
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
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
      {/* Add New Floor Dialog */}{" "}
      <Dialog
        open={addNewFloorDialogOpen}
        onClose={handleCloseAddNewFloorDialog}
      >
        {" "}
        <DialogTitle>Add New Floor</DialogTitle>{" "}
        <DialogContent>
          {" "}
          <TextField
            label="Floor Number"
            variant="outlined"
            fullWidth
            value={dialogFloorNumber}
            onChange={(e) => handleDialogInputChange(e, "floorNumber")}
            margin="dense"
          />{" "}
          <FormControl fullWidth margin="dense">
            {" "}
            <InputLabel>Branch</InputLabel>{" "}
            <Select
              value={dialogBranch}
              onChange={(e) => handleDialogInputChange(e, "branch")}
              label="Branch"
            >
              {" "}
              {branchData.map((branch) => (
                <MenuItem key={branch.id} value={branch.name}>
                  {" "}
                  {branch.name}{" "}
                </MenuItem>
              ))}{" "}
            </Select>{" "}
          </FormControl>{" "}
          <TextField
            label="Floor Detail"
            variant="outlined"
            fullWidth
            value={dialogFloorDetail}
            onChange={(e) => handleDialogInputChange(e, "floorDetail")}
            margin="dense"
          />{" "}
          <Box
            {...dropzoneProps}
            sx={{
              border: "2px dashed #ddd",
              borderRadius: 2,
              padding: 2,
              textAlign: "center",
              cursor: "pointer",
              mt: 2,
            }}
          >
            <input {...inputProps} />
            <Typography>
              Drag &apos;n&lsquo; drop a picture here, or click to select one
            </Typography>
          </Box>
          {dialogPicture && (
            <Box sx={{ mt: 2 }}>
              <img
                src={dialogPicture}
                alt="Preview"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          )}
          <TextField
            label="Order"
            variant="outlined"
            fullWidth
            value={dialogOrder}
            onChange={(e) => handleDialogInputChange(e, "order")}
            margin="dense"
          />{" "}
          <Box display="flex" alignItems="center" mt={2}>
            {" "}
            <Typography>Active</Typography>{" "}
            <Switch
              checked={dialogActiveSwitch}
              onChange={handleActiveSwitchChange}
            />{" "}
          </Box>{" "}
        </DialogContent>{" "}
        <DialogActions>
          {" "}
          <Button onClick={handleCloseAddNewFloorDialog} color="secondary">
            {" "}
            Cancel{" "}
          </Button>{" "}
          <Button onClick={handleSaveNewFloor} color="primary">
            {" "}
            Save{" "}
          </Button>{" "}
        </DialogActions>{" "}
      </Dialog>{" "}
    </Box>
  );
};

export default FloorTable;
