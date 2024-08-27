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

const Role = () => {
  const classes = useStyles();
  const tableHead = ["Name", "Gender", "Role", "Branch", "Mobile No.", "Status", ""];
  const [name, setName]  = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [status, setStatus] = useState("");
  const [addNewRoleDialogOpen, setAddNewRoleDialogOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [allBranch, setAllBranch] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = [
    { name: 'Test 1', gender: 'Male', role: 'Admin', branch: 'Cheras', mobileNo: '0123456789', status: 'Active' },
    { name: 'Test 2', gender: 'Male', role: 'Admin', branch: 'Cheras', mobileNo: '0134567892', status: 'Active' },
    { name: 'Test 3', gender: 'Female', role: 'Finance', branch: 'Puchong', mobileNo: '0145678923', status: 'Active' },
    { name: 'Test 4', gender: 'Male', role: 'Finance', branch: 'Subang', mobileNo: '0156789234', status: 'Inactive' },
    { name: 'Test 5', gender: 'Female', role: 'Member', branch: 'Puchong', mobileNo: '0167892345', status: 'Active' },
    { name: 'Test 6', gender: 'Male', role: 'Admin', branch: 'Subang', mobileNo: '0178923456', status: 'Inactive' },
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

  const handleSaveNewRole = () => {
    setAddNewRoleDialogOpen(false);
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
                onClick={handleOpenAddNewRoleDialog}
              >
                Add New
              </Button>
            </Box>
          </Grid>
          {/* Filter Bar */}
          <Grid item xs={2} md={2}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="name-select">Filtered by Name</InputLabel>
              <Select
                labelId ="name-select"
                id      ="name-select"
                value   ={name}
                label   ="Filtered by Name"
                onChange={(e) => {setName(e.target.value)}}
              >
                <MenuItem value="test.jpg">test.jpg</MenuItem>
                <MenuItem value="john.jpg">john.jpg</MenuItem>
                <MenuItem value="jane.jpg">jane.jpg</MenuItem>
                <MenuItem value="james.jpg">james.jpg</MenuItem>
                <MenuItem value="mary.jpg">mary.jpg</MenuItem>
                <MenuItem value="alice.jpg'">alice.jpg</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} md={2}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="gender-select">Filter by Gender</InputLabel>
              <Select
                labelId ="gender-select"
                id      ="gender-select"
                value   ={gender}
                label   ="Filter by Gender"
                onChange={(e) => {setGender(e.target.value)}}
              >
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
                value   ={role}
                label   ="Filter by Role"
                onChange={(e) => {setRole(e.target.value)}}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Member">Member</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} md={2}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="branch-select">Filter by Branch</InputLabel>
              <Select
                labelId ="branch-select"
                id      ="branch-select"
                value   ={branch}
                label   ="Filter by Branch"
                onChange={(e) => {setBranch(e.target.value)}}
              >
                <MenuItem value="Subang">Subang</MenuItem>
                <MenuItem value="Cheras">Cheras</MenuItem>
                <MenuItem value="Puchong">Puchong</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} md={2}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="mobile-no-select">Filter by Mobile No.</InputLabel>
              <Select
                labelId ="mobile-no-select"
                id      ="mobile-no-select"
                value   ={mobileNo}
                label   ="Filter by Mobile No."
                onChange={(e) => {setMobileNo(e.target.value)}}
              >
                <MenuItem value="0123456789">0123456789</MenuItem>
                <MenuItem value="0134567892">0134567892</MenuItem>
                <MenuItem value="0145678923">0145678923</MenuItem>
                <MenuItem value="0156789234">0156789234</MenuItem>
                <MenuItem value="0167892345">0167892345</MenuItem>
                <MenuItem value="0178923456">0178923456</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} md={2}>
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
                    <TableCell style={{textAlign: "left"}}>{row.name}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.effectiveDate}</TableCell>
                    <TableCell style={{textAlign: "left"}}>{row.endDate}</TableCell>
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