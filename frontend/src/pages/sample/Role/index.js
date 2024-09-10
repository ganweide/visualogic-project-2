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
  IconButton,
  TablePagination,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Styles from "./style";
const useStyles = makeStyles(Styles);
const roleURL = "http://localhost:5000/api/role"

const PermissionSection = ({ title, permissions, state, setState }) => {
  const handleChange = (permission) => (e) => {
    const key = `${title.toLowerCase().replace('-', '')}${permission}`;
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

const Role = () => {
  const classes = useStyles();
  const tableHead = ["Role Name", "Status", ""];
  const [roleDatabase, setRoleDatabase] = useState([]);
  const [refreshTable, setRefreshTable] = useState([]);
  const [name, setName]  = useState("");
  const [status, setStatus] = useState("");
  const [roleName, setRoleName] = useState("");
  const [allBranch, setAllBranch] = useState(false);
  const [branch, setBranch] = useState("");

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
      acc[`${title}-${permission}`] = false;
    });
    acc['ActiveInactive'] = true;
    return acc;
  }, {});
  const [permissions, setPermissions] = useState(initialPermissionsState);

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
            transformed['activeSwitch'] = value;
          } else {
            const parts = key.split('-');
            const newKey = parts[0].toLowerCase() + parts.slice(1).join('');
            transformed[newKey] = value;
          }
        });
        return transformed;
      };
  
      const roleData = {
        name: roleName,
        allBranchCheckbox: allBranch,
        ...transformPermissions(permissions),
      };

      console.log('Role data to be saved:', roleData);

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
          {/* Filter Bar */}
          <Grid item xs={6} md={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="role-name-select">Filtered by Role Name</InputLabel>
              <Select
                labelId ="role-name-select"
                id      ="role-name-select"
                value   ={name}
                label   ="Filtered by Role Name"
                onChange={(e) => {setName(e.target.value)}}
              >
                <MenuItem value="Test Admin">Test Admin</MenuItem>
                <MenuItem value="John Doe">John Doe</MenuItem>
                <MenuItem value="Jane Doe">Jane Doe</MenuItem>
                <MenuItem value="James Smith">James Smith</MenuItem>
                <MenuItem value="Mary Smith">Mary Smith</MenuItem>
                <MenuItem value="Alice">Alice</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6}>
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
                {roleDatabase.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{textAlign: "left"}}>{row.name}</TableCell>
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
              count={roleDatabase.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
                    <MenuItem value="Test 1">Test 1</MenuItem>
                    <MenuItem value="Test 2">Test 2</MenuItem>
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
              {/* {roles.map(({ title, permissions }) => (
                <PermissionSection
                  key={title}
                  title={title}
                  permissions={permissions}
                  state={generatePermissionsState(title, permissions)}
                  setState={(updatedState) => setPermissions((prev) => ({ ...prev, ...updatedState }))}
                />
              ))} */}
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

export default Role