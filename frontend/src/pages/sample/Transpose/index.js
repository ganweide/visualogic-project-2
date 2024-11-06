import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Box,
  Card,
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import * as XLSX from 'xlsx';
import sampleData from './data.json';

const transposeData = (data) => {
  const keys = Object.keys(data[0]);

  // Filter out 'Location' field from the keys
  const filteredKeys = keys.filter(key => key !== 'Location');
  
  return filteredKeys.map(key => {
    return {
      label: key, 
      values: data.map(item => item[key])
    };
  });
};

const TransposedTable = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('');

  const transposedData = transposeData(data);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      transposedData.map(row => {
        const obj = { Field: row.label };
        row.values.forEach((value, idx) => {
          obj[data[idx].Location] = value; // Use Location field as dynamic Record name
        });
        return obj;
      })
    );

    const wb = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, "Transposed Data");  
    XLSX.writeFile(wb, `${fileName}.xlsx`); // Use the user-provided file name
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (exportFile = false) => {
    setOpen(false);
    if (exportFile && fileName) {
      exportToExcel();
    }
  };

  return (
    <Box>
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          {/* Header */}
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h1">Transpose Table</Typography>
              <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Export to Excel
              </Button>
            </Box>
          </Grid>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell>

                  {/* Create dynamic header cells based on Location */}
                  {data.map((record, index) => (
                    <TableCell key={index}>
                      {record.Location} {/* Dynamic Record name */}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {/* Loop through transposed data to render each row */}
                {transposedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.label}</TableCell>

                    {row.values.map((value, idx) => (
                      <TableCell key={idx}>
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Card>

      {/* Dialog for file name input */}
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>Enter File Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the desired file name for the Excel file.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="File Name"
            fullWidth
            variant="outlined"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)} // Update file name state
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const TransposeTable = () => {
  return (
    <Box>
        <Card>
            <TransposedTable data={sampleData} />
        </Card>
    </Box>
  );
};

export default TransposeTable;
