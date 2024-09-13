import axios from "axios";
import React, { useState, useEffect } from "react"
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  IconButton,
  FormControlLabel,
  Checkbox,
  FormGroup,
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

const staffURL = "http://localhost:5000/api/staff";
const roleURL = "http://localhost:5000/api/role";
const branchURL = "http://localhost:5000/api/branches";

const Staff = () => {
  const [staffDatabase, setStaffDatabase] = useState([]);
  const [branchDatabase, setBranchDatabase] = useState([]);
  const [roleDatabase, setRoleDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);

  const [filters, setFilters] = useState({
    staffName: { value: null, matchMode: 'contains' },
    staffGender: { value: null, matchMode: 'contains' },
    roleName: { value: null, matchMode: 'contains' },
    branchName: { value: null, matchMode: 'contains' },
    staffMobileNo: { value: null, matchMode: 'contains' },
    staffStatus: { value: null, matchMode: 'equals' }
  });

  // Add New Staff Dialog Constants
  const [dialogName, setDialogName] = useState("")
  const [dialogStaffCode, setDialogStaffCode] = useState("")
  const [isAllBranch, setIsAllBranch] = useState(false);
  const [dialogBranchName, setDialogBranchName] = useState("")
  const [dialogGender, setDialogGender] = useState("")
  const [dialogRole, setDialogRole] = useState("")
  const [dialogJoinDate, setDialogJoinDate] = useState("")
  const [dialogUsername, setDialogUsername] = useState("")
  const [dialogPassword, setDialogPassword] = useState("")
  const [dialogEmail, setDialogEmail] = useState("")
  const [dialogPosition, setDialogPosition] = useState("")
  const [dialogFullName, setDialogFullName] = useState("")
  const [dialogNRIC, setDialogNRIC] = useState("")
  const [dialogReligion, setDialogReligion] = useState("")
  const [dialogMobileNo, setDialogMobileNo] = useState("")
  const [dialogMartialStatus, setDialogMartialStatus] = useState("")
  const [dialogCurrentAddress, setDialogCurrentAddress] = useState("")
  const [dialogBankName, setDialogBankName] = useState("")
  const [dialogAccountNo, setDialogAccountNo] = useState("")
  const [dialogEPFONo, setDialogEPFONo] = useState("")
  const [dialogSOCSNo, setDialogSOCSNo] = useState("")
  const [dialogIncomeTaxNo, setDialogIncomeTaxNo] = useState("")
  const [dialogEmergencyContactName, setDialogEmergencyContactName] = useState("")
  const [dialogEmergencyRelation, setDialogEmergencyRelation] = useState("")
  const [dialogEmergencyContact, setDialogEmergencyContact] = useState("")
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(true)

  // Retrieve Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [staffResponse, branchResponse, roleResponse] = await Promise.all([
          axios.get(staffURL),
          axios.get(branchURL),
          axios.get(roleURL)
        ]);


        setBranchDatabase(branchResponse.data);
        setRoleDatabase(roleResponse.data);

        // Transform staff data to include role names
        const transformedStaffData = staffResponse.data.map(staff => ({
          ...staff,
          roleName: roleResponse.data.find(role => role._id === staff.roleName)?.roleName || 'Unknown Role',
          branchName: !staff.branchName
            ? (staff.allBranchStatus ? "All Branch" : "Unknown Branch")
            : (branchResponse.data.find(branch => branch._id === staff.branchName)?.branchName || 'Unknown Branch'),
        }));

        setStaffDatabase(transformedStaffData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refreshTable]);

  // Datatable Templates
  const statusBodyTemplate = (rowData) => {
    return rowData.staffStatus ? 'Active' : 'Inactive';
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown 
        value={filters.staffStatus.value}
        options={[
          { label: 'Active', value: true },
          { label: 'Inactive', value: false },
        ]} 
        onChange={(e) => {
          setFilters(prevFilters => ({
            ...prevFilters,
            staffStatus: { value: e.value, matchMode: 'equals' }
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
  const [addNewStaffDialogOpen, setAddNewStaffDialogOpen] = useState(false);
  const handleOpenAddNewStaffDialog = () => {
    setAddNewStaffDialogOpen(true);
  }

  const handleCloseAddNewStaffDialog = () => {
    setDialogName([]);
    setDialogStaffCode([]);
    setDialogBranchName("");
    setDialogGender([]);
    setDialogRole("");
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
    setIsAllBranch(false);
    setAddNewStaffDialogOpen(false);
  }

  const handleSaveNewStaff = async () => {
    console.log("dialogRole", dialogRole);
    try {
      const data = {
        staffName: dialogName,
        staffCode: dialogStaffCode,
        allBranchStatus: isAllBranch,
        branchName: dialogBranchName ? dialogBranchName : null,
        staffGender: dialogGender,
        roleName: dialogRole ? dialogRole : null,
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

      const response = await axios.post(staffURL, data);

      const newStaff = response.data;
      alert('Staff created successfully!!');
      console.log('New Staff added:', newStaff);
      setRefreshTable(response.data);
      handleCloseAddNewStaffDialog();
    } catch (error) {
      alert('Failed to save Staff');
      console.error('Error:', error);
    }
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const handleOpenEditDialog = (rowData) => {
    setEditingStaffId(rowData._id);
    setDialogName(rowData.staffName);
    setDialogStaffCode(rowData.staffCode);
    setIsAllBranch(rowData.allBranchStatus);
    setDialogBranchName(branchDatabase.find(branch => branch.branchName === rowData.branchName)?._id || null);
    setDialogGender(rowData.staffGender);
    setDialogRole(roleDatabase.find(role => role.roleName === rowData.roleName)._id);
    setDialogJoinDate(rowData.staffJoinDate);
    setDialogUsername(rowData.staffUsername);
    setDialogPassword(rowData.staffPassword);
    setDialogEmail(rowData.staffEmail);
    setDialogPosition(rowData.staffPosition);
    setDialogFullName(rowData.staffFullName);
    setDialogNRIC(rowData.staffNRIC);
    setDialogReligion(rowData.staffReligion);
    setDialogMobileNo(rowData.staffMobileNo);
    setDialogMartialStatus(rowData.staffMartialStatus);
    setDialogCurrentAddress(rowData.staffCurrentAddress);
    setDialogBankName(rowData.bankName);
    setDialogAccountNo(rowData.bankAccountNo);
    setDialogEPFONo(rowData.staffEPF);
    setDialogSOCSNo(rowData.staffSOCSO);
    setDialogIncomeTaxNo(rowData.staffIncomeTax);
    setDialogEmergencyContactName(rowData.emergencyContactName);
    setDialogEmergencyRelation(rowData.emergencyContactRelation);
    setDialogEmergencyContact(rowData.emergencyContactNo);
    setDialogActiveSwitch(rowData.staffStatus);
    setEditDialogOpen(true);
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditingStaffId(null);
    setDialogName("")
    setDialogStaffCode("")
    setDialogBranchName("")
    setDialogGender("")
    setDialogRole("")
    setDialogJoinDate("")
    setDialogUsername("")
    setDialogPassword("")
    setDialogEmail("")
    setDialogPosition("")
    setDialogFullName("")
    setDialogNRIC("")
    setDialogReligion("")
    setDialogMobileNo("")
    setDialogMartialStatus("")
    setDialogCurrentAddress("")
    setDialogBankName("")
    setDialogAccountNo("")
    setDialogEPFONo("")
    setDialogSOCSNo("")
    setDialogIncomeTaxNo("")
    setDialogEmergencyContactName("")
    setDialogEmergencyRelation("")
    setDialogEmergencyContact("")
    setDialogActiveSwitch(true);
    setIsAllBranch(false);
  }

  const handleSaveEditStaff = async () => {
    try {
      const updatedStaffData = {
        staffName: dialogName,
        staffCode: dialogStaffCode,
        staffGender: dialogGender,
        allBranchStatus: isAllBranch,
        branchName: dialogBranchName ? dialogBranchName : null,
        roleName: dialogRole ? dialogRole : null,
        staffJoinDate: dialogJoinDate,
        staffUsername: dialogUsername,
        staffPassword: dialogPassword,
        staffStatus: dialogActiveSwitch,
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
      };
  
      const response = await axios.put(`${staffURL}/${editingStaffId}`, updatedStaffData);
      
      if (response.status === 200) {
        console.log('Staff updated successfully');
        setRefreshTable(prev => !prev);
        setSnackbarMessage('Edited staff saved successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleCloseEditDialog();
      } else {
        console.error('Failed to update staff');
        setSnackbarMessage('Error saving staff');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingStaff, setDeletingStaff] = useState(null);
  const handleOpenDeleteDialog = (rowData) => {
    setDeletingStaff(rowData);
    setDeleteDialogOpen(true);
  }

  const handleCloseDeleteDialog = () => {
    setDeletingStaff(null);
    setDeleteDialogOpen(false);
  }

  const handleDeleteStaff = async () => {
    try {
      await axios.delete(`${staffURL}/${deletingStaff._id}`);
      setSnackbarMessage('Staff deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setRefreshTable(prev => !prev);
    } catch (error) {
      console.error('Error deleting staff:', error);
      setSnackbarMessage('Error deleting staff');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      handleCloseDeleteDialog();
    }
  }

  // Switch Actions
  const handleClickSwitchActiveInactive = (e) => {
    setDialogActiveSwitch(e.target.checked);
  }

  // Checkbox Actions
  const handleClickCheckboxAllBranch = (e) => {
    setIsAllBranch(e.target.checked);
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
          {/* Staff Table */}
          <Grid item xs={12} md={12}>
            <DataTable 
              value={staffDatabase} 
              paginator 
              rows={10} 
              dataKey="id" 
              filters={filters} 
              filterDisplay="row" 
              loading={staffDatabase.length === 0}
              emptyMessage="No roles found."
            >
              <Column
                field="staffName"
                header="Staff Name"
                filter
                filterPlaceholder="Filter by Name"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="staffGender"
                header="Gender"
                filter
                filterPlaceholder="Filter by Gender"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="roleName"
                header="Role"
                filter
                filterPlaceholder="Filter by Role"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="branchName"
                header="Branch"
                filter
                filterPlaceholder="Filter by Branch"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="staffMobileNo"
                header="Mobile No."
                filter
                filterPlaceholder="Filter by Mobile No."
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="staffStatus"
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
      {/* Add New Staff Dialog */}
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
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Staff Information</Typography>
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
              <TextField
                onChange={(e) => setDialogName(e.target.value)}
                margin="dense"
                label="Staff Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogName}
              />
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
                      <MenuItem key={role._id} value={role._id}>
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
            <Grid item xs={6} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={isAllBranch} onChange={handleClickCheckboxAllBranch} />}
                  label='All Branch'
                />
              </FormGroup>
            </Grid>
            {!isAllBranch && (
              <Grid item xs={12} md={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="branch-select">Branch Name</InputLabel>
                  <Select
                    labelId ="branch-select"
                    id      ="branch-select"
                    value   ={dialogBranchName}
                    label   ="Branch Name"
                    onChange={(e) => {setDialogBranchName(e.target.value)}}
                  >
                    {branchDatabase.length > 0 ? (
                      branchDatabase.map((option, index) => (
                        <MenuItem key={index} value={option._id}>{option.branchName}</MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No branches set up yet</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Account Information</Typography>
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
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Staff Details</Typography>
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
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Financial Information</Typography>
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
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Emergency Contact</Typography>
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
              <Typography variant="h5">Other Settings</Typography>
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
      {/* Dialog Edit Staff */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={editDialogOpen}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Edit Staff</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Staff Information</Typography>
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
              <TextField
                onChange={(e) => setDialogName(e.target.value)}
                margin="dense"
                label="Staff Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogName}
              />
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
                      <MenuItem key={role._id} value={role._id}>
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
            <Grid item xs={6} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={isAllBranch} onChange={handleClickCheckboxAllBranch} />}
                  label='All Branch'
                />
              </FormGroup>
            </Grid>
            {!isAllBranch && (
              <Grid item xs={12} md={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="branch-select">Branch Name</InputLabel>
                  <Select
                    labelId ="branch-select"
                    id      ="branch-select"
                    value   ={dialogBranchName}
                    label   ="Branch Name"
                    onChange={(e) => {setDialogBranchName(e.target.value)}}
                  >
                    {branchDatabase.length > 0 ? (
                      branchDatabase.map((option, index) => (
                        <MenuItem key={index} value={option._id}>{option.branchName}</MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No branches set up yet</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Account Information</Typography>
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
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Staff Details</Typography>
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
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Financial Information</Typography>
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
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Emergency Contact</Typography>
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
              <Typography variant="h5">Other Settings</Typography>
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
          <Button onClick={handleSaveEditStaff} variant="contained">Save</Button>
          <Button onClick={handleCloseEditDialog} color="error" variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Delete Staff */}
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
          <Typography>Are you sure you want to delete the staff: {deletingStaff?.staffName}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleDeleteStaff}>Delete</Button>
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

export default Staff