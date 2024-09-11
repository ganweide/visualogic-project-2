import axios from "axios";
import React, { useState, useEffect } from 'react'
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
  Divider,
  Switch,
  IconButton,
  TablePagination,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const packageURL = "http://localhost:5000/api/package-report";

const PackageReport = () => {
  const [packageDatabase, setPackageDatabase] = useState([]);
  
  // Filtering Bar
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [branch, setBranch]  = useState("");
  const [type, setType] = useState("");

  return (
    <Box>
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          {/* Header */}
          <Grid item xs={12} md={12}>
            <Box 
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="h1">Package Report</Typography>
            </Box>
          </Grid>
          {/* Filter Bar */}
          <Grid item xs={3} md={3}>
            <TextField
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setStartDate(e.target.value)}
              margin="dense"
              label="From Date"
              type="date"
              fullWidth
              variant="outlined"
              value={startDate}
            />
          </Grid>
          <Grid item xs={3} md={3}>
            <TextField
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setEndDate(e.target.value)}
              margin="dense"
              label="To Date"
              type="date"
              fullWidth
              variant="outlined"
              value={endDate}
            />
          </Grid>
          <Grid item xs={3} md={3}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="branch-select">Branch</InputLabel>
              <Select
                labelId ="branch-select"
                id      ="branch-select"
                value   ={branch}
                label   ="Branch"
                onChange={(e) => {setBranch(e.target.value)}}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={3}>
            <FormControl margin="dense" fullWidth>
              <Button
                variant="outlined"
                color="primary"
                sx={{ height: "53.13px" }}
              >
                View Report
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={3}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="file-type-select">File Type</InputLabel>
              <Select
                labelId ="file-type-select"
                id      ="file-type-select"
                value   ={type}
                label   ="File Type"
                onChange={(e) => {setType(e.target.value)}}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Excel">Excel</MenuItem>
                <MenuItem value="PDF">PDF</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={3}>
            <FormControl margin="dense" fullWidth>
              <Button
                variant="outlined"
                color="primary"
                sx={{ height: "53.13px" }}
              >
                Download Report
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default PackageReport