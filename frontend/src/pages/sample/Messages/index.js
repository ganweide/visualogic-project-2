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

const PermissionSection = ({ title, permissions, state, setState }) => {
  const handleChange = (permission) => (e) => {
    const key = `${title}-${permission}`;
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
            control={<Checkbox checked={state[permission]} onChange={handleChange(permission)} />}
            label={permission}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const Role = () => {
  const classes = useStyles();
  const tableHead = ["Message", "Type", "View", "Order", "Status", ""];
  const [message, setMessage]  = useState("");
  const [status, setStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [addNewRoleDialogOpen, setAddNewRoleDialogOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [allBranch, setAllBranch] = useState(false);
  const [branch, setBranch] = useState("");

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
    acc['ActiveInactive'] = false;
    return acc;
  }, {});
  const [permissions, setPermissions] = useState(initialPermissionsState);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = [
    { message: 'Hi', type: 'welcome', view: '', order: '1', status: 'Active' },
    { message: 'Bye', type: 'goodbye', view: '', order: '2', status: 'Inactive' },
    { message: 'See you', type: 'transfer', view: '', order: '3', status: 'Active' },
    { message: 'Please', type: 'payment', view: '', order: '4', status: 'Active' },
    { message: 'Enjoy', type: 'event', view: '', order: '5', status: 'Inactive' },
    { message: 'Focus', type: 'meeting', view: '', order: '6', status: 'Active' },
  ];

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleOpenAddNewRoleDialog = () => {
    setAddNewRoleDialogOpen(true);
  }

  const handleCloseAddNewRoleDialog = () => {
    setAddNewRoleDialogOpen(false);
  }

  const handleClickCheckboxAllBranch = (e) => {
    setAllBranch(e.target.checked);
  }

  const handleClickSwitchActiveInactive = (e) => {
    setPermissions((prev) => ({ ...prev, ActiveInactive: e.target.checked }));
  }

  const handleSaveNewRole = () => {
    setAddNewRoleDialogOpen(false);
  }

  console.log(permissions);

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
              <Typography variant="h1">Messages Table</Typography>
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
          <Grid item xs={3} md={3}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="message-select">Filtered by Message</InputLabel>
              <Select
                labelId ="message-select"
                id      ="message-select"
                value   ={message}
                label   ="Filtered by Message"
                onChange={(e) => {setMessage(e.target.value)}}
              >
                <MenuItem value="Hi">Hi</MenuItem>
                <MenuItem value="Bye">Bye</MenuItem>
                <MenuItem value="See you">See you</MenuItem>
                <MenuItem value="Please">Please</MenuItem>
                <MenuItem value="Enjoy">Enjoy</MenuItem>
                <MenuItem value="Focus">Focus</MenuItem>
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{textAlign: "left"}}>{row.message}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.type}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.view}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.order}</TableCell>
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
              count={rows.length}
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