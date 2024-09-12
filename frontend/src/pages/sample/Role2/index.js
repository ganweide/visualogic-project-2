import axios from 'axios';
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
  IconButton,
  TablePagination,
} from "@mui/material";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Styles from "./style";
import { TrustedAdvisor } from 'aws-sdk';
const useStyles = makeStyles(Styles);
const roleURL = "http://localhost:5000/api/role"

const PermissionSection = ({ title, permissions, state, setState }) => {
  const handleChange = (permission) => (e) => {
    const key = `${title}${permission}`;
    // Ensure the first letter is lowercase, but keep the rest as is
    const formattedKey = key.charAt(0).toLowerCase() + key.slice(1);
    setState((prev) => ({ ...prev, [key]: e.target.checked }));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={3}>
        <Typography>{title}</Typography>
      </Grid>
      {permissions.map((permission) => (
        <Grid item xs={3} key={permission}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={state[`${title.toLowerCase().replace('-', '')}${permission}`]} 
                onChange={handleChange(permission)} 
              />
            }
            label={permission}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const Role2 = () => {
  const classes = useStyles();
  const [roleDatabase, setRoleDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [allBranch, setAllBranch] = useState(false);
  const [branch, setBranch] = useState("");

  const [filters, setFilters] = useState({
    roleName: { value: null, matchMode: 'contains' },
    roleStatus: { value: null, matchMode: 'equals' }
  });

  // Retrieve Data
  useEffect(() => {
    try {
      axios.get(roleURL).then((response) => {
        setRoleDatabase(response.data);
      })
    } catch (error) {
      console.log(error)
    }
  }, [refreshTable]);

  // Role Checkboxes Generation
  const roles = [
    { title: 'Admin-Role', permissions: ['View', 'Create', 'Update'] },
    { title: 'Admin-Banner', permissions: ['View', 'Create', 'Update'] },
    { title: 'Admin-Message', permissions: ['View', 'Create', 'Update'] },
    { title: 'Admin-Staff', permissions: ['View', 'Create', 'Update'] },
    { title: 'Admin-Branch', permissions: ['View', 'Create', 'Update'] },
    { title: 'Admin-Room', permissions: ['View', 'Create', 'Update'] },
    { title: 'Admin-Package', permissions: ['View', 'Create', 'Update'] },
    { title: 'Admin-Member', permissions: ['View', 'Create', 'Update'] },
    { title: 'Admin-Booking', permissions: ['View', 'Create', 'Update'] },
    { title: 'Member-CheckIn', permissions: ['View', 'Create', 'Update'] },
    { title: 'Member-QR', permissions: ['View', 'Create', 'Update'] },
    { title: 'Member-Staff', permissions: ['View', 'Create', 'Update'] },
    { title: 'Finance-Purchase', permissions: ['View', 'Create', 'Update'] },
    { title: 'Finance-CheckIn', permissions: ['View', 'Create', 'Update'] },
    { title: 'Finance-Attendance', permissions: ['View', 'Create', 'Update'] },
  ];

  const initialPermissionsState = roles.reduce((acc, { title, permissions }) => {
    permissions.forEach((permission) => {
      const key = `${title}${permission}`;
      // Ensure the first letter is lowercase, but keep the rest as is
      const formattedKey = key.charAt(0).toLowerCase() + key.slice(1);
      acc[formattedKey] = false;
    });
    acc['ActiveInactive'] = true;
    return acc;
  }, {});
  const [permissions, setPermissions] = useState(initialPermissionsState);

  // Dialog Actions
  const [addNewRoleDialogOpen, setAddNewRoleDialogOpen] = useState(false);
  const handleOpenAddNewRoleDialog = () => {
    setAddNewRoleDialogOpen(true);
  }

  const handleCloseAddNewRoleDialog = () => {
    setAddNewRoleDialogOpen(false);
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
  
      const roleData = {
        roleName: roleName,
        allBranchStatus: allBranch,
        branchName: branch ? branch : null,
        roleStatus: permissions.ActiveInactive,
        ...transformPermissions(permissions),
      };

      console.log('Role data to be saved:', JSON.stringify(roleData, null, 2));

      const response = await axios.post(roleURL, roleData);
      console.log('Role saved:', response.data);
      setRefreshTable(response.data);
      setAddNewRoleDialogOpen(false);
      // TODO: Add logic to refresh the role list or show a success message
    } catch (error) {
      console.error('Error saving role:', error);
      // TODO: Add error handling, e.g., show an error message to the user
    }
  }

  // Checkbox Actions
  const handleClickCheckboxAllBranch = (e) => {
    setAllBranch(e.target.checked);
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
          <IconButton>
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6} md={6}>
          <IconButton>
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
        onClose           ={handleCloseAddNewRoleDialog}
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
                onChange={(e) => setRoleName(e.target.value)}
                margin="dense"
                label="Role Name"
                type="text"
                fullWidth
                variant="outlined"
                value={roleName}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={allBranch} onChange={handleClickCheckboxAllBranch} />} label='All Branch' />
              </FormGroup>
            </Grid>
            {!allBranch && (
              <Grid item xs={12} md={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="branch-select">Branch</InputLabel>
                  <Select
                    labelId ="branch-select"
                    id      ="branch-select"
                    value   ={branch}
                    label   ="Branch"
                    onChange={(e) => {setBranch(e.target.value)}}
                  >
                    {
                      roleDatabase.map((row, index) => (
                        <MenuItem key={index} value={row.branch}>{row.branch}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              )
            }
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              {/* Other Permissions */}
              {roles.map(({ title, permissions }) => (
                <PermissionSection
                  key={title}
                  title={title}
                  permissions={permissions}
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
          <Button onClick={handleSaveNewRole}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Role2