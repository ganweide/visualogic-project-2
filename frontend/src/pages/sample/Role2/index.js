import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Divider,
  Switch,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const roleURL = "http://localhost:5000/api/role";
const branchURL = "http://localhost:5000/api/branches";

const PermissionSection = ({ title, permissions, state, setState }) => {
  const handleChange = (permission) => (e) => {
    const key = `${title}${permission}`;
    const formattedKey = key.charAt(0).toLowerCase() + key.slice(1);
    setState((prev) => ({ ...prev, [formattedKey]: e.target.checked }));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={3}>
        <Typography>{title}</Typography>
      </Grid>
      {permissions.map((permission) => {
        const key = `${title}${permission}`;
        const formattedKey = key.charAt(0).toLowerCase() + key.slice(1);
        return (
        <Grid item xs={3} key={permission}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={state[`${formattedKey}`]}
                onChange={handleChange(permission)} 
              />
            }
            label={permission}
          />
        </Grid>
      )})}
    </Grid>
  );
};

const Role2 = () => {
  const [roleDatabase, setRoleDatabase] = useState([]);
  const [branchDatabase, setBranchDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);
  const [errors, setErrors] = useState({});

  const [dialogRoleName, setDialogRoleName] = useState("");
  const [dialogAllBranchCheckbox, setDialogAllBranchCheckbox] = useState(false);
  const [dialogBranch, setDialogBranch] = useState("");

  const [filters, setFilters] = useState({
    roleName: { value: null, matchMode: 'contains' },
    roleStatus: { value: null, matchMode: 'equals' }
  });

  // Retrieve Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roleResponse, branchResponse] = await Promise.all([
          axios.get(roleURL),
          axios.get(branchURL)
        ])
        setBranchDatabase(branchResponse.data)
        const transformedRoleData = roleResponse.data.map(role => ({
          ...role,
          branchName: branchResponse.data.find(branch => branch._id === role.branchName)?.branchName || 'Unknown Branch'
        }));
        setRoleDatabase(transformedRoleData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refreshTable]);

  // Role Checkboxes Generation
  const roles = [
    { title: 'Admin-Role', permission: ['View', 'Create', 'Update'] },
    { title: 'Admin-Banner', permission: ['View', 'Create', 'Update'] },
    { title: 'Admin-Message', permission: ['View', 'Create', 'Update'] },
    { title: 'Admin-Staff', permission: ['View', 'Create', 'Update'] },
    { title: 'Admin-Branch', permission: ['View', 'Create', 'Update'] },
    { title: 'Admin-Room', permission: ['View', 'Create', 'Update'] },
    { title: 'Admin-Package', permission: ['View', 'Create', 'Update'] },
    { title: 'Admin-Member', permission: ['View', 'Create', 'Update'] },
    { title: 'Admin-Booking', permission: ['View', 'Create', 'Update'] },
    { title: 'Member-CheckIn', permission: ['View', 'Create', 'Update'] },
    { title: 'Member-QR', permission: ['View', 'Create', 'Update'] },
    { title: 'Member-Staff', permission: ['View', 'Create', 'Update'] },
    { title: 'Finance-Purchase', permission: ['View', 'Create', 'Update'] },
    { title: 'Finance-CheckIn', permission: ['View', 'Create', 'Update'] },
    { title: 'Finance-Attendance', permission: ['View', 'Create', 'Update'] },
  ];

  const initialPermissionsState = roles.reduce((acc, { title, permission }) => {
    permission.forEach((perms) => {
      const key = `${title}${perms}`;
      // Ensure the first letter is lowercase, but keep the rest as is
      const formattedKey = key.charAt(0).toLowerCase() + key.slice(1);
      acc[formattedKey] = false;
    });
    acc['ActiveInactive'] = true;
    return acc;
  }, {});
  const [permissions, setPermissions] = useState(initialPermissionsState);

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

  // Data Validation
  const validateRoleFields = (fields) => {
    let isValid = true;
    let validationErrors = {};

    // Validation logic
    if (!dialogRoleName) {
      validationErrors.dialogRoleName = 'Role Name is required';
      isValid = false;
    }
    if (!dialogAllBranchCheckbox && !dialogBranch) {
      validationErrors.dialogBranch = 'Branch is required if All Branch is not checked';
      isValid = false;
    }

    return { isValid, validationErrors };
  }

  // Dialog Actions
  const [addNewRoleDialogOpen, setAddNewRoleDialogOpen] = useState(false);
  const handleOpenAddNewRoleDialog = () => {
    setAddNewRoleDialogOpen(true);
  }

  const handleCloseAddNewRoleDialog = () => {
    setAddNewRoleDialogOpen(false);
    setErrors({});
    setPermissions(initialPermissionsState);
    setDialogRoleName("");
    setDialogAllBranchCheckbox(false);
    setDialogBranch("");
  }

  const handleSaveNewRole = async () => {
    try {
      const transformPermissions = (permissions) => {
        const transformed = {};
        Object.entries(permissions).forEach(([key, value]) => {
          if (key === 'ActiveInactive') {
            transformed['roleStatus'] = value;
          } else {
            const parts = key.split('-');
            console.log("newpart", parts);
            const newKey = parts[0].toLowerCase() + parts.slice(1).join('');
            console.log("newKye", newKey);
            transformed[newKey] = value;
          }
        });
        return transformed;
      };

      const fields = {
        dialogRoleName,
        dialogAllBranchCheckbox,
        dialogBranch,
      };

      const { isValid, validationErrors } = validateRoleFields(fields);

      if (!isValid) {
        setErrors(validationErrors);
        return;
      }
  
      const roleData = {
        roleName: dialogRoleName,
        allBranchStatus: dialogAllBranchCheckbox,
        branchName: dialogAllBranchCheckbox ? null : dialogBranch,
        roleStatus: permissions.ActiveInactive,
        ...transformPermissions(permissions),
      };

      console.log('Role data to be saved:', JSON.stringify(roleData, null, 2));

      const response = await axios.post(roleURL, roleData);
      console.log('Role saved:', response.data);
      setRefreshTable(response.data);
      setSnackbarMessage('Role saved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleCloseAddNewRoleDialog();
    } catch (error) {
      console.error('Error saving role:', error);
      setSnackbarMessage('Error saving role');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const handleOpenEditDialog = (rowData) => {
    setEditingRoleId(rowData._id);
    setDialogRoleName(rowData.roleName);
    setDialogAllBranchCheckbox(rowData.allBranchStatus);
    setDialogBranch(!rowData.allBranchStatus && branchDatabase.find(branch => branch.branchName === rowData.branchName)._id);
    setPermissions({
      "admin-RoleView": rowData.adminRoleView,
      "admin-RoleCreate": rowData.adminRoleCreate,
      "admin-RoleUpdate": rowData.adminRoleUpdate,
      "admin-BannerView": rowData.adminBannerView,
      "admin-BannerCreate": rowData.adminBannerCreate,
      "admin-BannerUpdate": rowData.adminBannerUpdate,
      "admin-MessageView": rowData.adminMessageView,
      "admin-MessageCreate": rowData.adminMessageCreate,
      "admin-MessageUpdate": rowData.adminMessageUpdate,
      "admin-StaffView": rowData.adminStaffView,
      "admin-StaffCreate": rowData.adminStaffCreate,
      "admin-StaffUpdate": rowData.adminStaffUpdate,
      "admin-BranchView": rowData.adminBranchView,
      "admin-BranchCreate": rowData.adminBranchCreate,
      "admin-BranchUpdate": rowData.adminBranchUpdate,
      "admin-RoomView": rowData.adminRoomView,
      "admin-RoomCreate": rowData.adminRoomCreate,
      "admin-RoomUpdate": rowData.adminRoomUpdate,
      "admin-PackageView": rowData.adminPackageView,
      "admin-PackageCreate": rowData.adminPackageCreate,
      "admin-PackageUpdate": rowData.adminPackageUpdate,
      "admin-MemberView": rowData.adminMemberView,
      "admin-MemberCreate": rowData.adminMemberCreate,
      "admin-MemberUpdate": rowData.adminMemberUpdate,
      "admin-BookingView": rowData.adminBookingView,
      "admin-BookingCreate": rowData.adminBookingCreate,
      "admin-BookingUpdate": rowData.adminBookingUpdate,
      "member-CheckInView": rowData.memberCheckInView,
      "member-CheckInCreate": rowData.memberCheckInCreate,
      "member-CheckInUpdate": rowData.memberCheckInUpdate,
      "member-QRView": rowData.memberQRView,
      "member-QRCreate": rowData.memberQRCreate,
      "member-QRUpdate": rowData.memberQRUpdate,
      "member-StaffView": rowData.memberStaffView,
      "member-StaffCreate": rowData.memberStaffCreate,
      "member-StaffUpdate": rowData.memberStaffUpdate,
      "finance-PurchaseView": rowData.financePurchaseView,
      "finance-PurchaseCreate": rowData.financePurchaseCreate,
      "finance-PurchaseUpdate": rowData.financePurchaseUpdate,
      "finance-CheckInView": rowData.financeCheckInView,
      "finance-CheckInCreate": rowData.financeCheckInCreate,
      "finance-CheckInUpdate": rowData.financeCheckInUpdate,
      "finance-AttendanceView": rowData.financeAttendanceView,
      "finance-AttendanceCreate": rowData.financeAttendanceCreate,
      "finance-AttendanceUpdate": rowData.financeAttendanceUpdate,
      "ActiveInactive": rowData.roleStatus
    });
    setEditDialogOpen(true);
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setErrors({});
    setEditingRoleId(null);
    setPermissions(initialPermissionsState);
    setDialogRoleName("");
    setDialogAllBranchCheckbox(false);
    setDialogBranch("");
  }

  const handleSaveEditRole = async () => {
    try {
      const transformPermissions = (permissions) => {
        const transformed = {};
        Object.entries(permissions).forEach(([key, value]) => {
          if (key === 'ActiveInactive') {
            transformed['roleStatus'] = value;
          } else {
            const parts = key.split('-');
            console.log("newpart", parts);
            const newKey = parts[0].toLowerCase() + parts.slice(1).join('');
            console.log("newKye", newKey);
            transformed[newKey] = value;
          }
        });
        return transformed;
      };

      const fields = {
        dialogRoleName,
        dialogAllBranchCheckbox,
        dialogBranch,
      };

      const { isValid, validationErrors } = validateRoleFields(fields);

      if (!isValid) {
        setErrors(validationErrors);
        return;
      }

      const updatedRoleData = {
        roleName: dialogRoleName,
        allBranchStatus: dialogAllBranchCheckbox,
        branchName: dialogAllBranchCheckbox ? null : dialogBranch,
        roleStatus: permissions.ActiveInactive,
        ...transformPermissions(permissions),
      };
  
      const response = await axios.put(`${roleURL}/${editingRoleId}`, updatedRoleData);
      
      if (response.status === 200) {
        console.log('Role updated successfully');
        setRefreshTable(prev => !prev);
        setSnackbarMessage('Edited role saved successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleCloseEditDialog();
      } else {
        console.error('Failed to update role');
        setSnackbarMessage('Error saving role');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingRole, setDeletingRole] = useState(null);
  const handleOpenDeleteDialog = (rowData) => {
    setDeletingRole(rowData);
    setDeleteDialogOpen(true);
  }

  const handleCloseDeleteDialog = () => {
    setDeletingRole(null);
    setDeleteDialogOpen(false);
  }

  const handleDeleteRole = async () => {
    try {
      await axios.delete(`${roleURL}/${deletingRole._id}`);
      setSnackbarMessage('Role deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setRefreshTable(prev => !prev);
    } catch (error) {
      console.error('Error deleting role:', error);
      setSnackbarMessage('Error deleting role');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      handleCloseDeleteDialog();
    }
  }
  

  // Checkbox Actions
  const handleClickCheckboxAllBranch = (e) => {
    setDialogAllBranchCheckbox(e.target.checked);
  }

  // Switch Actions
  const handleClickSwitchActiveInactive = (e) => {
    setPermissions((prev) => ({ ...prev, ActiveInactive: e.target.checked }));
  }

  const statusBodyTemplate = (rowData) => {
    return rowData.roleStatus ? 'Active' : 'Inactive';
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown 
        value={filters.roleStatus.value}
        options={[
          { label: 'Active', value: true },
          { label: 'Inactive', value: false },
        ]} 
        onChange={(e) => {
          setFilters(prevFilters => ({
            ...prevFilters,
            roleStatus: { value: e.value, matchMode: 'equals' }
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
              <Typography variant="h1">Role Table</Typography>
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={handleOpenAddNewRoleDialog}
              >
                Add New
              </Button>
            </Box>
          </Grid>
          {/* Table */}
          <Grid item xs={12} md={12}>
            <DataTable 
              value={roleDatabase} 
              paginator 
              rows={10} 
              dataKey="id" 
              filters={filters} 
              filterDisplay="row" 
              loading={roleDatabase.length === 0}
              emptyMessage="No roles found."
            >
              <Column
                field="roleName"
                header="Role Name"
                filter
                filterPlaceholder="Filter by Name"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="status"
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
      {/* Dialog Add New Role */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={addNewRoleDialogOpen}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Create Role</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setDialogRoleName(e.target.value)}
                margin="dense"
                label="Role Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogRoleName}
                error={!!errors.dialogRoleName}
                helperText={<Typography color="error">{errors.dialogRoleName}</Typography>}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={dialogAllBranchCheckbox} onChange={handleClickCheckboxAllBranch} />} label='All Branch' />
              </FormGroup>
            </Grid>
            {!dialogAllBranchCheckbox && (
              <Grid item xs={12} md={12}>
                <FormControl fullWidth margin="dense" error={!!errors.dialogBranch}>
                  <InputLabel id="branch-select">Branch</InputLabel>
                  <Select
                    labelId ="branch-select"
                    id      ="branch-select"
                    value   ={dialogBranch}
                    label   ="Branch"
                    onChange={(e) => {setDialogBranch(e.target.value)}}
                  >
                    {branchDatabase.length > 0 ? (
                      branchDatabase.map((row) => (
                        <MenuItem key={row._id} value={row._id}>{row.branchName}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value="" disabled>No branches set up yet</MenuItem>
                    )}
                  </Select>
                  {errors.dialogBranch && (
                    <FormHelperText error><Typography color="error">{errors.dialogBranch}</Typography></FormHelperText>
                  )}
                </FormControl>
              </Grid>
              )
            }
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              {/* Other Permissions */}
              {roles.map(({ title, permission }) => (
                <PermissionSection
                  key={title}
                  title={title}
                  permissions={permission}
                  state={permissions}
                  setState={setPermissions}
                />
              ))}
              {/* Active/InActive */}
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Active/InActive</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Switch
                    checked={permissions.ActiveInactive}
                    onChange={handleClickSwitchActiveInactive}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveNewRole}>Save</Button>
          <Button color="error" variant="outlined" onClick={handleCloseAddNewRoleDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Edit Role */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={editDialogOpen}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Edit Role</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setDialogRoleName(e.target.value)}
                margin="dense"
                label="Role Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogRoleName}
                error={!!errors.dialogRoleName}
                helperText={<Typography color="error">{errors.dialogRoleName}</Typography>}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={dialogAllBranchCheckbox} onChange={handleClickCheckboxAllBranch} />} label='All Branch' />
              </FormGroup>
            </Grid>
            {!dialogAllBranchCheckbox && (
              <Grid item xs={12} md={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="branch-select">Branch</InputLabel>
                  <Select
                    labelId ="branch-select"
                    id      ="branch-select"
                    value   ={dialogBranch}
                    label   ="Branch"
                    onChange={(e) => {setDialogBranch(e.target.value)}}
                  >
                    {branchDatabase.length > 0 ? (
                      branchDatabase.map((row) => (
                        <MenuItem key={row._id} value={row._id}>{row.branchName}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value="" disabled>No branches set up yet</MenuItem>
                    )}
                  </Select>
                  {errors.dialogBranch && (
                    <FormHelperText error><Typography color="error">{errors.dialogBranch}</Typography></FormHelperText>
                  )}
                </FormControl>
              </Grid>
              )
            }
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              {/* Other Permissions */}
              {roles.map(({ title, permission }) => (
                  <PermissionSection
                    key={title}
                    title={title}
                    permissions={permission}
                    state={permissions}
                    setState={setPermissions}
                  />
              ))}
              {/* Active/InActive */}
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Active/InActive</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Switch
                    checked={permissions.ActiveInactive}
                    onChange={handleClickSwitchActiveInactive}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveEditRole}>Save</Button>
          <Button color="error" variant="outlined" onClick={handleCloseEditDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Delete Role */}
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
          <Typography>Are you sure you want to delete the role: {deletingRole?.roleName}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleDeleteRole}>Delete</Button>
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

export default Role2