import axios from "axios";
import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Switch,
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
  IconButton,
  TablePagination,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Styles from "./style";

const staffURL = "http://localhost:5000/api/staff";
const roleURL = "http://localhost:5000/api/role";
const branchURL = "http://localhost:5000/api/branches";
const useStyles = makeStyles(Styles);

const Staff = () => {
  const classes = useStyles();
  const tableHead = ["Name", "Gender", "Role", "Branch", "Mobile No.", "Status", ""];
  const [staffDatabase, setStaffDatabase] = useState([]);
  const [branchDatabase, setBranchDatabase] = useState([]);
  const [roleDatabase, setRoleDatabase] = useState([]);
  const [filteredStaffData, setFilteredStaffData] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);
  // Filtering Bar
  const [branchNameFilterItems, setBranchNameFilterItems] = useState([]);
  const [roleFilterItems, setRoleFilterItems] = useState([]);
  const [nameFilter, setNameFilter]  = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [mobileNoFilter, setMobileNoFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Add New Staff Dialog Constants
  const [dialogName, setDialogName] = useState([])
  const [dialogStaffCode, setDialogStaffCode] = useState([])
  const [dialogBranchNameItems, setDialogBranchNameItems] = useState([]);
  const [dialogBranchName, setDialogBranchName] = useState([])
  const [dialogGender, setDialogGender] = useState([])
  const [dialogRole, setDialogRole] = useState([])
  const [dialogJoinDate, setDialogJoinDate] = useState([])
  const [dialogUsername, setDialogUsername] = useState([])
  const [dialogPassword, setDialogPassword] = useState([])
  const [dialogEmail, setDialogEmail] = useState([])
  const [dialogPosition, setDialogPosition] = useState([])
  const [dialogFullName, setDialogFullName] = useState([])
  const [dialogNRIC, setDialogNRIC] = useState([])
  const [dialogReligion, setDialogReligion] = useState([])
  const [dialogMobileNo, setDialogMobileNo] = useState([])
  const [dialogMartialStatus, setDialogMartialStatus] = useState([])
  const [dialogCurrentAddress, setDialogCurrentAddress] = useState([])
  const [dialogBankName, setDialogBankName] = useState([])
  const [dialogAccountNo, setDialogAccountNo] = useState([])
  const [dialogEPFONo, setDialogEPFONo] = useState([])
  const [dialogSOCSNo, setDialogSOCSNo] = useState([])
  const [dialogIncomeTaxNo, setDialogIncomeTaxNo] = useState([])
  const [dialogEmergencyContactName, setDialogEmergencyContactName] = useState([])
  const [dialogEmergencyRelation, setDialogEmergencyRelation] = useState([])
  const [dialogEmergencyContact, setDialogEmergencyContact] = useState([])
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(true)

  // Retrieve Data
  useEffect(() => {
    try {
      axios.get(staffURL).then((response) => {
        setStaffDatabase(response.data);
        const branch = response.data.map(data => data.branchName || 'null');
        const role = response.data.map(data => data.role || 'null');

        const uniqueBranchName = ['All', ...new Set(branch)];
        const uniqueRole = ['All', ...new Set(role)];
        setBranchNameFilterItems(uniqueBranchName);
        setRoleFilterItems(uniqueRole);
      })
    } catch (error) {
      console.log(error)
    }
    try {
      axios.get(branchURL).then((response) => {
        setBranchDatabase(response.data);
        const branch = response.data.map(data => data.branchName || 'null');

        const uniqueBranchName = [...new Set(branch)];
        setDialogBranchNameItems(uniqueBranchName);
      })
    } catch (error) {
      console.log(error)
    }
    try {
      axios.get(roleURL).then((response) => {
        setRoleDatabase(response.data);
      })
    } catch (error) {
      console.log(error)
    }
  }, [refreshTable]);

  // Filtering Bar
  useEffect(() => {
    let filtered = [...staffDatabase];

    if (branchFilter && branchFilter !== 'All') {
      filtered = filtered.filter((item) => item.branchName.includes(branchFilter));
    }

    if (nameFilter) {
      filtered = filtered.filter((item) =>
        (item.name || '').toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
  
    // Filter by Mobile Number
    if (mobileNoFilter) {
      filtered = filtered.filter((item) =>
        (item.mobileNo || '').includes(mobileNoFilter)
      );
    }

    if (genderFilter && genderFilter !== 'All') {
      filtered = filtered.filter((item) => item.gender.includes(genderFilter));
    }

    if (statusFilter && statusFilter !== 'All') {
      filtered = filtered.filter((item) => (statusFilter === 'active' ? item.activeSwitch : !item.activeSwitch));
    }

    setFilteredStaffData(filtered);
  }, [branchDatabase, branchFilter, nameFilter, statusFilter, genderFilter, mobileNoFilter]);

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
  const [addNewStaffDialogOpen, setAddNewStaffDialogOpen] = useState(false);
  const handleOpenAddNewStaffDialog = () => {
    setAddNewStaffDialogOpen(true);
  }

  const handleCloseAddNewStaffDialog = () => {
    setDialogName([]);
    setDialogStaffCode([]);
    setDialogBranchName([]);
    setDialogGender([]);
    setDialogRole([]);
    setDialogJoinDate([]);
    setDialogUsername([]);
    setDialogPassword([]);
    setDialogEmail([]);
    setDialogPosition([]);
    setDialogFullName([]);
    setDialogNRIC([]);
    setDialogReligion([]);
    setDialogMobileNo([]);
    setDialogMartialStatus([]);
    setDialogCurrentAddress([]);
    setDialogBankName([]);
    setDialogAccountNo([]);
    setDialogEPFONo([]);
    setDialogSOCSNo([]);
    setDialogIncomeTaxNo([]);
    setDialogEmergencyContactName([]);
    setDialogEmergencyRelation([]);
    setDialogEmergencyContact([]);
    setDialogActiveSwitch(true);
    setAddNewStaffDialogOpen(false);
  }

  const handleSaveNewStaff = async () => {
    try {
      const data = {
        staffName: dialogName,
        staffCode: dialogStaffCode,
        branchName: dialogBranchName,
        staffGender: dialogGender,
        roleName: dialogRole,
        staffJoinDate: dialogJoinDate,
        staffUsername: dialogUsername,
        staffPassword: dialogPassword,
        staffEmail: dialogEmail,
        staffPosition: dialogPosition,
        staffFullName: dialogFullName,
        staffNRIC: dialogNRIC,
        staffReligion: dialogReligion,
        staffMobileNo: dialogMobileNo,
        staffMartialStatus: dialogMartialStatus,
        staffCurrentAddress: dialogCurrentAddress,
        bankName: dialogBankName,
        bankAccountNo: dialogAccountNo,
        staffEPF: dialogEPFONo,
        staffSOCSO: dialogSOCSNo,
        staffIncomeTax: dialogIncomeTaxNo,
        emergencyContactName: dialogEmergencyContactName,
        emergencyContactRelation: dialogEmergencyRelation,
        emergencyContactNo: dialogEmergencyContact,
        staffStatus: dialogActiveSwitch,
      };

      const response = await axios.post(staffURL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const newStaff = response.data;
      alert('Staff created successfully!');
      console.log('New Staff added:', newStaff);
      setRefreshTable(response.data);
      handleCloseAddNewStaffDialog();
    } catch (error) {
      alert('Failed to save Staff');
      console.error('Error:', error);
    }
  };

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
              <Typography variant="h1">Staff Table</Typography>
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={handleOpenAddNewStaffDialog}
              >
                Add New
              </Button>
            </Box>
          </Grid>
          {/* Filter Bar */}
          <Grid item xs={2} md={2}>
            <TextField
              fullWidth
              margin="dense"
              label="Filter by Name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="gender-select">Filter by Gender</InputLabel>
              <Select
                labelId ="gender-select"
                id      ="gender-select"
                value   ={genderFilter}
                label   ="Filter by Gender"
                onChange={(e) => {setGenderFilter(e.target.value)}}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} md={2}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="role-select">Filter by Role</InputLabel>
              <Select
                labelId ="role-select"
                id      ="role-select"
                value   ={roleFilter}
                label   ="Filter by Role"
                onChange={(e) => {setRoleFilter(e.target.value)}}
              >
                {roleFilterItems.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} md={2}>
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
          <Grid item xs={2} md={2}>
            <TextField
              fullWidth
              margin="dense"
              label="Filter by Mobile No."
              value={mobileNoFilter}
              onChange={(e) => setMobileNoFilter(e.target.value)}
            />
          </Grid>
          <Grid item xs={2} md={2}>
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
                {filteredStaffData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
                  <TableRow key={index}>
                    <TableCell style={{textAlign: "left"}}>{data.name}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{data.gender}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{data.role}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{data.branchName}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{data.mobileNo}</TableCell>
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
              count={filteredStaffData.length}
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
        open              ={addNewStaffDialogOpen}
        onClose           ={handleCloseAddNewStaffDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Create Staff</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogName(e.target.value)}
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogName}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogStaffCode(e.target.value)}
                margin="dense"
                label="Staff Code"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogStaffCode}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="branch-select">Branch Name</InputLabel>
                <Select
                  labelId ="branch-select"
                  id      ="branch-select"
                  value   ={dialogBranchName}
                  label   ="Branch Name"
                  onChange={(e) => {setDialogBranchName(e.target.value)}}
                >
                  {dialogBranchNameItems.length > 0 ? (
                    dialogBranchNameItems.map((option, index) => (
                      <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No branches set up yet</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="gender-select">Gender</InputLabel>
                <Select
                  labelId ="gender-select"
                  id      ="gender-select"
                  value   ={dialogGender}
                  label   ="Gender"
                  onChange={(e) => {setDialogGender(e.target.value)}}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="role-select">Role</InputLabel>
                <Select
                  labelId ="role-select"
                  id      ="role-select"
                  value   ={dialogRole}
                  label   ="Role"
                  onChange={(e) => {setDialogRole(e.target.value)}}
                >
                  {roleDatabase.length > 0 ? (
                    roleDatabase.map((role) => (
                      <MenuItem key={role._id} value={role.roleName}>
                        {role.roleName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No roles set up yet</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setDialogJoinDate(e.target.value)}
                margin="dense"
                label="Joining Date"
                type="date"
                fullWidth
                variant="outlined"
                value={dialogJoinDate}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogUsername(e.target.value)}
                margin="dense"
                label="Username"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogUsername}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogPassword(e.target.value)}
                margin="dense"
                label="Password"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogPassword}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogEmail(e.target.value)}
                margin="dense"
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogEmail}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogPosition(e.target.value)}
                margin="dense"
                label="Position"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogPosition}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogFullName(e.target.value)}
                margin="dense"
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogFullName}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogNRIC(e.target.value)}
                margin="dense"
                label="NRIC"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogNRIC}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogReligion(e.target.value)}
                margin="dense"
                label="Religion"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogReligion}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogMobileNo(e.target.value)}
                margin="dense"
                label="Mobile No."
                type="text"
                fullWidth
                variant="outlined"
                value={dialogMobileNo}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="martial-status-select">Martial Status</InputLabel>
                <Select
                  labelId ="martial-status-select"
                  id      ="martial-status-select"
                  value   ={dialogMartialStatus}
                  label   ="Martial Status"
                  onChange={(e) => {setDialogMartialStatus(e.target.value)}}
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Divorced">Divorced</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogCurrentAddress(e.target.value)}
                margin="dense"
                label="Current Address"
                type="text"
                fullWidth
                multiline
                row={3}
                variant="outlined"
                value={dialogCurrentAddress}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogBankName(e.target.value)}
                margin="dense"
                label="Bank Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogBankName}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogAccountNo(e.target.value)}
                margin="dense"
                label="Account No."
                type="text"
                fullWidth
                variant="outlined"
                value={dialogAccountNo}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogEPFONo(e.target.value)}
                margin="dense"
                label="EPFO No."
                type="text"
                fullWidth
                variant="outlined"
                value={dialogEPFONo}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogSOCSNo(e.target.value)}
                margin="dense"
                label="SOCS No."
                type="text"
                fullWidth
                variant="outlined"
                value={dialogSOCSNo}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogIncomeTaxNo(e.target.value)}
                margin="dense"
                label="Income Tax No."
                type="text"
                fullWidth
                variant="outlined"
                value={dialogIncomeTaxNo}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogEmergencyContactName(e.target.value)}
                margin="dense"
                label="Emergency Contact Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogEmergencyContactName}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogEmergencyRelation(e.target.value)}
                margin="dense"
                label="Emergency Relation"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogEmergencyRelation}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setDialogEmergencyContact(e.target.value)}
                margin="dense"
                label="Emergency Contact"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogEmergencyContact}
              />
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
          <Button onClick={handleSaveNewStaff}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Staff