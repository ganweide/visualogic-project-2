import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  InputLabel,
  Select,
  TablePagination,
  TextField,
  Typography,
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import axios from "axios";

import Styles from "./style";

const roomURL = "http://localhost:5000/api/room";
const floorURL = "http://localhost:5000/api/floor";
const branchURL = "http://localhost:5000/api/branches";
const useStyles = makeStyles(Styles);

const Room = () => {
  const classes = useStyles();
  const tableHead = ["Room Number", "Floor", "Branch", "No of Person", "Gender", "Order", "Status"];
  const [roomData, setRoomData] = useState([]);
  const [filteredRoomData, setFilteredRoomData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter State
  const [roomNumberFilter, setRoomNumberFilter] = useState("");
  const [floorFilter, setFloorFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [numberOfPersonFilter, setNumberOfPersonFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [sortOrderFilter, setSortOrderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Dialog Add New
  const [openAddNewRoom, setOpenAddNewRoom] = useState(false);
  const [dialogRoomNumber, setDialogRoomNumber] = useState("");
  const [dialogFloor, setDialogFloor] = useState("");
  const [dialogBranch, setDialogBranch] = useState("");
  const [dialogNumberOfPerson, setDialogNumberOfPerson] = useState("");
  const [dialogGender, setDialogGender] = useState("");
  const [dialogPicture, setDialogPicture] = useState("");
  const [dialogOrder, setDialogOrder] = useState("");
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(true);

  // Fetch Room Data from API
  useEffect(() => {
    axios.get(roomURL).then((response) => {
      setRoomData(response.data);
      setFilteredRoomData(response.data);
    });

    axios.get(floorURL).then((response) => {
      setFloorData(response.data);
    });

    axios.get(branchURL).then((response) => {
      setBranchData(response.data);
    });
  }, []);

  // Handle filter data
  useEffect(() => {
    let filterRoomData = [...roomData];

    if (roomNumberFilter) {
      filterRoomData = filterRoomData.filter((room) =>
        (room.setDialogRoomNumber||'').includes(roomNumberFilter)
      );
    }

    if (floorFilter) {
      filterRoomData = filterRoomData.filter((room) =>
        room.floor === floorFilter.includes(floorFilter)
      );
    }

    if (branchFilter) {
      filterRoomData = filterRoomData.filter((room) =>
        room.branch=== branchFilter.includes(branchFilter)
      );
    }

    if (numberOfPersonFilter) {
      filterRoomData = filterRoomData.filter((room) =>
        (room.numberOfPerson||'').includes(numberOfPersonFilter)
      );
    }

    if (genderFilter) {
      filterRoomData = filterRoomData.filter((room) =>
        (room.gender||'').includes(genderFilter)
      );
    }

    if (sortOrderFilter) {
      filterRoomData = filterRoomData.filter((room) =>
        (room.sortOrder||'').includes(sortOrderFilter)
      );
    }

    if (statusFilter) {
      filterRoomData = filterRoomData.filter((room) =>
        room.status === "Active" ? room.activeSwitch : !room.activeSwitch
      );
    }

    setFilteredRoomData(filterRoomData);
  }, [
    roomData,
    roomNumberFilter,
    floorFilter,
    branchFilter,
    numberOfPersonFilter,
    genderFilter,
    sortOrderFilter,
    statusFilter,
  ]);


  // Filter Room Data
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Change Rows Per Page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open Add New Room Dialog
  const handleOpenAddNewRoom = () => {
    setOpenAddNewRoom(true);
  };
  // Close Add New Room Dialog
  const handleCloseAddNewRoom = () => {
    setOpenAddNewRoom(false);
  };

  const handleSaveNewRoom = async () => {
    try{
    const data = {
      number: dialogRoomNumber,
      floor: dialogFloor,
      branch: dialogBranch,
      noOfPerson: dialogNumberOfPerson,
      gender: dialogGender,
      picture: dialogPicture,
      order: dialogOrder,
      activeSwitch: dialogActiveSwitch,
    };

    const response = await axios.post(roomURL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newRoom = response.data;
    alert("New Room Added Successfully");
    console.log('New room added: ',newRoom);
    setRefreshTable(response.data);
    handleCloseAddNewRoom();
    } catch (error) {
      alert("Failed to add new room");
      console.error("Error: ", error);
    }
  };

  // Handle Dialog Input Change
  const handleDialogInputChange = (e, prop) => {
    const value = e.target.value;
    switch (prop) {
      case "roomNumber":
        setDialogRoomNumber(value);
        break;
      case "floor":
        setDialogFloor(value);
        break;
      case "branch":
        setDialogBranch(value);
        break;
      case "numberOfPerson":
        setDialogNumberOfPerson(value);
        break;
      case "gender":
        setDialogGender(value);
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

  // Handle Active Switch Change
  const handleActiveSwitchChange = () => {
    setDialogActiveSwitch(!dialogActiveSwitch);
  };

  // Use Dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setDialogPicture(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  // Destroy Dropzone
  const dropzoneProps = getRootProps();
  const inputProps = getInputProps();

  return (
    <Box>
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          {/* Header */}
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h1">Room Table</Typography>
              {/* Add Floor Button */}
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={handleOpenAddNewRoom}
              >
                Add Room
              </Button>
            </Box>
            {/*Room Filter */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} md={1.7}>
                <TextField
                  label="Room Name"
                  variant="outlined"
                  fullWidth
                  value={roomNumberFilter}
                  onChange={(e) => setRoomNumberFilter(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={1.7}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Floor</InputLabel>
                  <Select
                    value={floorFilter}
                    onChange={(e) => setFloorFilter(e.target.value)}
                    label="Floor"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {floorData.map((floor) => (
                      <MenuItem key={floor.id} value={floor.name}>
                        {floor.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1.7}>
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
              <Grid item xs={12} md={1.7}>
                <TextField
                  label="No of Person"
                  variant="outlined"
                  fullWidth
                  value={numberOfPersonFilter}
                  onChange={(e) => setNumberOfPersonFilter(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={1.7}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    label="Gender"
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value="Active">Male</MenuItem>
                    <MenuItem value="Inactive">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={1.7}>
                <TextField
                  label="Sort Order"
                  variant="outlined"
                  fullWidth
                  value={sortOrderFilter}
                  onChange={(e) => setSortOrderFilter(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={1.7}>
                <FormControl variant="outlined" fullWidth>
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
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={2}></Grid>
            {/* Room Table */}
            <TableContainer>
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
                  {filteredRoomData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>{room.number}</TableCell>
                        <TableCell>{room.floor}</TableCell>
                        <TableCell>{room.branch}</TableCell>
                        <TableCell>{room.noOfPerson}</TableCell>
                        <TableCell>{room.gender}</TableCell>
                        <TableCell>{room.order}</TableCell>
                        <TableCell>
                          <Switch checked={room.activeSwitch} disabled />
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
                count={filteredRoomData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
      {/* Add New Room Dialog */}{" "}
      <Dialog
        fullWidth
        maxWidth="md"
        open={openAddNewRoom}
        onClose={handleCloseAddNewRoom}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Add New Room</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Branch</InputLabel>
                <Select
                  value={dialogBranch}
                  onChange={(e) => handleDialogInputChange(e, "branch")}
                  label="Branch"
                >
                  
                  {branchData.map((branch) => (
                    <MenuItem key={branch.id} value={branch.name}>
                      
                      {branch.branchName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Floor</InputLabel>
                <Select
                  value={dialogFloor}
                  onChange={(e) => setDialogFloor(e, "floor")}
                  label="Floor"
                >
                  {floorData.map((floor) => (
                    <MenuItem key={floor.id} value={floor.name}>
                      {floor.floorNo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="Room No"
                variant="outlined"
                fullWidth
                value={dialogRoomNumber}
                onChange={(e) => setDialogRoomNumber(e, "roomNumber")}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="No of Person"
                variant="outlined"
                fullWidth
                value={dialogNumberOfPerson}
                onChange={(e) => handleDialogInputChange(e, "numberOfPerson")}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Gender</InputLabel>
                <Select
                value={dialogGender}
                onChange={(e) => handleDialogInputChange(e, "gender")}
                label="Gender"
                >
                  <MenuItem value="Both">Both</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
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
                  Drag &apos;n&lsquo; drop a picture here, or click to select
                  one
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
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Order"
                variant="outlined"
                fullWidth
                value={dialogOrder}
                onChange={(e) => handleDialogInputChange(e, "order")}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box display="flex" alignItems="center" mt={2}>
                <Typography>Active</Typography>
                <Switch
                  checked={dialogActiveSwitch}
                  onChange={handleActiveSwitchChange}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddNewRoom} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveNewRoom} color="primary">
            
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Room;