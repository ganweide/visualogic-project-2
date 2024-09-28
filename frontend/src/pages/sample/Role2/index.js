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
import { MultiSelect } from 'primereact/multiselect';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import CreateRole from './CreateRole';
import PermissionSection from './PermissionCheckbox';

const roleURL = "http://localhost:5000/api/role";
const branchURL = "http://localhost:5000/api/branches";

const Role2 = () => {
  const [roleDatabase, setRoleDatabase] = useState([]);
  const [branchDatabase, setBranchDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);
  const [errors, setErrors] = useState({});

  const [dialogRoleName, setDialogRoleName] = useState("");
  const [dialogAllBranchCheckbox, setDialogAllBranchCheckbox] = useState(false);
  const [dialogBranch, setDialogBranch] = useState("");
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(true);

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
    const parts = title.split('-');
    const roleKey = parts[0].toLowerCase() + parts.slice(1).join('');
    acc[roleKey] = {}
    permission.forEach((perms) => {
      acc[roleKey][perms.toLowerCase()] = false;
    });
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

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
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
    setDialogActiveSwitch(true);
    setDialogRoleName("");
    setDialogAllBranchCheckbox(false);
    setDialogBranch("");
  }

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const handleOpenEditDialog = (rowData) => {
    setEditingRoleId(rowData._id);
    setDialogRoleName(rowData.roleName);
    setDialogAllBranchCheckbox(rowData.allBranchStatus);
    setDialogBranch(!rowData.allBranchStatus && branchDatabase.find(branch => branch.branchName === rowData.branchName)._id);
    setDialogActiveSwitch(rowData.roleStatus);
    const editingRole = {};
    for (const key in rowData) {
      if (key !== '_id' && key !== 'roleName' && key !== 'allBranchStatus' && key !== 'branchName' && key !== 'roleStatus' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'deletedAt') {
        editingRole[key] = {
          view: rowData[key].view,
          create: rowData[key].create,
          update: rowData[key].update,
        }
      }
    }
    setPermissions(editingRole);
    setEditDialogOpen(true);
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setErrors({});
    setEditingRoleId(null);
    setPermissions(initialPermissionsState);
    setDialogActiveSwitch(true);
    setDialogRoleName("");
    setDialogAllBranchCheckbox(false);
    setDialogBranch("");
  }

  const handleSaveEditRole = async () => {
    try {
      const { isValid, validationErrors } = validateRoleFields();

      if (!isValid) {
        setErrors(validationErrors);
        return;
      }

      const updatedRoleData = {
        roleName: dialogRoleName,
        allBranchStatus: dialogAllBranchCheckbox,
        branchName: dialogAllBranchCheckbox ? null : dialogBranch,
        roleStatus: dialogActiveSwitch,
        ...permissions,
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
    setDialogActiveSwitch(e.target.checked);
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

  const columns = [
    { field: 'roleName', header: 'Role Name' },
    { field: 'status', header: 'Status' },
    { field: 'actions', header: 'Actions' }
  ];

  const [visibleColumns, setVisibleColumns] = useState(columns);

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));
    setVisibleColumns(orderedSelectedColumns);
  };

  const header = (
    <MultiSelect
      value={visibleColumns}
      options={columns}
      optionLabel="header"
      onChange={onColumnToggle}
      className="w-full sm:w-20rem"
      display="chip"
    />
  );

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
              header={header} // Add the header with MultiSelect
            >
              {visibleColumns.map((col) => (
                <Column
                  key={col.field}
                  field={col.field}
                  header={col.header}
                  filter={col.field === 'roleName' || col.field === 'status'} // Enable filter for both roleName and status
                  filterElement={col.field === 'status' ? statusFilterTemplate : null} // Use your existing status filter template
                  filterPlaceholder={col.field === 'roleName' ? "Filter by Name" : "Filter by Status"}
                  style={{ minWidth: col.field === 'roleName' ? '12rem' : '8rem' }} // Adjust styles as needed
                  sortable={col.field === 'roleName'} // Keep sortable for roleName
                  body={col.field === 'status' ? statusBodyTemplate : col.field === 'actions' ? actionBodyTemplate : null} // Conditional body
                />
              ))}
            </DataTable>
            {/* <DataTable 
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
            </DataTable> */}
          </Grid>
        </Grid>
      </Card>
      {/* Dialog Add New Role */}
      <CreateRole
        open={addNewRoleDialogOpen}
        onClose={handleCloseAddNewRoleDialog}
        onRefresh={() => setRefreshTable(prev => !prev)}
        showSnackbar={showSnackbar}
        roles={roles}
        initialPermissionsState={initialPermissionsState}
        branchDatabase={branchDatabase}
        dialogRoleName={dialogRoleName} 
        setDialogRoleName={setDialogRoleName}
        dialogAllBranchCheckbox={dialogAllBranchCheckbox}
        setDialogAllBranchCheckbox={setDialogAllBranchCheckbox}
        dialogBranch={dialogBranch}
        setDialogBranch={setDialogBranch}
        dialogActiveSwitch={dialogActiveSwitch}
        setDialogActiveSwitch={setDialogActiveSwitch}
        permissions={permissions}
        setPermissions={setPermissions}
        errors={errors}
        setErrors={setErrors}
      />
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right',  }}
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